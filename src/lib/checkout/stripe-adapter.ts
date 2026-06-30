import type { CheckoutAdapter, OrderPayload, OrderResult } from "./types";

/**
 * TODO: Phase 2 – Stripe-Checkout.
 *
 * Dieser Adapter ist bewusst NICHT aktiv. Wenn Stripe dazukommt:
 *  1) `stripe` installieren + STRIPE_SECRET_KEY als Env-Var setzen
 *  2) hier eine Checkout-Session erstellen (Server-Route /api/checkout)
 *  3) in ./index.ts den Provider per Env (CHECKOUT_PROVIDER=stripe) wählen
 *
 * Die UI muss dafür NICHT geändert werden – sie spricht nur den
 * CheckoutAdapter an.
 */
export const stripeAdapter: CheckoutAdapter = {
  id: "stripe",
  async submitOrder(_payload: OrderPayload): Promise<OrderResult> {
    void _payload;
    throw new Error(
      "Stripe-Checkout ist erst in Phase 2 verfügbar (Adapter noch nicht aktiviert).",
    );
  },
};
