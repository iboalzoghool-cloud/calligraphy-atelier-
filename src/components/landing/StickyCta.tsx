"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Mobile Dauer-CTA (nur Landing): erscheint nach dem Hero, verschwindet am
 * Footer und verdeckt nie Content – solange sie sichtbar ist, bekommt der
 * Body ihre Höhe als Scroll-Padding. Safe-Area (iPhone-Homebar) inklusive.
 */
const BAR_HEIGHT = 68; // px, ohne safe-area

export function StickyCta() {
  const [pastHero, setPastHero] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  const show = pastHero && !footerInView;

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const footer = document.querySelector("footer");
    let io: IntersectionObserver | null = null;
    if (footer) {
      io = new IntersectionObserver(
        ([entry]) => setFooterInView(entry.isIntersecting),
        { rootMargin: "80px" },
      );
      io.observe(footer);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  // Platz reservieren, damit die Leiste nie Content verdeckt (nur mobil).
  useEffect(() => {
    if (!show) return;
    const mq = window.matchMedia("(min-width: 768px)");
    if (mq.matches) return;
    const prev = document.body.style.paddingBottom;
    document.body.style.paddingBottom = `calc(${BAR_HEIGHT}px + env(safe-area-inset-bottom))`;
    return () => {
      document.body.style.paddingBottom = prev;
    };
  }, [show]);

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 md:hidden transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div
        className="flex items-center justify-between gap-3 border-t border-line bg-surface/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-surface/85"
        style={{ height: BAR_HEIGHT, boxShadow: "0 -6px 24px rgba(36,29,21,0.08)" }}
      >
        <div className="min-w-0">
          <div className="truncate text-[15px] font-medium leading-tight text-ink">
            Dein Unikat gestalten
          </div>
          <div className="text-xs text-ink-soft">Handgemalt · ab 29 €</div>
        </div>
        <Link
          href="/gestalten"
          className="btn btn-primary min-h-12 shrink-0 px-6 text-[15px]"
          tabIndex={show ? 0 : -1}
        >
          Gestalten
        </Link>
      </div>
    </div>
  );
}
