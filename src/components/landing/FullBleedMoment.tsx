"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { InkReveal } from "@/components/ui/InkReveal";

/**
 * „Atemhol-Moment": ein vollflächiges Stück echter Alkohol-Tinte, das beim
 * Scrollen sanft parallax-wandert, mit einer ruhigen Aussage darüber.
 * Ein Werk, das für sich wirkt – nicht überladen.
 */
export function FullBleedMoment() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);

  return (
    <section
      ref={ref}
      aria-label="Warum handgemalt"
      className="relative flex min-h-[68vh] items-center justify-center overflow-hidden"
    >
      {/* Echte Ink-Textur, leicht übergroß für den Parallax-Spielraum */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 -inset-y-[12%]"
        style={reduce ? undefined : { y }}
      >
        <Image
          src="/gallery/ink-textur.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* warmer Schleier für Lesbarkeit */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(36,29,21,0.52), rgba(36,29,21,0.4) 50%, rgba(36,29,21,0.58))",
        }}
      />

      <div className="container-page relative py-24 text-center md:py-32">
        <InkReveal>
          <p className="eyebrow justify-center text-gold-soft">Warum handgemalt</p>
          <p className="mx-auto mt-6 max-w-3xl text-balance font-display text-[1.7rem] italic leading-[1.32] text-paper-2 md:text-[2.6rem]">
            Kein Produkt aus dem Regal — ein Stück Zuneigung, das vor deinen
            Augen entsteht.
          </p>
        </InkReveal>
      </div>
    </section>
  );
}
