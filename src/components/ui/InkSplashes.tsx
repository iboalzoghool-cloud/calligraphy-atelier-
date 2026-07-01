import type { CSSProperties } from "react";

/*
  Weiche, driftende Tinten-Farbkleckser als Ambiente hinter einer Sektion –
  gibt dem Creme mehr Farbe & Textur, ohne den Text zu stören (stark geblurrt,
  niedrige Deckkraft). Reine CSS-Animation (reduced-motion-safe über globals).
  Elternsektion braucht `relative` (+ i. d. R. `overflow-hidden`).
*/

const BRAND = [
  "rgba(178,94,119,0.20)", // Rosé
  "rgba(63,107,110,0.18)", // Petrol
  "rgba(169,130,59,0.16)", // Gold
  "rgba(182,122,86,0.17)", // Terracotta
  "rgba(93,63,87,0.16)", // Plum
];

const BLOBS: CSSProperties[] = [
  { left: "-6%", top: "6%", width: "38%" },
  { right: "-5%", top: "16%", width: "32%" },
  { left: "18%", bottom: "-10%", width: "36%" },
  { right: "20%", bottom: "2%", width: "28%" },
];

export function InkSplashes({
  className = "",
  colors = BRAND,
}: {
  className?: string;
  colors?: string[];
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      {BLOBS.map((pos, i) => (
        <div
          key={i}
          className="animate-drift absolute rounded-full"
          style={{
            ...pos,
            aspectRatio: "1 / 1",
            background: `radial-gradient(circle, ${colors[i % colors.length]}, transparent 70%)`,
            filter: "blur(42px)",
            animationDelay: `${-i * 3.2}s`,
          }}
        />
      ))}
    </div>
  );
}
