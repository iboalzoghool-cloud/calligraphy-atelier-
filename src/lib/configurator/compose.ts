import type { ConfiguratorState } from "./types";
import { getBackground, getSaying } from "./options";
import { CALLIGRAPHY_FONTS, getCalligraphyFont } from "@/lib/fonts";
import { drawArtwork, type DrawInput } from "./render";
import { loadImage } from "./image-cache";

/** Baut den vollständigen DrawInput aus dem Zustand (Bild separat geladen). */
export function resolveDrawInput(
  state: ConfiguratorState,
  size: number,
  bgImage: HTMLImageElement | null,
  displayName: string,
): DrawInput {
  const background = getBackground(state.backgroundId);
  const font = getCalligraphyFont(state.fontId);
  const saying = getSaying(state.sayingId);

  return {
    shape: state.shape,
    background,
    bgImage,
    name: displayName,
    fontFamily: font.family,
    fontWeight: font.weight,
    saying: saying ? { ar: saying.ar, position: state.sayingPosition } : null,
    sayingFamily: font.family,
    gold: state.gold,
    size,
  };
}

/** Erster Family-Token (für document.fonts.load). */
function primaryFamily(family: string): string {
  return family.split(",")[0].trim();
}

const FONT_SAMPLE = "سلوى عيد مبارك أمي الحبيبة Abc";

/** Stellt sicher, dass alle Kalligrafie-Fonts (inkl. Arabisch) geladen sind. */
export async function ensureFontsLoaded(): Promise<void> {
  if (typeof document === "undefined" || !("fonts" in document)) return;
  try {
    await Promise.all(
      CALLIGRAPHY_FONTS.flatMap((f) => {
        const fam = primaryFamily(f.family);
        return [
          document.fonts.load(`${f.weight} 64px ${fam}`, FONT_SAMPLE),
          document.fonts.load(`400 64px ${fam}`, FONT_SAMPLE),
        ];
      }),
    );
    await document.fonts.ready;
  } catch {
    // Fallback-Fonts greifen automatisch – kein harter Fehler.
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
  await ensureFontsLoaded();

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas-Kontext nicht verfügbar.");

  drawArtwork(ctx, resolveDrawInput(state, size, img, state.name.trim()));
  return canvas.toDataURL("image/png");
}
