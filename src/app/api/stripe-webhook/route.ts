import { NextResponse } from "next/server";
import { sendOrderMails, type PaidOrder } from "@/lib/shop/order-mails";

/*
  Stripe-Webhook (checkout.session.completed): löst die beiden Bestell-Mails
  aus. Signaturprüfung per HMAC-SHA256 (Stripe-Schema `t=…,v1=…`) ohne SDK.
  Persistenz: die Session selbst (inkl. Metadata) IST die Bestellung —
  nachlesbar im Stripe-Dashboard; hier passiert nur die Zustellung.
*/

async function validSignature(payload: string, header: string | null, secret: string) {
  if (!header) return false;
  const parts = new Map(header.split(",").map((p) => p.split("=") as [string, string]));
  const t = parts.get("t");
  const v1 = parts.get("v1");
  if (!t || !v1) return false;
  // Toleranz: 5 Minuten gegen Replay
  if (Math.abs(Date.now() / 1000 - Number(t)) > 300) return false;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(`${t}.${payload}`));
  const hex = [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
  return hex === v1;
}

interface StripeSession {
  id: string;
  amount_total: number | null;
  metadata?: Record<string, string>;
  customer_details?: { name?: string | null; email?: string | null } | null;
  shipping_details?: {
    name?: string | null;
    address?: {
      line1?: string | null; line2?: string | null;
      postal_code?: string | null; city?: string | null; country?: string | null;
    } | null;
  } | null;
  collected_information?: { shipping_details?: StripeSession["shipping_details"] } | null;
}

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const payload = await req.text();

  if (!secret) {
    console.warn("[webhook] STRIPE_WEBHOOK_SECRET fehlt – Event ignoriert.");
    return NextResponse.json({ received: true, skipped: true });
  }
  if (!(await validSignature(payload, req.headers.get("stripe-signature"), secret))) {
    return NextResponse.json({ message: "Ungültige Signatur." }, { status: 400 });
  }

  const event = JSON.parse(payload) as { type: string; data: { object: StripeSession } };
  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const s = event.data.object;
  const ship = s.shipping_details ?? s.collected_information?.shipping_details ?? null;
  const order: PaidOrder = {
    sessionId: s.id,
    kind: s.metadata?.kind === "edition" ? "edition" : "original",
    amountCents: s.amount_total ?? 0,
    meta: s.metadata ?? {},
    customer: {
      name: s.customer_details?.name ?? "",
      email: s.customer_details?.email ?? "",
    },
    shipping: {
      name: ship?.name ?? undefined,
      line1: ship?.address?.line1 ?? undefined,
      line2: ship?.address?.line2 ?? undefined,
      postalCode: ship?.address?.postal_code ?? undefined,
      city: ship?.address?.city ?? undefined,
      country: ship?.address?.country ?? undefined,
    },
  };
  const sent = await sendOrderMails(order);
  console.log("[webhook] Bestellung verarbeitet:", s.id, sent);
  return NextResponse.json({ received: true });
}
