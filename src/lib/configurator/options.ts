import type { ShapeId, ConfiguratorState, AddonsState } from "./types";
import { DEFAULT_FONT_ID } from "@/lib/fonts";
import { PRICING } from "@/lib/content";

/* ── Form ──────────────────────────────────────────────────── */

export interface ShapeOption {
  id: ShapeId;
  label: string;
  hint: string;
}

export const SHAPES: ShapeOption[] = [
  { id: "heart", label: "Herz", hint: "Romantisch · für Liebes­botschaften" },
  { id: "square", label: "Quadrat", hint: "Klar · zeitlos · 29 × 29 cm" },
];

/* ── Farbwelten (Hintergründe) ─────────────────────────────────
   Zwei Quellen:
   1) Prozedurale „Ink"-Verläufe – garantiert textfrei & stabil,
      ideal als Vorschau-Hintergrund für den Namen.
   2) Echte Foto-Texturen aus /public/backgrounds.

   TODO (Founder): Weitere echte, textfreie Ink-Scans als Foto-
   Hintergründe ergänzen – einfach Datei in /public/backgrounds
   legen und unten einen Eintrag hinzufügen. */

export interface InkBlob {
  /** Position 0..1 relativ zur Fläche. */
  x: number;
  y: number;
  /** Radius als Anteil der Kantenlänge. */
  r: number;
  /** Hex-Farbe. */
  color: string;
  /** Deckkraft im Zentrum 0..1. */
  alpha: number;
}

export interface GradientBackground {
  id: string;
  kind: "gradient";
  label: string;
  /** Grundton (Papier/Tinte-Basis). */
  base: string;
  blobs: InkBlob[];
}

export interface PhotoBackground {
  id: string;
  kind: "photo";
  label: string;
  src: string;
}

export type Background = GradientBackground | PhotoBackground;

/*
  Farbwelt-Bibliothek: handgemalte Alkohol-Ink-Texturen (Foto). Eine Textur
  pro Farbwelt – die Render-Engine maskiert sie in Herz ODER Quadrat. Deshalb
  braucht es KEINE separaten Herz-Assets.

  TODO (Founder): Diese Texturen stammen z. T. aus niedrig aufgelösten Vorlagen.
  Für gestochen scharfe PNG-Mockups bitte hochauflösende, quadratische, textfreie
  Scans (≥ 1400 px) nach /public/backgrounds/worlds/ legen (gleiche Dateinamen).
*/
export const BACKGROUNDS: Background[] = [
  { id: "rose", kind: "photo", label: "Rosé & Gold", src: "/backgrounds/worlds/rose.jpg" },
  { id: "blush-gold", kind: "photo", label: "Blush & Gold", src: "/backgrounds/worlds/blush-gold.jpg" },
  { id: "magenta-gold", kind: "photo", label: "Magenta & Gold", src: "/backgrounds/worlds/magenta-gold.jpg" },
  { id: "mauve", kind: "photo", label: "Altrosa & Gold", src: "/backgrounds/worlds/mauve.jpg" },
  { id: "lavendel-gold", kind: "photo", label: "Lavendel & Gold", src: "/backgrounds/worlds/lavendel-gold.jpg" },
  { id: "koralle", kind: "photo", label: "Koralle & Gold", src: "/backgrounds/worlds/koralle.jpg" },
  { id: "sand-gold", kind: "photo", label: "Sand & Gold", src: "/backgrounds/worlds/sand-gold.jpg" },
  { id: "petrol-gold", kind: "photo", label: "Petrol & Gold", src: "/backgrounds/worlds/petrol-gold.jpg" },
  { id: "navy-gold", kind: "photo", label: "Marine & Gold", src: "/backgrounds/worlds/navy-gold.jpg" },
];

export const DEFAULT_BACKGROUND_ID = "rose";

export function getBackground(id: string): Background {
  return BACKGROUNDS.find((b) => b.id === id) ?? BACKGROUNDS[0];
}

/* ── Sprüche ───────────────────────────────────────────────────
   DE-Label + arabischer Text. TODO (Founder): nach Bedarf ergänzen. */

export interface Saying {
  id: string;
  label: string; // Deutsch
  ar: string; // Arabisch (wird gemalt)
}

export const SAYINGS: Saying[] = [
  { id: "mother", label: "Liebste Mutter", ar: "أمي الحبيبة" },
  { id: "father", label: "Bester Vater", ar: "أبي الحبيب" },
  { id: "darling", label: "Mein Schatz", ar: "حبيبتي" },
  { id: "iloveyou", label: "Ich liebe dich", ar: "أحبك" },
  { id: "eid", label: "Eid Mubarak", ar: "عيد مبارك" },
  { id: "welcome", label: "Willkommen", ar: "أهلاً وسهلاً" },
];

export function getSaying(id: string | null): Saying | null {
  if (!id) return null;
  return SAYINGS.find((s) => s.id === id) ?? null;
}

/* ── Veredelungen / Upsells ────────────────────────────────────
   Elegant präsentiert als „Veredle dein Unikat" – nicht als billige
   Cross-Sells. Jede Option verkauft ein Gefühl. */

export interface AddonOption {
  id: keyof AddonsState;
  label: string;
  desc: string;
  price: number;
}

export const ADDONS: AddonOption[] = [
  {
    id: "gift",
    label: "Premium-Geschenkverpackung",
    desc: "In Seidenpapier, getrocknete Blumen und Liebe verpackt – bereit zum Verschenken.",
    price: PRICING.gift,
  },
  {
    id: "card",
    label: "Handgeschriebene Grußkarte",
    desc: "Deine Worte, von Hand geschrieben und beigelegt.",
    price: PRICING.card,
  },
  {
    id: "express",
    label: "Express-Anfertigung",
    desc: "Dein Unikat rückt in der Werkstatt nach vorn – schneller bei dir.",
    price: PRICING.express,
  },
  {
    id: "largeFormat",
    label: "Großformat · 40 × 40 cm",
    desc: "Mehr Fläche, mehr Wirkung an der Wand.",
    price: PRICING.largeFormat,
  },
];

/* ── Default-Zustand ──────────────────────────────────────────── */

export const DEFAULT_STATE: ConfiguratorState = {
  shape: "heart",
  backgroundId: DEFAULT_BACKGROUND_ID,
  name: "",
  fontId: DEFAULT_FONT_ID,
  sayingId: null,
  sayingPosition: "bottom",
  gold: false,
  addons: { gift: false, card: false, express: false, largeFormat: false },
};

/** Beispielname für die Vorschau, solange noch nichts eingegeben wurde. */
export const PLACEHOLDER_NAME = "سلوى";
