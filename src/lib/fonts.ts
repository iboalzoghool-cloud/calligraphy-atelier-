import {
  Cormorant_Garamond,
  Hanken_Grotesk,
  Aref_Ruqaa,
  Aref_Ruqaa_Ink,
  Amiri,
  Reem_Kufi,
  Gulzar,
} from "next/font/google";

/* ── UI-Schriften ──────────────────────────────────────────── */

// Display-Serife für Headlines (editorial, ruhig, edel).
// Nur die tatsächlich genutzten Gewichte (500 Headlines, 600 Logo) –
// jedes Gewicht ist eine eigene preloaded Datei auf dem kritischen Pfad.
export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-cormorant",
  display: "swap",
});

/* Hinweis: ein `text:`-Mini-Subset fürs Logo wäre ideal (LCP), wird von
   Turbopack aber (noch) nicht unterstützt – daher volle 500er-Datei. */

// Warme, charaktervolle Grotesk für Fließtext / UI (Design-Vorlage)
export const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hanken",
  display: "swap",
});

/* ── Arabische Kalligrafie-Fonts ───────────────────────────────
   Werden 1:1 in der <canvas>-Vorschau verwendet. `arabic` + `latin`-
   Subsets, damit beide Schriftsysteme sauber gerendert werden.

   `preload: false`: die arabischen Subsets sind groß (Ink ist ein
   Color-Font) und werden erst im Hero-Herz/Konfigurator gebraucht –
   sie dürfen den kritischen Pfad (Text, UI) nicht blockieren. */

// Aref Ruqaa Ink – Ruqʿah mit Tinten-Bleed (Signatur, sehr „handgemalt")
export const arefRuqaaInk = Aref_Ruqaa_Ink({
  subsets: ["arabic", "latin"],
  weight: ["700"],
  variable: "--font-aref-ink",
  display: "swap",
  preload: false,
});

/* Hero-/Deko-Instanz: nur Arabisch 400 – und bewusst PRELOADED. Der
   arabische Name auf dem Hero-Herz ist das LCP-Element der Landing;
   er darf nicht sekundenlang auf den Font-Swap warten. */
export const arefRuqaaDisplay = Aref_Ruqaa({
  subsets: ["arabic"],
  weight: ["400"],
  variable: "--font-aref",
  display: "swap",
});

/* Voll-Instanz für die Canvas-Vorschau (Latein + Bold 700), lazy.
   400-Arabisch kommt aus der Display-Instanz – sonst lädt dieselbe
   Datei doppelt (Preload-URL vs. CSS-URL). */
export const arefRuqaa = Aref_Ruqaa({
  subsets: ["arabic", "latin"],
  weight: ["700"],
  variable: "--font-aref-full",
  display: "swap",
  preload: false,
});

export const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
  preload: false,
});

export const reemKufi = Reem_Kufi({
  subsets: ["arabic", "latin"],
  variable: "--font-reem",
  display: "swap",
  preload: false,
});

// Gulzar – Nastaliq-Anmutung, sehr verschnörkelt (nur Arabisch)
export const gulzar = Gulzar({
  subsets: ["arabic"],
  weight: ["400"],
  variable: "--font-gulzar",
  display: "swap",
  preload: false,
});

/** Alle Font-CSS-Variablen für <body className>. */
export const fontVariables = [
  cormorant.variable,
  hanken.variable,
  arefRuqaaInk.variable,
  arefRuqaaDisplay.variable,
  arefRuqaa.variable,
  amiri.variable,
  reemKufi.variable,
  gulzar.variable,
].join(" ");

/* ── Kalligrafie-Registry (Konfigurator + Canvas) ─────────────── */

export type CalligraphyFontId = "arefInk" | "aref" | "amiri" | "reem" | "gulzar";

export interface CalligraphyFont {
  id: CalligraphyFontId;
  label: string;
  /** Kurze Charakterisierung für die Font-Auswahl. */
  note: string;
  /** font-family-String (gehasht von next/font) – für Canvas & Inline-Style. */
  family: string;
  /** Empfohlenes Schriftgewicht für die Vorschau. */
  weight: number;
  /** Schön v. a. in arabischer Schrift? (Hinweis in der UI) */
  arabicOnly?: boolean;
}

export const CALLIGRAPHY_FONTS: CalligraphyFont[] = [
  {
    id: "arefInk",
    label: "Aref Ruqaa Ink",
    note: "Tinte · ausdrucksstark",
    family: arefRuqaaInk.style.fontFamily,
    weight: 700,
  },
  {
    id: "aref",
    label: "Aref Ruqaa",
    note: "Klassisch · Ruqʿah",
    family: arefRuqaa.style.fontFamily,
    weight: 700,
  },
  {
    id: "amiri",
    label: "Amiri",
    note: "Elegant · Naskh",
    family: amiri.style.fontFamily,
    weight: 700,
  },
  {
    id: "reem",
    label: "Reem Kufi",
    note: "Modern · Kufi",
    family: reemKufi.style.fontFamily,
    weight: 600,
  },
  {
    id: "gulzar",
    label: "Gulzar",
    note: "Verschnörkelt · Nastaliq",
    family: gulzar.style.fontFamily,
    weight: 400,
    arabicOnly: true,
  },
];

export const DEFAULT_FONT_ID: CalligraphyFontId = "arefInk";

export function getCalligraphyFont(id: CalligraphyFontId): CalligraphyFont {
  return CALLIGRAPHY_FONTS.find((f) => f.id === id) ?? CALLIGRAPHY_FONTS[0];
}
