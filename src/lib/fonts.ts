import {
  Cormorant_Garamond,
  Inter,
  Aref_Ruqaa,
  Amiri,
  Reem_Kufi,
  Lateef,
} from "next/font/google";

/* ── UI-Schriften ──────────────────────────────────────────── */

// Display-Serife für Headlines (editorial, ruhig, edel)
export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

// Klare Sans für Fließtext / UI
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* ── Arabische Kalligrafie-Fonts ───────────────────────────────
   Werden 1:1 in der <canvas>-Vorschau verwendet. Deshalb auch
   `latin`-Subset, damit lateinische Namen sauber gerendert werden. */

export const arefRuqaa = Aref_Ruqaa({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-aref",
  display: "swap",
});

export const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

export const reemKufi = Reem_Kufi({
  subsets: ["arabic", "latin"],
  variable: "--font-reem",
  display: "swap",
});

export const lateef = Lateef({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-lateef",
  display: "swap",
});

/** Alle Font-CSS-Variablen für <body className>. */
export const fontVariables = [
  cormorant.variable,
  inter.variable,
  arefRuqaa.variable,
  amiri.variable,
  reemKufi.variable,
  lateef.variable,
].join(" ");

/* ── Kalligrafie-Registry (Konfigurator + Canvas) ─────────────── */

export type CalligraphyFontId = "aref" | "amiri" | "reem" | "lateef";

export interface CalligraphyFont {
  id: CalligraphyFontId;
  label: string;
  /** Kurze Charakterisierung für die Font-Auswahl. */
  note: string;
  /** font-family-String (gehasht von next/font) – für Canvas & Inline-Style. */
  family: string;
  /** Empfohlenes Schriftgewicht für die Vorschau. */
  weight: number;
}

export const CALLIGRAPHY_FONTS: CalligraphyFont[] = [
  {
    id: "aref",
    label: "Aref Ruqaa",
    note: "Klassisch · fließend",
    family: arefRuqaa.style.fontFamily,
    weight: 700,
  },
  {
    id: "amiri",
    label: "Amiri",
    note: "Elegant · traditionell",
    family: amiri.style.fontFamily,
    weight: 700,
  },
  {
    id: "reem",
    label: "Reem Kufi",
    note: "Modern · geometrisch",
    family: reemKufi.style.fontFamily,
    weight: 600,
  },
  {
    id: "lateef",
    label: "Lateef",
    note: "Weich · handschriftlich",
    family: lateef.style.fontFamily,
    weight: 700,
  },
];

export const DEFAULT_FONT_ID: CalligraphyFontId = "aref";

export function getCalligraphyFont(id: CalligraphyFontId): CalligraphyFont {
  return CALLIGRAPHY_FONTS.find((f) => f.id === id) ?? CALLIGRAPHY_FONTS[0];
}
