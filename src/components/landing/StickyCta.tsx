"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Mobile Dauer-CTA: erscheint nach dem Hero, hält den Einstieg in den
 * Konfigurator immer griffbereit (Conversion). Nur auf kleinen Screens.
 */
export function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 md:hidden transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="m-3 flex items-center justify-between gap-3 rounded-full border border-line bg-surface/95 px-4 py-2 shadow-lift backdrop-blur">
        <div className="min-w-0 pl-1">
          <div className="text-sm font-medium text-ink">Dein Unikat gestalten</div>
          <div className="text-xs text-ink-soft">Von Hand gemalt · ab 29 €</div>
        </div>
        <Link
          href="/gestalten"
          className="btn btn-primary shrink-0 px-5 py-2.5 text-sm"
        >
          Starten
        </Link>
      </div>
    </div>
  );
}
