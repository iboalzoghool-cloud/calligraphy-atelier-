"use client";

import type { CSSProperties, PointerEvent, ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

/*
  ──────────────────────────────────────────────────────────────
  FloatingFrame — wiederverwendbarer 3D-Schwebe-/Kipp-Effekt
  Sanftes Schweben, Neigung zum Cursor (rotateX/rotateY) plus
  ein mitwandernder Glanz und ein mitwandernder Schatten.
  Framer Motion + CSS 3D (perspective, transform-style: preserve-3d).
  Respektiert prefers-reduced-motion.
  ──────────────────────────────────────────────────────────────
*/

const SHADOW_COLOR = "rgba(60, 30, 40, 0.22)";

interface FloatingFrameProps {
  children: ReactNode;
  /**
   * `true`  → Rahmen kippt zum Cursor (z. B. Konfigurator-Vorschau).
   * `false` → nur sanftes Eigen-Drehen, ohne Pointer (z. B. Hero).
   */
  interactive?: boolean;
  /** Mitwandernder Glanz-Layer (nur bei `interactive`). Default: an. */
  glare?: boolean;
  /** Permanentes, sanftes Schweben. Default: an. Bei `false` nur Hover-Tilt. */
  float?: boolean;
  /** Mitwandernder Drop-Shadow. Aus, wenn das Kind einen eigenen Schatten trägt. */
  shadow?: boolean;
  /** Maximaler Kippwinkel zum Cursor, in Grad. */
  maxTilt?: number;
  /** Schwebe-Amplitude in px. */
  floatDistance?: number;
  className?: string;
  style?: CSSProperties;
}

export function FloatingFrame({
  children,
  interactive = true,
  glare = true,
  float = true,
  shadow = true,
  maxTilt = 14,
  floatDistance = 10,
  className = "",
  style,
}: FloatingFrameProps) {
  const reduce = useReducedMotion();

  // Roh-Werte aus der Mausposition (in Grad); Federung erzeugt den Nachlauf.
  const tiltXRaw = useMotionValue(0); // rotateX – Neigung nach oben/unten
  const tiltYRaw = useMotionValue(0); // rotateY – Neigung nach links/rechts
  const rotateX = useSpring(tiltXRaw, { stiffness: 90, damping: 14 });
  const rotateY = useSpring(tiltYRaw, { stiffness: 90, damping: 14 });

  // Glanz: Position in Prozent + Deckkraft (0 im Ruhezustand).
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareXs = useSpring(glareX, { stiffness: 120, damping: 18 });
  const glareYs = useSpring(glareY, { stiffness: 120, damping: 18 });
  const glareFade = useMotionValue(0);
  const glareOpacity = useSpring(glareFade, { stiffness: 140, damping: 22 });

  // Schatten wandert entgegen der Neigung → Gefühl von echtem Streiflicht.
  const shadowX = useTransform(rotateY, [-maxTilt, maxTilt], [24, -24]);
  const shadowY = useTransform(rotateX, [-maxTilt, maxTilt], [6, 46]);
  const dropShadow = useMotionTemplate`drop-shadow(${shadowX}px ${shadowY}px 38px ${SHADOW_COLOR})`;

  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareXs}% ${glareYs}%, rgba(255,255,255,0.55), rgba(255,255,255,0) 56%)`;

  const showGlare = interactive && glare && !reduce;

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || !interactive) return;
    const r = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5; // -0.5 … 0.5
    const ny = (e.clientY - r.top) / r.height - 0.5;
    tiltYRaw.set(nx * 2 * maxTilt);
    tiltXRaw.set(-ny * 2 * maxTilt * 0.8);
    glareX.set((nx + 0.5) * 100);
    glareY.set((ny + 0.5) * 100);
    glareFade.set(1);
  }

  function handleLeave() {
    tiltXRaw.set(0);
    tiltYRaw.set(0);
    glareX.set(50);
    glareY.set(50);
    glareFade.set(0);
  }

  // Sanftes Schweben; passiv zusätzlich langsames Eigen-Drehen.
  const floatAnim =
    reduce || !float
      ? undefined
      : interactive
        ? { y: [0, -floatDistance, 0] }
        : { y: [0, -floatDistance, 0], rotateY: [-9, 9, -9] };

  const baseShadow = `drop-shadow(0 26px 38px ${SHADOW_COLOR})`;
  const filter = !shadow ? "none" : reduce ? baseShadow : dropShadow;

  return (
    <div className={className} style={{ perspective: 1200, ...style }}>
      <motion.div
        animate={floatAnim}
        transition={
          floatAnim
            ? {
                duration: interactive ? 6 : 11,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : undefined
        }
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          onPointerMove={interactive ? handleMove : undefined}
          onPointerLeave={interactive ? handleLeave : undefined}
          style={{
            position: "relative",
            rotateX: interactive ? rotateX : undefined,
            rotateY: interactive ? rotateY : undefined,
            transformStyle: "preserve-3d",
            transformPerspective: 1200,
            filter,
          }}
        >
          {children}

          {showGlare && (
            <motion.div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background: glareBg,
                opacity: glareOpacity,
                mixBlendMode: "soft-light",
                pointerEvents: "none",
              }}
            />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
