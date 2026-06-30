import Link from "next/link";
import { PreviewCanvas } from "@/components/configurator/PreviewCanvas";
import { Reveal } from "@/components/ui/Reveal";
import { InkStroke } from "@/components/ui/InkStroke";
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
          <p className="eyebrow">Handgemalte Kalligrafie · Unikate</p>
          <h1 className="mt-4 text-balance text-[2.6rem] leading-[1.05] sm:text-5xl md:text-[3.4rem]">
            Dein Name,
            <br />
            in Tinte verewigt.
          </h1>
          <InkStroke
            variant="underline"
            className="mt-4 h-4 w-44"
            color="var(--color-gold)"
            width={2.5}
          />
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

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-faint">
            <span className="inline-flex items-center gap-2">
              <Dot /> 100 % von Hand gemalt
            </span>
            <span className="inline-flex items-center gap-2">
              <Dot /> {PRODUCT.sizeLabel}
            </span>
            <span className="inline-flex items-center gap-2">
              <Dot /> Jedes Stück ein Unikat
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mx-auto w-full max-w-md">
            {/* weicher Lichtschein hinter der Vorschau */}
            <div
              className="absolute inset-0 -z-10 translate-y-6 scale-90 rounded-full bg-rose-soft/70 blur-3xl"
              aria-hidden
            />
            <PreviewCanvas state={HERO_DEMO} interactive={false} />
            <p className="mt-3 text-center text-xs uppercase tracking-[0.18em] text-ink-faint">
              Live-Vorschau im Konfigurator
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Dot() {
  return <span className="h-1.5 w-1.5 rounded-full bg-rose" aria-hidden />;
}
