"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  /** Drift in px über den sichtbaren Bereich (größer = mehr Tiefe). */
  amount?: number;
  className?: string;
}

/**
 * Sanfte, scroll-gekoppelte Tiefe: das Element wandert etwas anders als der
 * Rest → Parallax. Ruhig und weich (Apple-artig), respektiert reduced motion.
 */
export function Parallax({ children, amount = 40, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}
