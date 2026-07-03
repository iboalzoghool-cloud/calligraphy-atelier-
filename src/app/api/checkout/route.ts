import { NextResponse } from "next/server";
import type { ConfiguratorState } from "@/lib/configurator/types";
import { priceForState } from "@/lib/configurator/pricing";
import { getSize, getBackground, getSaying, ADDONS, SHAPES } from "@/lib/configurator/options";
import { getEdition, getEditionSize, EDITIONS_LIVE, SHOP, stripeMode } from "@/lib/shop/config";
import { sendOrderMails, type PaidOrder } from "@/lib/shop/order-mails";

/*
  Checkout (Stripe, NUR Testmodus):
  - "live-test": echte Checkout-Session via Stripe-REST (sk_test_…). Kein SDK
    nötig – ein form-encoded POST. Metadata = vollständige Produktionsdaten
    (Quelle der Wahrheit; Bestell-Liste = Stripe-Dashboard, keine eigene DB).
  - "mock":     keine Keys vorhanden → Fixture-Session, Mails werden sofort
                ausgelöst, Redirect direkt auf die Danke-Seite (E2E-Verifikation).
  - "off":      Produktion ohne Keys → 503, UI fällt auf die unverbindliche
                Anfrage zurück. Live-Keys werden bewusst NICHT unterstützt.
*/

type CheckoutBody =
  | { kind: "original"; state: ConfiguratorState }
  | { kind: "edition"; productId: string; sizeId: string };

/* Font-Labels lokal (lib/fonts importiert next/font → nicht server-safe). */
const FONT_LABELS: Record<string, string> = {
  arefInk: "Aref Ruqaa Ink",
  aref: "Aref Ruqaa",
  amiri: "Amiri",
  reem: "Reem Kufi",
  gulzar: "Gulzar",
};

function originalMeta(state: ConfiguratorState): Record<string, string> {
  const size = getSize(state.sizeId);
  const shape = SHAPES.find((s) => s.id === state.shape);
  const saying =
    state.sayingId === "custom"
      ? (state.sayingText ?? "").trim()
      : getSaying(state.sayingId ?? null)?.ar ?? "";
  const addons = ADDONS.filter((a) => state.addons[a.id]).map((a) => a.label);
  return {
    produkt: "Original · Unikat, von Hand gemalt",
    form: shape?.label ?? state.shape,
    groesse: size.label,
    farbwelt: getBackground(state.backgroundId).label,
    name_auf_bild: state.name.trim() || "—",
    schrift: FONT_LABELS[state.fontId] ?? state.fontId,
    spruch: saying || "ohne",
    ...(saying ? { spruch_position: state.sayingPosition === "top" ? "oben" : "unten" } : {}),
    mehr_gold: state.gold ? "ja" : "nein",
    ...(addons.length ? { veredelungen: addons.join(", ") } : {}),
  };
}

function baseUrl(req: Request): string {
  const proto = req.headers.get("x-forwarded-proto") ?? "http";
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "localhost:3000";
  return `${proto}://${host}`;
}

export async function POST(req: Request) {
  let body: CheckoutBody;
  try {
    body = (await req.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ message: "Ungültige Anfrage." }, { status: 400 });
  }

  // Preis + Produktdaten IMMER serverseitig bestimmen
  let amount: number;
  let title: string;
  let description: string;
  let meta: Record<string, string>;
  let kind: "original" | "edition";

  if (body.kind === "original") {
    if (!body.state?.sizeId) {
      return NextResponse.json({ message: "Ungültige Konfiguration." }, { status: 422 });
    }
    kind = "original";
    amount = priceForState(body.state);
    meta = originalMeta(body.state);
    title = `Original: ${meta.form} ${meta.groesse} – „${meta.name_auf_bild}“`;
    description = `Handgemaltes Unikat · ${meta.farbwelt} · ${SHOP.deliveryOriginal}`;
  } else if (body.kind === "edition") {
    if (!EDITIONS_LIVE) {
      return NextResponse.json(
        { message: "Die Editionen sind bald verfügbar." },
        { status: 503 },
      );
    }
    const product = getEdition(body.productId);
    const size = product ? getEditionSize(product, body.sizeId) : null;
    if (!product || !size) {
      return NextResponse.json({ message: "Unbekanntes Produkt." }, { status: 422 });
    }
    kind = "edition";
    amount = size.price;
    meta = {
      produkt: "Edition · Kunstdruck",
      motiv: product.title,
      groesse: size.label,
      anmerkung: product.note,
    };
    title = `Edition: ${product.title} (Kunstdruck ${size.label})`;
    description = `Kunstdruck · ${SHOP.deliveryEdition}`;
  } else {
    return NextResponse.json({ message: "Ungültige Anfrage." }, { status: 400 });
  }
  meta.lieferzeit = kind === "original" ? SHOP.deliveryOriginal : SHOP.deliveryEdition;

  const mode = stripeMode();
  const base = baseUrl(req);

  if (mode === "off") {
    return NextResponse.json(
      { message: "Der Kauf ist gerade nicht verfügbar – nutze bitte die unverbindliche Anfrage." },
      { status: 503 },
    );
  }

  if (mode === "mock") {
    // Fixture-Session: identischer Daten-Pfad wie der Webhook (E2E-Beweis).
    const fixture: PaidOrder = {
      sessionId: `cs_test_mock_${Date.now()}`,
      kind,
      amountCents: amount,
      meta,
      customer: { name: "Test Kundin", email: "test@example.com" },
      shipping: {
        name: "Test Kundin",
        line1: "Musterstraße 1",
        postalCode: "63065",
        city: "Offenbach",
        country: "DE",
      },
    };
    const sent = await sendOrderMails(fixture);
    console.log("[checkout:mock] Bestellung simuliert:", fixture.sessionId, sent, meta);
    return NextResponse.json({
      url: `${base}/bestellung/danke?session_id=${fixture.sessionId}&mock=1&kind=${kind}`,
    });
  }

  // ── Echte Test-Session via Stripe-REST ──
  const params = new URLSearchParams();
  params.set("mode", "payment");
  params.set("locale", "de");
  params.set("success_url", `${base}/bestellung/danke?session_id={CHECKOUT_SESSION_ID}&kind=${kind}`);
  params.set("cancel_url", kind === "original" ? `${base}/bestellung?abgebrochen=1` : `${base}/#editionen`);
  params.set("line_items[0][quantity]", "1");
  params.set("line_items[0][price_data][currency]", SHOP.currency);
  params.set("line_items[0][price_data][unit_amount]", String(amount));
  params.set("line_items[0][price_data][product_data][name]", title);
  params.set("line_items[0][price_data][product_data][description]", description);
  params.set("shipping_address_collection[allowed_countries][0]", "DE");
  params.set("metadata[kind]", kind);
  for (const [k, v] of Object.entries(meta)) {
    params.set(`metadata[${k}]`, v.slice(0, 490)); // Stripe-Limit 500/Wert
  }

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });
  if (!res.ok) {
    console.error("[checkout] Stripe-Fehler:", res.status, await res.text());
    return NextResponse.json(
      { message: "Checkout konnte nicht gestartet werden. Bitte erneut versuchen." },
      { status: 502 },
    );
  }
  const session = (await res.json()) as { url?: string };
  return NextResponse.json({ url: session.url });
}
