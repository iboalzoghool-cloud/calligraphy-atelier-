import type { CalligraphyFontId } from "@/lib/fonts";

export type ShapeId = "heart" | "square";
export type SayingPosition = "top" | "bottom";

/** Optionale Veredelungen (Upsells). Gold & Spruch sind eigene Felder. */
export interface AddonsState {
  gift: boolean; // Premium-Geschenkverpackung
  card: boolean; // handgeschriebene Grußkarte
  express: boolean; // Express-Anfertigung
  largeFormat: boolean; // Großformat 40 × 40 cm
}

/** Gesamter Konfigurator-Zustand (zentral, im React-State gehalten). */
export interface ConfiguratorState {
  shape: ShapeId;
  backgroundId: string;
  name: string;
  fontId: CalligraphyFontId;
  sayingId: string | null;
  sayingPosition: SayingPosition;
  gold: boolean;
  addons: AddonsState;
}
