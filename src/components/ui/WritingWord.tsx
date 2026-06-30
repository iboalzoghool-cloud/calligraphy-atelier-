"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Lang = "ar" | "de" | "en";

interface Word {
  t: string;
  lang: Lang;
}

// Warme, mehrsprachige Worte – „werden geschrieben", als male gerade jemand.
const WORDS: Word[] = [
  { t: "حب", lang: "ar" }, // Liebe
  { t: "Liebe", lang: "de" },
  { t: "أمي", lang: "ar" }, // Mama
  { t: "Love", lang: "en" },
  { t: "حبيبي", lang: "ar" }, // mein Liebster
  { t: "Eid Mubarak", lang: "en" },
  { t: "سلام", lang: "ar" }, // Frieden
  { t: "Für dich", lang: "de" },
];

const FONT: Record<Lang, string> = {
  ar: "var(--font-aref)",
  de: "var(--font-cormorant)",
  en: "var(--font-cormorant)",
};

export function WritingWord({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % WORDS.length), 2800);
    return () => clearInterval(id);
  }, []);

  const w = WORDS[i];
  const rtl = w.lang === "ar";
  const reveal = 1.1;

  return (
    <div
      className={`relative flex h-[1.3em] items-center justify-center ${className}`}
      aria-hidden
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.45 }}
        >
          <motion.span
            dir={rtl ? "rtl" : "ltr"}
            className="block whitespace-nowrap leading-none"
            style={{
              fontFamily: FONT[w.lang],
              fontStyle: w.lang === "ar" ? "normal" : "italic",
              color: "var(--color-ink)",
            }}
            initial={
              reduce
                ? false
                : { clipPath: rtl ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }
            }
            animate={reduce ? {} : { clipPath: "inset(0 0 0 0)" }}
            transition={{ duration: reveal, ease: [0.4, 0, 0.2, 1], delay: 0.12 }}
          >
            {w.t}
          </motion.span>

          {/* Pinselspitze, die mit dem Schreiben über das Wort wandert */}
          {!reduce ? (
            <motion.span
              className="pointer-events-none absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose blur-[1px]"
              initial={{ left: rtl ? "100%" : "0%", opacity: 0 }}
              animate={{ left: rtl ? "0%" : "100%", opacity: [0, 1, 1, 0] }}
              transition={{ duration: reveal, ease: [0.4, 0, 0.2, 1], delay: 0.12 }}
            />
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
