"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/*
  Farbklecks + Kalligrafie, die dynamisch „erscheint“:
  Ein organischer Tinten-Klecks blüht auf (Scale/Opacity, weiche Kante),
  die Kalligrafie darauf taucht aus der Unschärfe auf – wie frisch gemalt.
  In-view getriggert (einmalig), nur transform/opacity/filter (60 fps),
  prefers-reduced-motion → sofort statisch sichtbar.
*/

interface InkBloomProps {
  children: ReactNode;
  /** Klecks-Farbe (Werk-Akzent, 6-stelliges Hex). */
  color?: string;
  className?: string;
  /** Verzögerung in Sekunden (für gestaffelte Karten). */
  delay?: number;
  /** Klecks-Deckkraft im Zentrum (0..1). */
  strength?: number;
}

export function InkBloom({
  children,
  color = "#b25e77",
  className = "",
  delay = 0,
  strength = 0.16,
}: InkBloomProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const a = (alpha: number) =>
    `${color}${Math.round(alpha * 255)
      .toString(16)
      .padStart(2, "0")}`;

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      {/* Tinten-Klecks (organisch, blüht auf) */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: "-22% -30%",
          borderRadius: "52% 48% 57% 43% / 46% 58% 42% 54%",
          background: `radial-gradient(closest-side, ${a(strength)}, ${a(strength * 0.55)} 55%, transparent 78%)`,
          filter: "blur(10px)",
          transform: on ? "scale(1) rotate(-4deg)" : "scale(0.5) rotate(-16deg)",
          opacity: on ? 1 : 0,
          transition: `transform 1.3s cubic-bezier(.22,.68,.24,1) ${delay}s, opacity 1.1s ease ${delay}s`,
        }}
      />
      {/* Kalligrafie/Inhalt: taucht aus der Unschärfe auf */}
      <span
        style={{
          position: "relative",
          display: "inline-block",
          opacity: on ? 1 : 0,
          filter: on ? "blur(0px)" : "blur(9px)",
          transform: on ? "none" : "scale(1.05)",
          transition: `opacity .9s ease ${delay + 0.25}s, filter 1.1s ease ${delay + 0.25}s, transform 1.1s ease ${delay + 0.25}s`,
        }}
      >
        {children}
      </span>
    </div>
  );
}
