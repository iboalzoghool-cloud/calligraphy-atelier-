"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Selbstzeichnender Kalligrafie-Schwung (stroke via pathLength). */
const PATHS: Record<string, { vb: string; d: string }> = {
  swash: { vb: "0 0 320 50", d: "M6 32 C 64 8, 116 8, 156 28 S 252 48, 314 16" },
  underline: { vb: "0 0 320 22", d: "M4 13 C 84 3, 236 3, 316 11" },
  flourish: {
    vb: "0 0 320 60",
    d: "M8 40 C 50 12, 96 12, 128 32 C 160 52, 196 52, 224 30 C 250 10, 292 14, 312 34",
  },
};

interface InkStrokeProps {
  variant?: keyof typeof PATHS;
  className?: string;
  color?: string;
  width?: number;
  duration?: number;
  delay?: number;
}

export function InkStroke({
  variant = "swash",
  className = "",
  color = "var(--color-gold)",
  width = 3,
  duration = 1.4,
  delay = 0,
}: InkStrokeProps) {
  const reduce = useReducedMotion();
  const p = PATHS[variant] ?? PATHS.swash;

  return (
    <svg
      viewBox={p.vb}
      fill="none"
      className={className}
      preserveAspectRatio="none"
      aria-hidden
    >
      <motion.path
        d={p.d}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration, ease: [0.4, 0, 0.2, 1], delay }}
      />
    </svg>
  );
}
