"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PreviewCanvas } from "@/components/configurator/PreviewCanvas";
import { Reveal } from "@/components/ui/Reveal";
import { useConfigurator } from "@/lib/configurator/context";
import type { ConfiguratorState } from "@/lib/configurator/types";

// Schöner Ausgangs-Look für die Live-Vorschau (Name wird interaktiv gesetzt).
const HERO_LOOK: Omit<ConfiguratorState, "name"> = {
  shape: "heart",
  sizeId: "heart-29",
  backgroundId: "magenta-gold",
  fontId: "arefInk",
  sayingId: "eid",
  sayingPosition: "bottom",
  gold: true,
  addons: { gift: false, card: false, express: false, date: false },
};

export function Hero() {
  const router = useRouter();
  const { update } = useConfigurator();
  const [name, setName] = useState("");

  // Leeres Feld → ein schöner arabischer Beispielname (Arabisch sofort präsent).
  const displayName = name.trim() || "سلوى";
  const previewState: ConfiguratorState = { ...HERO_LOOK, name: displayName };

  function handleContinue() {
    // Namen (und den schönen Herz-Look) in den Konfigurator tragen.
    update({
      name: name.trim(),
      shape: "heart",
      sizeId: "heart-29",
      backgroundId: "magenta-gold",
      fontId: "arefInk",
    });
    router.push("/gestalten");
  }

  return (
    <section className="bg-paper">
      <div className="container-page grid items-center gap-8 pb-12 pt-8 md:gap-14 md:pb-20 md:pt-14 lg:grid-cols-2">
        {/* ── Das Herz als lebendiges Ausstellungsstück (mobil zuerst) ── */}
        <Reveal className="order-1 lg:order-2">
          <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-sm lg:max-w-md">
            <div className="relative">
              {/* Spotlight + driftender Rosé-Gold-Schein */}
              <div
                className="animate-drift pointer-events-none absolute inset-0 -z-10 scale-125"
                aria-hidden
                style={{
                  background:
                    "radial-gradient(circle at 50% 42%, rgba(255,251,244,0.85), rgba(178,94,119,0.16) 46%, rgba(169,130,59,0.10) 62%, transparent 74%)",
                  filter: "blur(10px)",
                }}
              />
              {/* Live-Herz – aktualisiert sich beim Tippen */}
              <PreviewCanvas
                state={previewState}
                interactive
                shadow={false}
                className="relative z-10"
              />
              {/* Atmender Boden-Schatten */}
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
            <p className="mt-6 text-center text-xs uppercase tracking-[0.2em] text-ink-faint">
              Live-Vorschau · von Hand gemalt
            </p>
          </div>
        </Reveal>

        {/* ── Der Catch: tippe deinen Namen ── */}
        <Reveal className="order-2 lg:order-1">
          <p className="eyebrow eyebrow-rule">Handgemalte Kalligrafie · Unikate</p>
          <h1 className="mt-4 text-balance text-[2.5rem] leading-[1.02] sm:text-5xl md:text-[3.3rem]">
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
          <p className="mt-5 max-w-md text-pretty text-[1.05rem] leading-relaxed text-ink-soft">
            Von Hand gemalt, kein Druck, keine Kopie. Schreib einen Namen und
            sieh ihn live in Tinte entstehen.
          </p>

          {/* Live-Namensfeld – der interaktive Catch */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleContinue();
            }}
            className="mt-6 max-w-md"
          >
            <div className="relative flex items-center">
              <input
                id="hero-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                dir="auto"
                autoComplete="off"
                aria-label="Dein Name für die Live-Vorschau"
                placeholder="Schreib deinen Namen…"
                className="w-full rounded-full border border-line-strong bg-surface py-3.5 pl-5 pr-16 text-base text-ink shadow-soft outline-none transition placeholder:text-ink-faint focus:border-ink"
              />
              <button
                type="submit"
                aria-label="Weiter gestalten"
                className="absolute right-1.5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink text-canvas transition hover:bg-black active:translate-y-px"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <p className="mt-2 pl-1 text-sm text-ink-soft">
              Arabisch oder lateinisch · live in der Vorschau · ab 29 €,
              unverbindlich.
            </p>
          </form>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-soft">
            <Link
              href="#galerie"
              className="font-medium text-ink underline-offset-4 hover:underline"
            >
              Galerie ansehen →
            </Link>
            <span className="inline-flex items-center gap-2">
              <Dot className="bg-rose" /> 100 % von Hand gemalt
            </span>
            <span className="inline-flex items-center gap-2">
              <Dot className="bg-teal" /> Jedes Stück ein Unikat
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Dot({ className = "bg-rose" }: { className?: string }) {
  return <span className={`h-1.5 w-1.5 rounded-full ${className}`} aria-hidden />;
}
