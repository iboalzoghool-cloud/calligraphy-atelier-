import type { CheckoutAdapter, OrderPayload, OrderResult } from "./types";

/**
 * E-Mail-Adapter (v1): schickt die Bestellung an die serverseitige
 * API-Route, die daraus eine E-Mail macht. Keine bezahlten Dienste
 * nötig – Resend hat ein kostenloses Kontingent.
 */
export const emailAdapter: CheckoutAdapter = {
  id: "email",
  async submitOrder(payload: OrderPayload): Promise<OrderResult> {
    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    let data: OrderResult | null = null;
    try {
      data = (await res.json()) as OrderResult;
    } catch {
      // ignorieren – unten generisch behandelt
    }

    if (!res.ok) {
      throw new Error(data?.message ?? "Bestellung konnte nicht übermittelt werden.");
    }
    return data ?? { ok: true, delivered: false };
  },
};
