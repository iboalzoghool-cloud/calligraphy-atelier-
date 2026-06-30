import type { CSSProperties } from "react";
import type { ShapeId, SayingPosition } from "./types";
import type { Background, GradientBackground } from "./options";

/* ───────────────────────────────────────────────────────────────
   CANVAS-RENDER-ENGINE
   Zeichnet die komplette Vorschau in EIN <canvas>:
   Form-Maske → Hintergrund → Name → Spruch → Goldakzente.
   Reine Funktionen, von Live-Vorschau UND PNG-Export genutzt.
   ─────────────────────────────────────────────────────────────── */

export interface DrawInput {
  shape: ShapeId;
  background: Background;
  /** Bereits geladenes Bild für Foto-Hintergründe (sonst null). */
  bgImage: HTMLImageElement | null;
  name: string;
  fontFamily: string;
  fontWeight: number;
  saying: { ar: string; position: SayingPosition } | null;
  sayingFamily: string;
  gold: boolean;
  /** Logische Kantenlänge (quadratisch) in px. */
  size: number;
}

const INK = "#1d1714";

/* ── Farb-Helfer ──────────────────────────────────────────────── */

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgba(hex: string, alpha: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/* ── Form-Pfade ──────────────────────────────────────────────── */

/** Klassisches Herz, das die Box (x,y,w,h) ausfüllt. */
function heartPath(x: number, y: number, w: number, h: number): Path2D {
  const p = new Path2D();
  const top = h * 0.3;
  p.moveTo(x + w / 2, y + top);
  p.bezierCurveTo(x + w / 2, y, x, y, x, y + top);
  p.bezierCurveTo(x, y + (h + top) / 2, x + w / 2, y + (h + top) / 2, x + w / 2, y + h);
  p.bezierCurveTo(x + w / 2, y + (h + top) / 2, x + w, y + (h + top) / 2, x + w, y + top);
  p.bezierCurveTo(x + w, y, x + w / 2, y, x + w / 2, y + top);
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
    : roundedRectPath(x, y, w, h, w * 0.045);
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
  // Leichter Überzug (overscan) schiebt Rand-Artefakte (weiße Ränder von
  // Screenshots / Grau aus freigestellten Herzen) aus der Maske heraus.
  dw *= zoom;
  dh *= zoom;
  ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
}

/* ── Text ────────────────────────────────────────────────────── */

const ARABIC_RE = /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/;
export function isArabic(text: string): boolean {
  return ARABIC_RE.test(text);
}

/** Verkleinert die Schrift, bis der Text in maxWidth passt. */
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
  // Sanfter heller Halo für Lesbarkeit auf lebhafter Tinte.
  ctx.shadowColor = "rgba(255,255,255,0.55)";
  ctx.shadowBlur = fontSize * 0.18;
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
) {
  ctx.save();
  ctx.clip(path);
  // Diagonaler Gold-Schimmer (soft-light = edel, nicht grell).
  ctx.globalCompositeOperation = "soft-light";
  const sheen = ctx.createLinearGradient(x, y, x + w, y + h);
  sheen.addColorStop(0, "rgba(216, 178, 92, 0.0)");
  sheen.addColorStop(0.45, "rgba(229, 197, 120, 0.85)");
  sheen.addColorStop(0.7, "rgba(186, 142, 56, 0.6)");
  sheen.addColorStop(1, "rgba(216, 178, 92, 0.0)");
  ctx.fillStyle = sheen;
  ctx.fillRect(x, y, w, h);
  ctx.restore();

  // Feiner Gold-Innenrahmen.
  ctx.save();
  ctx.clip(path);
  ctx.globalCompositeOperation = "overlay";
  ctx.lineWidth = Math.max(2, w * 0.012);
  ctx.strokeStyle = "rgba(196, 156, 70, 0.7)";
  ctx.stroke(path);
  ctx.restore();
}

/* ── Hauptzeichnung ──────────────────────────────────────────── */

export function drawArtwork(ctx: CanvasRenderingContext2D, input: DrawInput) {
  const { size, shape, background, bgImage, gold } = input;

  ctx.clearRect(0, 0, size, size);

  const pad = size * 0.085;
  const x = pad;
  const y = pad;
  const w = size - pad * 2;
  const h = size - pad * 2;

  const path = buildShapePath(shape, x, y, w, h);

  // 1) Hintergrund (innerhalb der Form-Maske)
  ctx.save();
  ctx.clip(path);
  if (background.kind === "photo") {
    if (bgImage) {
      drawImageCover(ctx, bgImage, x, y, w, h, 1.08);
    } else {
      ctx.fillStyle = "#f1e7df";
      ctx.fillRect(x, y, w, h);
    }
  } else {
    paintGradient(ctx, background, x, y, w, h);
  }

  // dezente Vignette für Tiefe
  const vg = ctx.createRadialGradient(
    x + w / 2,
    y + h / 2,
    w * 0.2,
    x + w / 2,
    y + h / 2,
    w * 0.72,
  );
  vg.addColorStop(0, "rgba(0,0,0,0)");
  vg.addColorStop(1, "rgba(40,25,30,0.10)");
  ctx.fillStyle = vg;
  ctx.fillRect(x, y, w, h);
  ctx.restore();

  // 2) Name + 3) Spruch (innerhalb der Maske, damit nichts überläuft)
  ctx.save();
  ctx.clip(path);

  const name = input.name.trim();
  const heart = shape === "heart";

  if (name) {
    const maxW = w * (heart ? 0.7 : 0.8);
    const startSize = size * (heart ? 0.19 : 0.2);
    const fs = fitFontSize(ctx, name, input.fontFamily, input.fontWeight, maxW, startSize);
    // Im Herz sitzt der Name etwas oberhalb der Mitte (mehr Fläche oben).
    const cyName = input.saying
      ? y + h * (heart ? 0.42 : 0.44)
      : y + h * (heart ? 0.46 : 0.5);
    drawCenteredText(ctx, name, x + w / 2, cyName, fs, input.fontFamily, input.fontWeight, INK);
  }

  if (input.saying) {
    const top = input.saying.position === "top";
    const maxW = w * (heart ? 0.5 : 0.7);
    const startSize = size * 0.085;
    const fs = fitFontSize(
      ctx,
      input.saying.ar,
      input.sayingFamily,
      400,
      maxW,
      startSize,
    );
    const cy = top
      ? y + h * (heart ? 0.26 : 0.18)
      : y + h * (heart ? 0.66 : 0.8);
    drawCenteredText(ctx, input.saying.ar, x + w / 2, cy, fs, input.sayingFamily, 400, INK);
  }
  ctx.restore();

  // 4) Goldakzente
  if (gold) {
    applyGold(ctx, path, x, y, w, h);
  }

  // 5) Feine Kantenlinie für Definition gegen den Seitenhintergrund
  ctx.save();
  ctx.lineWidth = Math.max(1, size * 0.0025);
  ctx.strokeStyle = "rgba(27,23,20,0.10)";
  ctx.stroke(path);
  ctx.restore();
}

/* ── CSS-Helfer für Auswahl-Kacheln (gleiche Optik wie Canvas) ── */

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
