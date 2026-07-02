/*
  Bestell-Mails nach erfolgreicher Zahlung (Webhook / Mock-Fixture):
   1) Bestätigung an die Kundin (warm, mit allen Details + Lieferzeit)
   2) PRODUKTIONSAUFTRAG an Brahim (vollständig; bei Editionen mit
      „→ bei Gelato aufgeben“ für die manuelle Erfüllung, Stufe 1).
  Versand via Resend (fetch, kein SDK). Ohne RESEND_API_KEY: Log-only.
*/

import { BRAND, PROCESSING_TIME } from "@/lib/content";
import { SHOP } from "./config";

export interface PaidOrder {
  sessionId: string;
  kind: "original" | "edition";
  amountCents: number;
  /** Produktdaten (aus Session-Metadata – Quelle der Wahrheit). */
  meta: Record<string, string>;
  customer: { name: string; email: string };
  shipping: {
    name?: string;
    line1?: string;
    line2?: string;
    postalCode?: string;
    city?: string;
    country?: string;
  };
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function eur(cents: number): string {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(
    cents / 100,
  );
}

function metaRows(meta: Record<string, string>): string {
  const order = [
    "produkt", "motiv", "form", "groesse", "farbwelt", "name_auf_bild",
    "schrift", "spruch", "spruch_position", "mehr_gold", "veredelungen", "anmerkung",
  ];
  return order
    .filter((k) => meta[k])
    .map(
      (k) =>
        `<tr><td style="padding:3px 14px 3px 0;color:#6a6053">${esc(k.replace(/_/g, " "))}</td>` +
        `<td style="padding:3px 0;font-weight:600">${esc(meta[k])}</td></tr>`,
    )
    .join("");
}

function shippingBlock(o: PaidOrder): string {
  const s = o.shipping;
  const lines = [s.name, s.line1, s.line2, `${s.postalCode ?? ""} ${s.city ?? ""}`.trim(), s.country]
    .filter(Boolean)
    .map((l) => esc(String(l)));
  return lines.length ? lines.join("<br/>") : "<i>Keine Versandadresse übermittelt</i>";
}

async function sendMail(to: string, subject: string, html: string, replyTo?: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(`[shop] RESEND_API_KEY fehlt – Mail NICHT versendet an ${to}: ${subject}`);
    return false;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.ORDER_FROM || "HDIA Atelier <onboarding@resend.dev>",
      to: [to],
      ...(replyTo ? { reply_to: replyTo } : {}),
      subject,
      html,
    }),
  });
  if (!res.ok) console.error("[shop] Resend-Fehler:", res.status, await res.text());
  return res.ok;
}

/** Beide Bestell-Mails verschicken. Gibt zurück, was zugestellt wurde. */
export async function sendOrderMails(o: PaidOrder) {
  const isEdition = o.kind === "edition";
  const delivery = isEdition ? SHOP.deliveryEdition : SHOP.deliveryOriginal;

  /* ── 1) Kundin ── */
  const customerHtml = `
  <div style="font-family:Georgia,serif;color:#241d15;max-width:560px">
    <h2 style="font-weight:600">Danke für deine Bestellung${o.customer.name ? ", " + esc(o.customer.name.split(" ")[0]) : ""}!</h2>
    <p>${
      isEdition
        ? "Dein Kunstdruck aus unseren Editionen wird jetzt beauftragt."
        : `Dein Original wird jetzt von Hand gemalt – langsam, mit echter Tinte. In der Regel dauert das ${PROCESSING_TIME} Tage.`
    }</p>
    <table style="border-collapse:collapse;font-size:14px">${metaRows(o.meta)}
      <tr><td style="padding:8px 14px 3px 0;color:#6a6053">Gesamt (bezahlt)</td>
      <td style="padding:8px 0 3px;font-weight:700">${eur(o.amountCents)}</td></tr>
    </table>
    <p style="font-size:14px;color:#6a6053">${esc(delivery)} · ${esc(SHOP.shippingNote)}.</p>
    <p style="font-size:14px">Fragen oder Wünsche zur Schreibweise? Antworte einfach auf diese E-Mail.</p>
    <p style="font-size:13px;color:#9a8d7d">${esc(BRAND.name)} · ${esc(BRAND.meaning)} · Handgemalt in ${esc(BRAND.city)}</p>
  </div>`;

  /* ── 2) Produktionsauftrag an Brahim ── */
  const to = process.env.ORDER_TO || BRAND.email;
  const brahimHtml = `
  <div style="font-family:Inter,Arial,sans-serif;color:#1b1714;max-width:620px">
    <h2 style="font-weight:700">${isEdition ? "🖨️ EDITION – Kunstdruck-Bestellung" : "🖌️ ORIGINAL – Produktionsauftrag"}</h2>
    ${isEdition ? `<p style="font-size:15px;font-weight:700;color:#984861">→ bei Gelato aufgeben (manuelle Erfüllung, Stufe 1)</p>` : ""}
    <p style="color:#6a6053;font-size:13px">Stripe-Session: ${esc(o.sessionId)} · bezahlt: <b>${eur(o.amountCents)}</b></p>
    <h3 style="margin-bottom:4px">Produktionsdaten</h3>
    <table style="border-collapse:collapse;font-size:14px">${metaRows(o.meta)}</table>
    <h3 style="margin-bottom:4px">Lieferadresse</h3>
    <p style="font-size:14px;line-height:1.6">${shippingBlock(o)}</p>
    <h3 style="margin-bottom:4px">Kundin/Kunde</h3>
    <p style="font-size:14px">${esc(o.customer.name)} · ${esc(o.customer.email)}</p>
    <p style="font-size:12px;color:#9a8d7d">Vollständige Zahlungsdetails im Stripe-Dashboard (Testmodus).</p>
  </div>`;

  const [customerSent, brahimSent] = await Promise.all([
    o.customer.email
      ? sendMail(o.customer.email, `Deine Bestellung bei ${BRAND.name} 💛`, customerHtml, to)
      : Promise.resolve(false),
    sendMail(
      to,
      `${isEdition ? "EDITION" : "ORIGINAL"} · Neue Bestellung ${eur(o.amountCents)} – ${o.meta.motiv ?? o.meta.name_auf_bild ?? ""}`,
      brahimHtml,
      o.customer.email || undefined,
    ),
  ]);
  return { customerSent, brahimSent };
}
