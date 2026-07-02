import type { ConfiguratorState } from "./types";
import { getBackground, getSaying, getSize, heartSrcFor } from "./options";
import { CALLIGRAPHY_FONTS, getCalligraphyFont } from "@/lib/fonts";
import { drawArtwork, type DrawInput } from "./render";
import { loadImage } from "./image-cache";

/** Baut den vollständigen DrawInput aus dem Zustand (Bild separat geladen). */
export function resolveDrawInput(
  state: ConfiguratorState,
  size: number,
  bgImage: HTMLImageElement | null,
  displayName: string,
  shapeImage: HTMLImageElement | null = null,
): DrawInput {
  const background = getBackground(state.backgroundId);
  const font = getCalligraphyFont(state.fontId);
  const dim = getSize(state.sizeId);

  // Spruch: Freitext (custom) hat Vorrang, sonst ein Eintrag aus SAYINGS.
  const sayingAr =
    state.sayingId === "custom"
      ? (state.sayingText ?? "").trim() || null
      : (getSaying(state.sayingId)?.ar ?? null);

  return {
    shape: state.shape,
    widthCm: dim.w,
    heightCm: dim.h,
    background,
    bgImage,
    shapeImage,
    name: displayName,
    fontFamily: font.family,
    fontWeight: font.weight,
    saying: sayingAr ? { ar: sayingAr, position: state.sayingPosition } : null,
    sayingFamily: font.family,
    gold: state.gold,
    size,
  };
}

/** Erster Family-Token (für document.fonts.load). */
function primaryFamily(family: string): string {
  return family.split(",")[0].trim();
}

const FONT_SAMPLE = "مريم عيد مبارك أمي الحبيبة Abc";

/** Stellt sicher, dass alle Kalligrafie-Fonts (inkl. Arabisch) geladen sind. */
export async function ensureFontsLoaded(): Promise<void> {
  if (typeof document === "undefined" || !("fonts" in document)) return;
  // allSettled: ein fehlschlagender Load darf die anderen NICHT blockieren
  // (sonst werden arabische Glyphen mit dem Fallback gerendert).
  await Promise.allSettled(
    CALLIGRAPHY_FONTS.flatMap((f) => {
      const fam = primaryFamily(f.family);
      return [
        document.fonts.load(`${f.weight} 72px ${fam}`, FONT_SAMPLE),
        document.fonts.load(`400 72px ${fam}`, FONT_SAMPLE),
      ];
    }),
  );
  try {
    await document.fonts.ready;
  } catch {
    // ignorieren
  }
}

/**
 * Rendert die Konfiguration in hoher Auflösung und gibt ein PNG
 * als data-URL zurück (für die Bestell-Spezifikation).
 */
export async function exportMockup(
  state: ConfiguratorState,
  size = 1080,
): Promise<string> {
  const background = getBackground(state.backgroundId);
  let img: HTMLImageElement | null = null;
  if (background.kind === "photo") {
    try {
      img = await loadImage(background.src);
    } catch {
      img = null;
    }
  }

  // Freigestelltes Herz-Motiv (falls vorhanden & Form = Herz)
  let shapeImg: HTMLImageElement | null = null;
  const heartSrc = state.shape === "heart" ? heartSrcFor(state.backgroundId) : undefined;
  if (heartSrc) {
    try {
      shapeImg = await loadImage(heartSrc);
    } catch {
      shapeImg = null;
    }
  }

  await ensureFontsLoaded();

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas-Kontext nicht verfügbar.");

  drawArtwork(ctx, resolveDrawInput(state, size, img, state.name.trim(), shapeImg));
  return canvas.toDataURL("image/png");
}
