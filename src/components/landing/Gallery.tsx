import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

interface GalleryItem {
  src: string;
  alt: string;
  /** Intrinsische Maße – damit next/image das echte Format ohne Crop zeigt. */
  w: number;
  h: number;
  title: string;
  note: string;
  /** Signaturfarbe des Werks (aus dem Bild gezogen) – Charakter in der UI. */
  accent: string;
  /** Optional: erkannter Koranvers, sichtbar im Werk eingebettet. */
  verse?: string;
  verseRef?: string;
}

// Echte handgemalte Stücke in ihren echten Proportionen (kein Beschnitt).
// `accent` = aus dem jeweiligen Werk gezogene Signaturfarbe (künstlerisch
// kuratiert, wo der Foto-Hintergrund dominierte).
const ITEMS: GalleryItem[] = [
  { src: "/atelier/allah-muhammad.jpg", w: 1500, h: 1125, accent: "#2f8f96", title: "Allah · Muhammad", note: "Alkohol-Tinte in Türkis & Gold", alt: "Kalligrafie „Allah“ und „Muhammad“ in Türkis und Gold" },
  { src: "/gallery/muttertag-herz.jpg", w: 1052, h: 1400, accent: "#c85f86", title: "Salwa · Für Mama", note: "Muttertag · Herzform", alt: "Herz-Leinwand mit dem Namen Salwa zum Muttertag" },
  { src: "/atelier/makkah.jpg", w: 1125, h: 1500, accent: "#b0863f", title: "Wo immer du bist", note: "Makka-Motiv in warmen Tönen", alt: "Handgemaltes Werk mit Makka-Motiv auf der Staffelei" },
  { src: "/gallery/salwa-quadrat.jpg", w: 1400, h: 1126, accent: "#cf5f97", title: "Namens-Quadrat", note: "Name in Rosé & Flieder", alt: "Quadratisches Stück mit arabischem Namen in Rosé" },
  { src: "/atelier/mawadda.jpg", w: 1500, h: 1456, accent: "#8a5f77", title: "Zuneigung & Ruhe", note: "Für das Brautpaar", alt: "Kalligrafie zum Thema Zuneigung, warme Farbwelt" },
  { src: "/gallery/namen-quadrate.jpg", w: 1004, h: 1200, accent: "#3f7d7f", title: "Zwei Namen, ein Paar", note: "Doppel-Leinwand in Petrol", alt: "Zwei Namens-Quadrate in Petrol auf einer Wiese" },
  { src: "/atelier/relief.jpg", w: 1500, h: 1174, accent: "#a9744f", title: "Nach jeder Härte", note: "Ton in Ton", verse: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", verseRef: "Quran 94:5", alt: "Kalligrafie des Koranverses 94:5 in ruhigen, beigen Tönen" },
  { src: "/gallery/herz-eid.jpg", w: 675, h: 675, accent: "#cf8a63", title: "Eid Mubarak", note: "Herz zum Fest", alt: "Herz-Leinwand mit Eid-Kalligrafie" },
  { src: "/gallery/quds-staffelei.jpg", w: 1050, h: 1400, accent: "#a9823b", title: "Auf der Staffelei", note: "Auf Wunsch: eigene Motive", alt: "Gemaltes Motiv auf einer Staffelei im Atelier" },
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
            Wisch dich durch die Sammlung – jedes Werk in seinem echten Format,
            in seiner eigenen Farbwelt. Jedes Motiv lässt sich neu anfragen.
          </p>
        </div>
      </div>

      {/* Wischbare Slideshow – jedes Werk „gerahmt" auf dem Pastell-Feld seiner Farbe */}
      <Reveal>
        <div className="no-scrollbar mt-10 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 md:mt-12 md:gap-6 md:px-[max(2rem,calc((100vw-78rem)/2+2rem))]">
          {ITEMS.map((item, i) => (
            <figure
              key={item.src}
              className="group w-[80vw] max-w-[19rem] shrink-0 snap-center sm:w-72"
            >
              <div
                className="rounded-[1.4rem] border p-3 shadow-soft transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-lift"
                style={{
                  // Werkfarbe als Pastell-Feld RUND UM das Bild (nicht nur unter der Karte).
                  background: `linear-gradient(160deg, color-mix(in srgb, ${item.accent} 26%, #fbf7ee), color-mix(in srgb, ${item.accent} 9%, #fbf7ee))`,
                  borderColor: `color-mix(in srgb, ${item.accent} 30%, var(--color-line))`,
                }}
              >
                {/* Werk – unbeschnitten, sitzt wie gerahmt auf dem Farbfeld */}
                <div className="overflow-hidden rounded-lg bg-canvas shadow-[inset_0_1px_2px_rgba(45,22,30,0.14)]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.w}
                    height={item.h}
                    sizes="(max-width: 640px) 80vw, 19rem"
                    className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    priority={i < 2}
                  />
                </div>
                <figcaption className="px-1.5 pb-1 pt-3">
                  {item.verse ? (
                    <div
                      className="mb-1.5 font-arabic text-lg leading-snug text-ink"
                      dir="rtl"
                      lang="ar"
                    >
                      {item.verse}
                    </div>
                  ) : null}
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: item.accent }}
                          aria-hidden
                        />
                        <span className="truncate font-display text-lg text-ink">
                          {item.title}
                        </span>
                      </div>
                      <div className="mt-0.5 truncate text-[13px] text-ink-soft">
                        {item.note}
                        {item.verseRef ? ` · ${item.verseRef}` : ""}
                      </div>
                    </div>
                    <Link
                      href="/gestalten"
                      className="mt-0.5 shrink-0 whitespace-nowrap text-[13px] font-medium transition-opacity hover:opacity-70"
                      style={{ color: item.accent }}
                    >
                      Anfragen →
                    </Link>
                  </div>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
