import type { CSSProperties } from "react";
import type { ShapeId, SayingPosition } from "./types";
import type { Background, GradientBackground } from "./options";
import { MAX_SIZE_CM } from "./options";

/* ───────────────────────────────────────────────────────────────
   CANVAS-RENDER-ENGINE
   Zeichnet die komplette Vorschau in EIN <canvas>:
   Keilrahmen-Tiefe → Form-Maske → Hintergrund → Name → Spruch → Gold.
   Die Artwork-Box skaliert mit der physischen Leinwandgröße, sodass
   20×20 kompakter wirkt als 40×40. Reine Funktionen (Vorschau + Export).
   ─────────────────────────────────────────────────────────────── */

export interface DrawInput {
  shape: ShapeId;
  /** physische Maße (cm) – steuern Proportion & Skalierung. */
  widthCm: number;
  heightCm: number;
  background: Background;
  bgImage: HTMLImageElement | null;
  /** Freigestelltes Form-Bild (z. B. transparentes Herz). Wenn gesetzt und
      shape==='heart', wird das echte Motiv gezeichnet statt maskiert. */
  shapeImage: HTMLImageElement | null;
  name: string;
  fontFamily: string;
  fontWeight: number;
  saying: { ar: string; position: SayingPosition } | null;
  sayingFamily: string;
  gold: boolean;
  /** Logische Kantenlänge (quadratisches Viewport) in px. */
  size: number;
}

const INK = "#1d1714";

/* ── Farb-Helfer ──────────────────────────────────────────────── */

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h.split("").map((c) => c + c).join("")
      : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgba(hex: string, alpha: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/* ── Form-Pfade ──────────────────────────────────────────────── */

/** Plumpe, runde „Leinwand-Herz"-Form, die die Box (x,y,w,h) füllt. */
function heartPath(x: number, y: number, w: number, h: number): Path2D {
  const p = new Path2D();
  const cx = x + w / 2;
  const top = y + h * 0.29; // Höhe der Mulde zwischen den Bögen
  p.moveTo(cx, y + h); // untere Spitze
  // linke Flanke hoch zum linken Bogen
  p.bezierCurveTo(x + w * 0.2, y + h * 0.78, x - w * 0.01, y + h * 0.52, x + w * 0.02, y + h * 0.34);
  p.bezierCurveTo(x + w * 0.05, y + h * 0.06, x + w * 0.32, y + h * 0.02, cx, top);
  // rechter Bogen zurück zur Spitze
  p.bezierCurveTo(x + w * 0.68, y + h * 0.02, x + w * 0.95, y + h * 0.06, x + w * 0.98, y + h * 0.34);
  p.bezierCurveTo(x + w * 1.01, y + h * 0.52, x + w * 0.8, y + h * 0.78, cx, y + h);
  p.closePath();
  return p;
}

function roundedRectPath(
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): Path2D {
  const p = new Path2D();
  p.moveTo(x + r, y);
  p.arcTo(x + w, y, x + w, y + h, r);
  p.arcTo(x + w, y + h, x, y + h, r);
  p.arcTo(x, y + h, x, y, r);
  p.arcTo(x, y, x + w, y, r);
  p.closePath();
  return p;
}

function buildShapePath(
  shape: ShapeId,
  x: number,
  y: number,
  w: number,
  h: number,
): Path2D {
  return shape === "heart"
    ? heartPath(x, y, w, h)
    : roundedRectPath(x, y, w, h, Math.min(w, h) * 0.03);
}

/* ── Hintergründe ─────────────────────────────────────────────── */

function paintGradient(
  ctx: CanvasRenderingContext2D,
  bg: GradientBackground,
  x: number,
  y: number,
  w: number,
  h: number,
) {
  ctx.fillStyle = bg.base;
  ctx.fillRect(x, y, w, h);
  for (const b of bg.blobs) {
    const cx = x + b.x * w;
    const cy = y + b.y * h;
    const radius = b.r * w;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    g.addColorStop(0, rgba(b.color, b.alpha));
    g.addColorStop(0.55, rgba(b.color, b.alpha * 0.55));
    g.addColorStop(1, rgba(b.color, 0));
    ctx.fillStyle = g;
    ctx.fillRect(x, y, w, h);
  }
}

function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
  zoom = 1,
) {
  const ir = img.width / img.height;
  const r = w / h;
  let dw: number, dh: number;
  if (ir > r) {
    dh = h;
    dw = h * ir;
  } else {
    dw = w;
    dh = w / ir;
  }
  dw *= zoom;
  dh *= zoom;
  ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
}

/** „contain": ganzes Bild in die Box, Seitenverhältnis & Alpha erhalten. */
function drawImageContain(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
) {
  const ir = img.width / img.height;
  const r = w / h;
  let dw: number, dh: number;
  if (ir > r) {
    dw = w;
    dh = w / ir;
  } else {
    dh = h;
    dw = h * ir;
  }
  ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
}

/* ── Keilrahmen-Tiefe (3D-Leinwand) ───────────────────────────── */

function drawCanvasDepth(
  ctx: CanvasRenderingContext2D,
  shape: ShapeId,
  x: number,
  y: number,
  w: number,
  h: number,
  offX: number,
  offY: number,
) {
  const sidePath = buildShapePath(shape, x + offX, y + offY, w, h);
  const g = ctx.createLinearGradient(0, y, 0, y + h + offY);
  g.addColorStop(0, "#e8ddcc");
  g.addColorStop(1, "#c6b59c");
  ctx.save();
  ctx.fillStyle = g;
  ctx.fill(sidePath);
  ctx.restore();
}

/* ── Text ────────────────────────────────────────────────────── */

const ARABIC_RE = /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/;
export function isArabic(text: string): boolean {
  return ARABIC_RE.test(text);
}

function fitFontSize(
  ctx: CanvasRenderingContext2D,
  text: string,
  family: string,
  weight: number,
  maxWidth: number,
  startSize: number,
  minSize = 12,
): number {
  let s = startSize;
  ctx.font = `${weight} ${s}px ${family}`;
  while (ctx.measureText(text).width > maxWidth && s > minSize) {
    s -= 1;
    ctx.font = `${weight} ${s}px ${family}`;
  }
  return s;
}

function drawCenteredText(
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number,
  cy: number,
  fontSize: number,
  family: string,
  weight: number,
  color: string,
) {
  ctx.save();
  ctx.font = `${weight} ${fontSize}px ${family}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.direction = isArabic(text) ? "rtl" : "ltr";
  ctx.shadowColor = "rgba(255,255,255,0.5)";
  ctx.shadowBlur = fontSize * 0.16;
  ctx.fillStyle = color;
  ctx.fillText(text, cx, cy);
  ctx.restore();
}

/* ── Goldakzente ─────────────────────────────────────────────── */

function applyGold(
  ctx: CanvasRenderingContext2D,
  path: Path2D,
  x: number,
  y: number,
  w: number,
  h: number,
  outline = true,
) {
  ctx.save();
  ctx.clip(path);
  ctx.globalCompositeOperation = "soft-light";
  const sheen = ctx.createLinearGradient(x, y, x + w, y + h);
  sheen.addColorStop(0, "rgba(216, 178, 92, 0.0)");
  sheen.addColorStop(0.45, "rgba(229, 197, 120, 0.9)");
  sheen.addColorStop(0.7, "rgba(186, 142, 56, 0.65)");
  sheen.addColorStop(1, "rgba(216, 178, 92, 0.0)");
  ctx.fillStyle = sheen;
  ctx.fillRect(x, y, w, h);
  ctx.restore();

  // Kontur nur für die prozedurale Form – beim echten Herz-Asset läge die
  // Linie neben der tatsächlichen Kante.
  if (!outline) return;
  ctx.save();
  ctx.clip(path);
  ctx.globalCompositeOperation = "overlay";
  ctx.lineWidth = Math.max(2, w * 0.012);
  ctx.strokeStyle = "rgba(196, 156, 70, 0.75)";
  ctx.stroke(path);
  ctx.restore();
}

/* ── Hauptzeichnung ──────────────────────────────────────────── */

export function drawArtwork(ctx: CanvasRenderingContext2D, input: DrawInput) {
  const { size, shape, background, bgImage, gold, widthCm, heightCm } = input;

  ctx.clearRect(0, 0, size, size);

  // Artwork-Box aus physischer Größe (größte Kante = 40 cm → maxFraction)
  const maxFraction = 0.82;
  const unit = (size * maxFraction) / MAX_SIZE_CM; // px pro cm
  let boxW = widthCm * unit;
  let boxH = heightCm * unit;
  const cap = size * 0.9;
  const fit = Math.min(1, cap / Math.max(boxW, boxH));
  boxW *= fit;
  boxH *= fit;

  // Keilrahmen-Tiefe
  const depth = Math.max(5, boxW * 0.035);
  const offX = depth * 0.32;
  const offY = depth;

  // zentrieren (leicht nach oben für ausgewogenen Schweb-Look)
  const x = (size - boxW) / 2;
  const y = (size - boxH) / 2 - size * 0.012;

  const path = buildShapePath(shape, x, y, boxW, boxH);
  const heart = shape === "heart";
  // Echtes freigestelltes Herz-Motiv vorhanden?
  const useAsset = heart && !!input.shapeImage;

  if (useAsset && input.shapeImage) {
    // 1+2) Echtes Herz direkt zeichnen (eigene Form & Kante via Alpha)
    drawImageContain(ctx, input.shapeImage, x, y, boxW, boxH);
  } else {
    // 1) Keilrahmen-Tiefe (hinter der Fläche)
    drawCanvasDepth(ctx, shape, x, y, boxW, boxH, offX, offY);

    // 2) Hintergrund (maskiert)
    ctx.save();
    ctx.clip(path);
    if (background.kind === "photo") {
      if (bgImage) {
        drawImageCover(ctx, bgImage, x, y, boxW, boxH, 1.08);
      } else {
        ctx.fillStyle = "#f1e7df";
        ctx.fillRect(x, y, boxW, boxH);
      }
    } else {
      paintGradient(ctx, background, x, y, boxW, boxH);
    }
    const vg = ctx.createRadialGradient(
      x + boxW / 2,
      y + boxH / 2,
      boxW * 0.2,
      x + boxW / 2,
      y + boxH / 2,
      boxW * 0.72,
    );
    vg.addColorStop(0, "rgba(0,0,0,0)");
    vg.addColorStop(1, "rgba(40,25,30,0.1)");
    ctx.fillStyle = vg;
    ctx.fillRect(x, y, boxW, boxH);
    ctx.restore();
  }

  // 3) Name + Spruch (innerhalb der Maske)
  ctx.save();
  ctx.clip(path);

  const name = input.name.trim();
  if (name) {
    const maxW = boxW * (heart ? 0.64 : 0.78);
    const startSize = boxH * 0.26;
    const fs = fitFontSize(ctx, name, input.fontFamily, input.fontWeight, maxW, startSize);
    const cyName = input.saying
      ? y + boxH * (heart ? 0.41 : 0.43)
      : y + boxH * (heart ? 0.46 : 0.48);
    drawCenteredText(ctx, name, x + boxW / 2, cyName, fs, input.fontFamily, input.fontWeight, INK);
  }

  if (input.saying) {
    const top = input.saying.position === "top";
    const maxW = boxW * (heart ? 0.52 : 0.72);
    const startSize = boxH * 0.11;
    const fs = fitFontSize(ctx, input.saying.ar, input.sayingFamily, 400, maxW, startSize);
    const cy = top
      ? y + boxH * (heart ? 0.25 : 0.17)
      : y + boxH * (heart ? 0.64 : 0.81);
    drawCenteredText(ctx, input.saying.ar, x + boxW / 2, cy, fs, input.sayingFamily, 400, INK);
  }
  ctx.restore();

  // 4) Goldakzente
  if (gold) applyGold(ctx, path, x, y, boxW, boxH, !useAsset);

  // 5) feine Kantenlinie (nur bei prozeduraler Form; das Asset bringt eigene Kante mit)
  if (!useAsset) {
    ctx.save();
    ctx.lineWidth = Math.max(1, size * 0.002);
    ctx.strokeStyle = "rgba(27,23,20,0.12)";
    ctx.stroke(path);
    ctx.restore();
  }
}

/* ── CSS-Helfer für Auswahl-Kacheln ──────────────────────────── */

export function backgroundTileStyle(bg: Background): CSSProperties {
  if (bg.kind === "photo") {
    return {
      backgroundImage: `url(${bg.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  }
  const layers = bg.blobs
    .slice()
    .reverse()
    .map(
      (b) =>
        `radial-gradient(circle at ${b.x * 100}% ${b.y * 100}%, ${rgba(
          b.color,
          b.alpha,
        )} 0%, ${rgba(b.color, 0)} ${b.r * 100}%)`,
    )
    .join(", ");
  return {
    backgroundColor: bg.base,
    backgroundImage: layers,
  };
}
