"use client";

import Image from "next/image";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FloatingFrame } from "@/components/ui/FloatingFrame";

interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
}

// Echte handgemalte Stücke. TODO (Founder): nach Belieben austauschen/ergänzen
// (Dateien in /public/gallery legen).
const ITEMS: GalleryItem[] = [
  { src: "/gallery/muttertag-herz.jpg", alt: "Herz mit Namen zum Muttertag", caption: "Muttertag" },
  { src: "/gallery/salwa-quadrat.jpg", alt: "Quadratisches Stück mit arabischem Namen", caption: "Namens-Quadrat" },
  { src: "/gallery/herz-eid.jpg", alt: "Herz mit Eid-Kalligrafie", caption: "Eid Mubarak" },
  { src: "/gallery/namen-quadrate.jpg", alt: "Zwei Namens-Quadrate auf Wiese", caption: "Doppelname" },
  { src: "/gallery/herz-welcome.jpg", alt: "Herz zur Geburt", caption: "Willkommen Baby" },
  { src: "/gallery/ink-textur.jpg", alt: "Rosé-Gold Tinten-Textur", caption: "Rosé & Gold" },
  { src: "/gallery/quds-staffelei.jpg", alt: "Gemaltes Motiv auf Staffelei", caption: "Auf Wunsch: Motive" },
];

export function Gallery() {
  const railRef = useRef<HTMLDivElement>(null);

  function scrollBy(dir: 1 | -1) {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 360), behavior: "smooth" });
  }

  return (
    <section id="galerie" className="scroll-mt-24 py-16 md:py-24">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Galerie"
            title="Echte Stücke, echte Hände"
            intro="Eine Auswahl bereits gemalter Unikate. Jedes entstand frei – die Vorschau im Konfigurator zeigt nur, wohin die Reise geht."
          />
          {/* Pfeile nur auf Desktop */}
          <div className="hidden gap-2 md:flex">
            <RailButton dir={-1} onClick={() => scrollBy(-1)} />
            <RailButton dir={1} onClick={() => scrollBy(1)} />
          </div>
        </div>
      </div>

      <div
        ref={railRef}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 md:gap-5 md:px-[max(2rem,calc((100vw-78rem)/2+2rem))]"
      >
        {ITEMS.map((item, i) => (
          <figure
            key={item.src}
            className="group relative w-[68vw] max-w-[17rem] shrink-0 snap-start sm:w-64"
          >
            <FloatingFrame interactive glare float={false} shadow={false} maxTilt={9}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-line shadow-soft transition-shadow duration-500 group-hover:shadow-lift">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 68vw, 17rem"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  priority={i < 2}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/55 to-transparent" />
                <figcaption className="absolute bottom-3 left-3 text-sm font-medium text-paper-2 drop-shadow">
                  {item.caption}
                </figcaption>
              </div>
            </FloatingFrame>
          </figure>
        ))}
      </div>
    </section>
  );
}

function RailButton({ dir, onClick }: { dir: 1 | -1; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === 1 ? "Weiter" : "Zurück"}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-ink transition hover:border-ink"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className={dir === 1 ? "" : "rotate-180"}>
        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
