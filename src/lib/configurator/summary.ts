import type { ConfiguratorState, ShapeId } from "./types";
import {
  getBackground,
  getSaying,
  getSize,
  sizesForShape,
  SHAPES,
  ADDONS,
} from "./options";
import { getCalligraphyFont } from "@/lib/fonts";
import { PRICING } from "@/lib/content";
import { formatPrice } from "@/lib/format";

/** Gesamtpreis (Cent) für einen Zustand. */
export function priceForState(s: ConfiguratorState): number {
  let p = getSize(s.sizeId).price;
  if (s.sayingId) p += PRICING.saying;
  if (s.gold) p += PRICING.gold;
  if (s.addons.gift) p += PRICING.gift;
  if (s.addons.card) p += PRICING.card;
  if (s.addons.express) p += PRICING.express;
  if (s.addons.date) p += PRICING.date;
  return p;
}

/** Günstigster Preis einer Form (für „ab …" in der Form-Auswahl). */
export function minPriceForShape(shape: ShapeId): number {
  return Math.min(...sizesForShape(shape).map((s) => s.price));
}

/** Größenangabe (Label). */
export function sizeLabel(s: ConfiguratorState): string {
  return getSize(s.sizeId).label;
}

export interface SummaryItem {
  label: string;
  value: string;
}

/** Lesbare Zusammenfassung der Konfiguration (Übersicht, Bestellung, E-Mail). */
export function buildSummary(s: ConfiguratorState): SummaryItem[] {
  const shape = SHAPES.find((sh) => sh.id === s.shape) ?? SHAPES[0];
  const size = getSize(s.sizeId);
  const bg = getBackground(s.backgroundId);
  const font = getCalligraphyFont(s.fontId);
  const saying = getSaying(s.sayingId);

  const items: SummaryItem[] = [
    { label: "Form", value: shape.label },
    { label: "Größe", value: `${size.label} (${formatPrice(size.price)})` },
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
    label: "Mehr Gold",
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
