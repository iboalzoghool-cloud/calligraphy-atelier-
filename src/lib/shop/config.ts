/*
  ───────────────────────────────────────────────────────────────
  SHOP-KONFIGURATION (zentrale Preis-Config, leicht änderbar)
  Zwei Linien:
   · ORIGINALE  – personalisiert, von Hand gemalt (Preise: SIZES in
                  lib/configurator/options.ts – dort ist die Quelle).
   · EDITIONEN  – Kunstdrucke ausgewählter Motive (Preise hier).
  ───────────────────────────────────────────────────────────────
*/

export interface EditionSize {
  id: string;
  label: string;
  /** Endpreis in Cent. */
  price: number;
}

export interface EditionProduct {
  id: string;
  title: string;
  /** Kurzbeschreibung (Karte + Checkout + Bestell-Mail). */
  note: string;
  /** Bild aus dem Bestand (echtes Werkfoto). */
  image: string;
  /** Signaturfarbe (wie Galerie). */
  accent: string;
  sizes: EditionSize[];
}

/*
  EDITIONEN-SCHALTER (Brahim, 2026-07-03): Verkauf der Editionen ist
  vorerst PAUSIERT – Preise/Kaufen verschwinden von der Seite, die
  komplette Implementierung (Sektion, Checkout, Mails) bleibt erhalten.
  Wieder live schalten = dieses Flag auf true.
*/
export const EDITIONS_LIVE = false;

/** Druckgrößen + Preisspanne 19–39 € (Endpreise). */
const PRINT_SIZES: EditionSize[] = [
  { id: "a4", label: "A4 · 21 × 29,7 cm", price: 1900 },
  { id: "a3", label: "A3 · 29,7 × 42 cm", price: 2900 },
  { id: "50x70", label: "50 × 70 cm", price: 3900 },
];

/** Die stärksten nicht-personalisierten Motive aus der Galerie. */
export const EDITIONS: EditionProduct[] = [
  {
    id: "makkah",
    title: "Wo immer du bist",
    note: "Makka-Motiv in warmen Tönen",
    image: "/atelier/makkah.jpg",
    accent: "#b0863f",
    sizes: PRINT_SIZES,
  },
  {
    id: "relief",
    title: "Nach jeder Härte",
    note: "Quran 94:5 · Ton in Ton",
    image: "/atelier/relief.jpg",
    accent: "#a9744f",
    sizes: PRINT_SIZES,
  },
  {
    id: "mawadda",
    title: "Zuneigung & Ruhe",
    note: "مودة · warme Farbwelt",
    image: "/atelier/mawadda.jpg",
    accent: "#8a5f77",
    sizes: PRINT_SIZES,
  },
  {
    id: "allah-muhammad",
    title: "Allah · Muhammad",
    note: "Zweiteiler in Türkis & Gold",
    image: "/atelier/allah-muhammad.jpg",
    accent: "#2f8f96",
    sizes: PRINT_SIZES,
  },
  {
    id: "quds",
    title: "Auf der Staffelei",
    note: "Quds-Motiv · Atelierstück",
    image: "/gallery/quds-staffelei.jpg",
    accent: "#a9823b",
    sizes: PRINT_SIZES,
  },
];

export function getEdition(productId: string): EditionProduct | null {
  return EDITIONS.find((p) => p.id === productId) ?? null;
}

export function getEditionSize(p: EditionProduct, sizeId: string): EditionSize | null {
  return p.sizes.find((s) => s.id === sizeId) ?? null;
}

/** Versand & Steuern (Kleinunternehmer als Standard – Brahim bestätigt). */
export const SHOP = {
  currency: "eur" as const,
  /** Versand pauschal in Cent (Endpreis-Logik; 0 = im Preis enthalten). */
  shippingCents: 0,
  shippingNote: "Versand innerhalb Deutschlands inklusive",
  deliveryOriginal: "Von Hand gemalt in 7–14 Tagen",
  deliveryEdition: "Druck & Versand in 4–7 Tagen",
  /** "kleinunternehmer" → kein USt-Ausweis (§ 19 UStG) | "regel" → 19 % ausweisen */
  vatMode: "kleinunternehmer" as "kleinunternehmer" | "regel",
  vatNote: "Endpreise. Kein Ausweis der Umsatzsteuer gemäß § 19 UStG.",
};

/** Feature-Erkennung: echter Stripe-Testmodus vs. Mock vs. aus. */
export function stripeMode(): "live-test" | "mock" | "off" {
  const key = process.env.STRIPE_SECRET_KEY;
  if (key?.startsWith("sk_test_")) return "live-test";
  // Sicherheitsnetz: Live-Keys werden bewusst NICHT akzeptiert –
  // der Wechsel auf Live ist Brahims manueller, informierter Schritt.
  if (key) return "off";
  if (process.env.NODE_ENV !== "production" || process.env.SHOP_MOCK_CHECKOUT === "1")
    return "mock";
  return "off";
}
