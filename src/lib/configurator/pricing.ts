/*
  Preislogik – bewusst OHNE UI-/Font-Imports, damit sie auch serverseitig
  (Checkout-API: Preis wird NIE vom Client übernommen) nutzbar ist.
*/
import type { ConfiguratorState } from "./types";
import { getSize } from "./options";
import { PRICING } from "@/lib/content";

/** Gesamtpreis (Cent) für einen Konfigurator-Zustand. */
export function priceForState(s: ConfiguratorState): number {
  let p = getSize(s.sizeId).price;
  const hasSaying =
    s.sayingId === "custom"
      ? Boolean((s.sayingText ?? "").trim())
      : Boolean(s.sayingId);
  if (hasSaying) p += PRICING.saying;
  if (s.gold) p += PRICING.gold;
  if (s.addons.gift) p += PRICING.gift;
  if (s.addons.card) p += PRICING.card;
  if (s.addons.express) p += PRICING.express;
  if (s.addons.date) p += PRICING.date;
  return p;
}
