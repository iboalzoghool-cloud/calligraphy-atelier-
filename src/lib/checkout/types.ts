/* ───────────────────────────────────────────────────────────────
   CHECKOUT – ADAPTER-PATTERN
   v1 nutzt den E-Mail-Adapter. Stripe wird in Phase 2 als weiterer
   Adapter angedockt, ohne die UI zu ändern (siehe ./index.ts).
   ─────────────────────────────────────────────────────────────── */

export interface CustomerInfo {
  name: string;
  email: string;
  phone?: string;
  street: string;
  zip: string;
  city: string;
  country: string;
  note?: string;
}

export interface OrderSummaryItem {
  label: string;
  value: string;
}

export interface OrderPayload {
  customer: CustomerInfo;
  summary: OrderSummaryItem[];
  summaryText: string;
  priceCents: number;
  currency: string;
  /** PNG-Mockup als data-URL (canvas.toDataURL). */
  mockupDataUrl: string;
}

export interface OrderResult {
  ok: boolean;
  /** Wurde die Bestellung tatsächlich zugestellt (E-Mail versendet)? */
  delivered: boolean;
  message?: string;
}

export interface CheckoutAdapter {
  id: string;
  submitOrder(payload: OrderPayload): Promise<OrderResult>;
}
