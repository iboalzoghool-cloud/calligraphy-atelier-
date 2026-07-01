import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { InkStroke } from "@/components/ui/InkStroke";
import { WritingWord } from "@/components/ui/WritingWord";
import { BRAND } from "@/lib/content";

export const metadata: Metadata = {
  title: "Atelier",
  description:
    "Das Atelier hinter den Werken: Alkohol-Tinte und arabische Kalligrafie – Namen, Verse und Liebesbotschaften, von Hand gemalt.",
};

interface Work {
  src: string;
  w: number;
  h: number;
  title: string;
  note: string;
  /** Signaturfarbe des Werks – blutet als Pastell in die Karte. */
  accent: string;
}

// Echte Werke des Künstlers (Instagram). TODO (Founder): nach Belieben tauschen.
const WORKS: Work[] = [
  { src: "/atelier/allah-muhammad.jpg", w: 1500, h: 1125, accent: "#2f8f96", title: "Allah · Muhammad", note: "Alkohol-Tinte in Türkis & Gold" },
  { src: "/atelier/mawadda.jpg", w: 1500, h: 1456, accent: "#8a5f77", title: "Liebe & Barmherzigkeit", note: "Quran 30:21 · für das Brautpaar" },
  { src: "/atelier/makkah.jpg", w: 1125, h: 1500, accent: "#b0863f", title: "Wo immer du bist", note: "Quran 57:4 · Makka-Szene" },
  { src: "/atelier/relief.jpg", w: 1500, h: 1174, accent: "#a9744f", title: "Nach jeder Härte – Erleichterung", note: "Quran 94 · Thuluth" },
  { src: "/atelier/blue-easel.jpg", w: 1500, h: 1109, accent: "#3f6b7f", title: "Gedenke", note: "Kalligrafie in Weiß auf Tinte" },
];

const STYLE_POINTS = [
  { t: "Alkohol-Tinte & Aquarell", d: "Weiche Farbwolken in Pastell – Rosé, Türkis, Gold –, die ineinanderfließen wie Wasser." },
  { t: "Arabische Kalligrafie", d: "Namen, Verse und Segenswünsche in Ruqʿah, Naskh und Thuluth – jeder Strich von Hand gesetzt." },
  { t: "Liebe & Namen als Thema", d: "Für Mutter, Partner, Kind oder den Glauben – Kunst als Widmung, nicht als Dekoration." },
];

export default function AtelierPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-paper">
        <div className="container-page py-16 text-center md:py-24">
          <p className="eyebrow">Das Atelier</p>
          <h1 className="mx-auto mt-4 max-w-3xl text-balance text-4xl leading-[1.05] md:text-6xl">
            Tinte, Geduld & ein Name
          </h1>
          <div className="mx-auto mt-7 text-4xl text-ink sm:text-5xl">
            <WritingWord />
          </div>
          <p className="mx-auto mt-7 max-w-xl text-pretty text-lg leading-relaxed text-ink-soft">
            Hier entstehen handgemalte Werke aus Alkohol-Tinte und arabischer
            Kalligrafie – weiche Farbwelten, getragen von Versen, Namen und
            Liebesbotschaften.
          </p>
          <InkStroke
            variant="flourish"
            className="mx-auto mt-8 h-8 w-52"
            color="var(--color-gold)"
            width={2.5}
          />
        </div>
      </section>

      {/* Der Stil */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow eyebrow-rule">Der Stil</p>
            <h2 className="mt-3 max-w-2xl text-balance text-3xl leading-tight md:text-[2.4rem]">
              Wo Wasserfarbe auf Schrift trifft
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3">
            {STYLE_POINTS.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.08} className="bg-surface">
                <div className="flex h-full flex-col p-7">
                  <InkStroke variant="underline" className="h-3 w-12" color="var(--color-rose)" width={2.5} />
                  <h3 className="mt-4 text-xl">{p.t}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="border-y border-line bg-surface py-16 md:py-24">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow eyebrow-rule">Werke</p>
            <h2 className="mt-3 text-balance text-3xl leading-tight md:text-[2.4rem]">
              Aus dem Atelier
            </h2>
            <p className="mt-3 max-w-xl text-pretty text-ink-soft">
              Eine Auswahl gemalter Originale. Du wünschst dir etwas Ähnliches?
              Jedes Motiv lässt sich als Auftrag anfragen.
            </p>
          </Reveal>
        </div>

        {/* Wischbare Slideshow – jedes Werk gerahmt auf dem Pastell-Feld seiner Farbe */}
        <Reveal>
          <div className="no-scrollbar mt-10 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 md:gap-6 md:px-[max(2rem,calc((100vw-78rem)/2+2rem))]">
            {WORKS.map((work) => (
              <figure
                key={work.src}
                className="group w-[80vw] max-w-[19rem] shrink-0 snap-center sm:w-72"
              >
                <div
                  className="rounded-[1.4rem] border p-3 shadow-soft transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-lift"
                  style={{
                    background: `linear-gradient(160deg, color-mix(in srgb, ${work.accent} 26%, #fbf7ee), color-mix(in srgb, ${work.accent} 9%, #fbf7ee))`,
                    borderColor: `color-mix(in srgb, ${work.accent} 30%, var(--color-line))`,
                  }}
                >
                  <div className="overflow-hidden rounded-lg bg-canvas shadow-[inset_0_1px_2px_rgba(45,22,30,0.14)]">
                    <Image
                      src={work.src}
                      alt={work.title}
                      width={work.w}
                      height={work.h}
                      sizes="(max-width: 640px) 80vw, 19rem"
                      className="h-auto w-full"
                    />
                  </div>
                  <figcaption className="flex items-center justify-between gap-3 px-1.5 pb-1 pt-3">
                    <span className="min-w-0">
                      <span className="block truncate font-display text-lg text-ink">
                        {work.title}
                      </span>
                      <span className="block truncate text-xs text-ink-faint">
                        {work.note}
                      </span>
                    </span>
                    <Link
                      href="/gestalten"
                      className="shrink-0 text-xs font-medium underline-offset-4 hover:underline"
                      style={{ color: work.accent }}
                    >
                      Anfragen →
                    </Link>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Die Geschichte */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-[46rem]">
            <Reveal>
              <p className="eyebrow eyebrow-rule">Die Geschichte</p>
              <h2 className="mt-3 text-balance text-3xl leading-tight md:text-[2.4rem]">
                Der Mensch hinter der Tinte
              </h2>
              <p className="mt-2 text-sm text-ink-faint">
                {/* PLATZHALTER: Dies ist ein Entwurf – bitte an deine echte Geschichte anpassen. */}
                Entwurf · bitte anpassen
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-6 space-y-4 text-pretty text-[1.05rem] leading-relaxed text-ink-soft">
                <p>
                  Hinter {BRAND.name} steht ein junger muslimischer Künstler,
                  Anfang zwanzig, der schon als Kind zum Stift griff – erst
                  Skizzen, dann Farbe, irgendwann die arabische Schrift, die ihn
                  nie wieder losließ.
                </p>
                <p>
                  Seit einigen Jahren widmet er sich der Kalligrafie: dem
                  langsamen, ruhigen Setzen jedes Strichs, dem Fließen der Tinte,
                  der Schönheit eines einzelnen Namens. Neben dem Studium wird das
                  Atelier zum Rückzugsort – ein Ort, an dem aus Buchstaben Liebe
                  wird.
                </p>
                <p>
                  Seine Werke erzählen von Glauben, Familie und Zuneigung: ein
                  Vers für das Brautpaar, der Name einer Mutter, ein Segenswunsch
                  zum Fest. Jedes Stück entsteht von Hand, mit Hingabe und der
                  Überzeugung, dass etwas Selbstgemaltes mehr sagt als alles
                  Gekaufte.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 md:pb-28">
        <div className="container-page">
          <div className="rounded-[2rem] border border-line bg-surface px-6 py-14 text-center md:py-16">
            <h2 className="mx-auto max-w-xl text-balance text-3xl md:text-4xl">
              Lass deinen Namen malen.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-pretty text-ink-soft">
              Gestalte in wenigen Schritten dein eigenes Unikat – mit Live-Vorschau.
            </p>
            <Link href="/gestalten" className="btn btn-primary mt-8">
              Jetzt gestalten
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
