import Link from "next/link";
import { PreviewCanvas } from "@/components/configurator/PreviewCanvas";
import { Reveal } from "@/components/ui/Reveal";
import type { ConfiguratorState } from "@/lib/configurator/types";
import { PRODUCT } from "@/lib/content";

// Demo-Konfiguration für den Hero (sanft drehende Live-Vorschau).
const HERO_DEMO: ConfiguratorState = {
  shape: "heart",
  sizeId: "heart-29",
  backgroundId: "magenta-gold",
  name: "سلوى",
  fontId: "arefInk",
  sayingId: "eid",
  sayingPosition: "bottom",
  gold: true,
  addons: { gift: false, card: false, express: false, date: false },
};

export function Hero() {
  return (
    <section className="bg-paper">
      <div className="container-page grid items-center gap-10 pb-12 pt-10 md:gap-14 md:pb-20 md:pt-16 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow eyebrow-rule">Handgemalte Kalligrafie · Unikate</p>
          <h1 className="mt-5 text-balance text-[2.6rem] leading-[1.02] sm:text-5xl md:text-[3.4rem]">
            Dein Name,
            <br />
            <span className="italic">in Tinte</span>{" "}
            <span className="relative inline-block">
              verewigt.
              <svg
                viewBox="0 0 300 26"
                aria-hidden
                className="absolute -bottom-3 left-0 h-auto w-[104%]"
                preserveAspectRatio="none"
              >
                <path
                  d="M4 16 C 66 5, 118 23, 176 13 S 262 5, 296 15"
                  fill="none"
                  stroke="var(--color-gold)"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  className="swash-draw"
                />
              </svg>
            </span>
          </h1>
          <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-ink-soft">
            Jedes Stück wird von Hand gemalt – kein Druck, keine Kopie. Gestalte
            Form, Farbwelt und Schrift in der Live-Vorschau und halte ein
            echtes Unikat in den Händen.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/gestalten" className="btn btn-primary">
              Jetzt gestalten
            </Link>
            <Link href="#galerie" className="btn btn-secondary">
              Galerie ansehen
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-soft">
            <span className="inline-flex items-center gap-2">
              <Dot className="bg-rose" /> 100 % von Hand gemalt
            </span>
            <span className="inline-flex items-center gap-2">
              <Dot className="bg-teal" /> {PRODUCT.sizeLabel}
            </span>
            <span className="inline-flex items-center gap-2">
              <Dot className="bg-gold" /> Jedes Stück ein Unikat
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mx-auto w-full max-w-md">
            <div className="relative">
              {/* Spotlight + driftender Rosé-Gold-Schein – das Werk „ausgestellt" */}
              <div
                className="animate-drift pointer-events-none absolute inset-0 -z-10 scale-125"
                aria-hidden
                style={{
                  background:
                    "radial-gradient(circle at 50% 42%, rgba(255,251,244,0.85), rgba(178,94,119,0.16) 46%, rgba(169,130,59,0.10) 62%, transparent 74%)",
                  filter: "blur(10px)",
                }}
              />
              {/* Das Herz als schwebendes, drehbares Ausstellungsstück */}
              <PreviewCanvas
                state={HERO_DEMO}
                interactive
                shadow={false}
                className="relative z-10"
              />
              {/* Atmender Boden-Schatten (schwebt mit) */}
              <div
                className="animate-breathe pointer-events-none absolute bottom-1 left-1/2 z-0 h-6 w-3/5 -translate-x-1/2 rounded-[50%]"
                aria-hidden
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(45,22,30,0.5), rgba(45,22,30,0) 70%)",
                  filter: "blur(10px)",
                }}
              />
            </div>
            <p className="mt-8 text-center text-xs uppercase tracking-[0.2em] text-ink-faint">
              Ein echtes Unikat · von Hand gemalt
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Dot({ className = "bg-rose" }: { className?: string }) {
  return <span className={`h-1.5 w-1.5 rounded-full ${className}`} aria-hidden />;
}
