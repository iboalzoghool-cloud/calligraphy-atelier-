import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FloatingFrame } from "@/components/ui/FloatingFrame";
import { Reveal } from "@/components/ui/Reveal";

interface GalleryItem {
  src: string;
  alt: string;
  /** Intrinsische Maße – damit next/image das echte Format ohne Crop zeigt. */
  w: number;
  h: number;
  title: string;
  note: string;
}

// Echte handgemalte Stücke in ihren echten Proportionen (kein Beschnitt).
// TODO (Founder): nach Belieben ergänzen (Dateien in /public/gallery bzw.
// /public/atelier). Reihenfolge steuert das Masonry-Layout.
const ITEMS: GalleryItem[] = [
  { src: "/atelier/allah-muhammad.jpg", w: 1500, h: 1125, title: "Allah · Muhammad", note: "Alkohol-Tinte in Türkis & Gold", alt: "Kalligrafie „Allah“ und „Muhammad“ in Türkis und Gold" },
  { src: "/gallery/muttertag-herz.jpg", w: 1052, h: 1400, title: "Salwa · Für Mama", note: "Muttertag · Herzform", alt: "Herz-Leinwand mit dem Namen Salwa zum Muttertag" },
  { src: "/atelier/makkah.jpg", w: 1125, h: 1500, title: "Wo immer du bist", note: "Makka-Motiv in warmen Tönen", alt: "Handgemaltes Werk mit Makka-Motiv auf der Staffelei" },
  { src: "/gallery/salwa-quadrat.jpg", w: 1400, h: 1126, title: "Namens-Quadrat", note: "Name in Rosé & Flieder", alt: "Quadratisches Stück mit arabischem Namen in Rosé" },
  { src: "/atelier/mawadda.jpg", w: 1500, h: 1456, title: "Zuneigung & Ruhe", note: "Für das Brautpaar", alt: "Kalligrafie zum Thema Zuneigung, warme Farbwelt" },
  { src: "/gallery/namen-quadrate.jpg", w: 1004, h: 1200, title: "Zwei Namen, ein Paar", note: "Doppel-Leinwand in Petrol", alt: "Zwei Namens-Quadrate in Petrol auf einer Wiese" },
  { src: "/atelier/relief.jpg", w: 1500, h: 1174, title: "Nach jeder Härte", note: "Ruhige Töne, Ton in Ton", alt: "Kalligrafie in ruhigen, beigen Tönen" },
  { src: "/gallery/herz-eid.jpg", w: 675, h: 675, title: "Eid Mubarak", note: "Herz zum Fest", alt: "Herz-Leinwand mit Eid-Kalligrafie" },
  { src: "/gallery/quds-staffelei.jpg", w: 1050, h: 1400, title: "Auf der Staffelei", note: "Auf Wunsch: eigene Motive", alt: "Gemaltes Motiv auf einer Staffelei im Atelier" },
];

export function Gallery() {
  return (
    <section id="galerie" className="scroll-mt-24 py-16 md:py-24">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <SectionHeading
            eyebrow="Galerie"
            title={
              <>
                Echte Stücke,
                <br />
                echte Hände
              </>
            }
          />
          <p className="max-w-[34ch] text-[15px] leading-relaxed text-ink-soft">
            Jedes Werk ist einzigartig entstanden – hier in seinem echten Format.
            Jedes Motiv lässt sich als Auftrag neu anfragen.
          </p>
        </div>

        {/* Masonry: echte Proportionen, kein object-cover-Beschnitt. */}
        <div className="mt-12 gap-5 [column-gap:1.25rem] columns-1 sm:columns-2 lg:columns-3">
          {ITEMS.map((item, i) => (
            <Reveal
              key={item.src}
              scale
              delay={(i % 3) * 0.08}
              className="mb-5 break-inside-avoid"
            >
              <figure className="group">
              <FloatingFrame interactive glare float={false} shadow={false} maxTilt={8}>
                <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-soft transition-shadow duration-500 group-hover:shadow-lift">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.w}
                    height={item.h}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    priority={i < 3}
                  />
                  <figcaption className="flex items-start justify-between gap-3 px-5 pb-5 pt-4">
                    <div>
                      <div className="font-display text-xl leading-tight text-ink">
                        {item.title}
                      </div>
                      <div className="mt-1 text-[13px] text-ink-soft">{item.note}</div>
                    </div>
                    <Link
                      href="/gestalten"
                      className="mt-0.5 whitespace-nowrap text-[13px] font-medium text-rose-deep transition-colors hover:text-rose"
                    >
                      Anfragen →
                    </Link>
                  </figcaption>
                </div>
              </FloatingFrame>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
