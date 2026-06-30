/** Memoisiertes Laden von Bildern (für Canvas-Vorschau & PNG-Export). */
const cache = new Map<string, Promise<HTMLImageElement>>();

export function loadImage(src: string): Promise<HTMLImageElement> {
  let p = cache.get(src);
  if (!p) {
    p = new Promise((resolve, reject) => {
      const img = new Image();
      // Same-Origin (/public) – hält das Canvas „untainted" für toDataURL().
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Bild konnte nicht geladen werden: ${src}`));
      img.src = src;
    });
    cache.set(src, p);
  }
  return p;
}
