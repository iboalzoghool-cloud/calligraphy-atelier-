import type { ConfiguratorState } from "./types";
import { getBackground, getSaying, SHAPES, ADDONS } from "./options";
import { getCalligraphyFont } from "@/lib/fonts";
import { PRICING, PRODUCT } from "@/lib/content";
import { formatPrice } from "@/lib/format";

/** Gesamtpreis (Cent) für einen Zustand. */
export function priceForState(s: ConfiguratorState): number {
  let p: number = PRICING.base[s.shape];
  if (s.sayingId) p += PRICING.saying;
  if (s.gold) p += PRICING.gold;
  if (s.addons.gift) p += PRICING.gift;
  if (s.addons.card) p += PRICING.card;
  if (s.addons.express) p += PRICING.express;
  if (s.addons.largeFormat) p += PRICING.largeFormat;
  return p;
}

/** Grundpreis je Form (für Anzeige in der Form-Auswahl). */
export function basePriceForShape(shape: ConfiguratorState["shape"]): number {
  return PRICING.base[shape];
}

/** Größenangabe abhängig vom Großformat-Upgrade. */
export function sizeLabel(s: ConfiguratorState): string {
  return s.addons.largeFormat ? "40 × 40 cm" : PRODUCT.sizeLabel;
}

export interface SummaryItem {
  label: string;
  value: string;
}

/** Lesbare Zusammenfassung der Konfiguration (Übersicht, Bestellung, E-Mail). */
export function buildSummary(s: ConfiguratorState): SummaryItem[] {
  const shape = SHAPES.find((sh) => sh.id === s.shape) ?? SHAPES[0];
  const bg = getBackground(s.backgroundId);
  const font = getCalligraphyFont(s.fontId);
  const saying = getSaying(s.sayingId);

  const items: SummaryItem[] = [
    { label: "Form", value: `${shape.label} (${formatPrice(PRICING.base[s.shape])})` },
    { label: "Größe", value: sizeLabel(s) },
    { label: "Farbwelt", value: bg.label },
    { label: "Name", value: s.name.trim() || "—" },
    { label: "Schrift", value: font.label },
    {
      label: "Spruch",
      value: saying
        ? `${saying.label} · ${saying.ar} (+ ${formatPrice(PRICING.saying)})`
        : "Ohne",
    },
  ];
  if (saying) {
    items.push({
      label: "Position Spruch",
      value: s.sayingPosition === "top" ? "Oben" : "Unten",
    });
  }
  items.push({
    label: "Goldakzente",
    value: s.gold ? `Ja (+ ${formatPrice(PRICING.gold)})` : "Nein",
  });

  // Veredelungen
  for (const a of ADDONS) {
    if (s.addons[a.id]) {
      items.push({ label: a.label, value: `+ ${formatPrice(a.price)}` });
    }
  }

  return items;
}

/** Plain-Text-Zusammenfassung (für die Bestell-E-Mail). */
export function summaryText(s: ConfiguratorState): string {
  const lines = buildSummary(s).map((i) => `• ${i.label}: ${i.value}`);
  lines.push(`• Gesamtpreis: ${formatPrice(priceForState(s))}`);
  return lines.join("\n");
}
