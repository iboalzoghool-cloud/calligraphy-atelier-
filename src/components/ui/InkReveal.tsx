"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface InkRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Titel „malen" sich beim Scrollen: aus weichem Tinten-Unschärfe heraus,
 * leicht heranskaliert – wie ein Strich, der sich setzt. Statt platter Fades.
 * Respektiert prefers-reduced-motion.
 */
export function InkReveal({ children, className, delay = 0 }: InkRevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.965, filter: "blur(10px)", y: 14 }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.95, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
