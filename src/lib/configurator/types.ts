import type { CalligraphyFontId } from "@/lib/fonts";

export type ShapeId = "heart" | "square";
export type SayingPosition = "top" | "bottom";

/** Optionale Veredelungen (Upsells). Gold & Spruch sind eigene Felder. */
export interface AddonsState {
  gift: boolean; // Premium-Geschenkverpackung
  card: boolean; // handgeschriebene Grußkarte
  express: boolean; // Express-Anfertigung
  date: boolean; // Datum / Jahr ergänzen (z. B. Hochzeitsdatum)
}

/** Gesamter Konfigurator-Zustand (zentral, im React-State gehalten). */
export interface ConfiguratorState {
  shape: ShapeId;
  /** Leinwandgröße (bestimmt Proportionen & Grundpreis). */
  sizeId: string;
  backgroundId: string;
  name: string;
  fontId: CalligraphyFontId;
  /** Spruch-Id aus SAYINGS, `"custom"` für Freitext, oder null. */
  sayingId: string | null;
  /** Freitext-Spruch (nur wenn sayingId === "custom"). */
  sayingText?: string;
  sayingPosition: SayingPosition;
  gold: boolean;
  addons: AddonsState;
}
