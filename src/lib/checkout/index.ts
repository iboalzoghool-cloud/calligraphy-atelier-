import type { CheckoutAdapter } from "./types";
import { emailAdapter } from "./email-adapter";
import { stripeAdapter } from "./stripe-adapter";

export type { CheckoutAdapter, OrderPayload, OrderResult, CustomerInfo } from "./types";

/**
 * Wählt den aktiven Checkout-Adapter.
 * v1: immer E-Mail. Phase 2: per Env auf Stripe umstellbar.
 */
export function getCheckoutAdapter(): CheckoutAdapter {
  // TODO Phase 2: process.env.NEXT_PUBLIC_CHECKOUT_PROVIDER === "stripe"
  //   ? stripeAdapter : emailAdapter
  void stripeAdapter;
  return emailAdapter;
}
