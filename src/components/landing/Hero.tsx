"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { HeartFan, bgIdForWorld } from "@/components/landing/HeartFan";
import { useConfigurator } from "@/lib/configurator/context";
import { toArabicName } from "@/lib/configurator/translit";

export function Hero() {
  const router = useRouter();
  const { update } = useConfigurator();
  const [name, setName] = useState("");
  const [active, setActive] = useState("Rosé");

  // Latein → arabische Kalligrafie („Miriam" → „مريم"). Leeres Feld zeigt einen
  // schönen arabischen Beispielnamen (Arabisch sofort präsent).
  const translit = toArabicName(name);
  const previewName = translit.arabic ?? (name.trim() || "سلوى");

  function handleContinue() {
    // Name (arabische Form) + gewählte Farbwelt in den Konfigurator tragen.
    update({
      name: translit.arabic ?? name.trim(),
      shape: "heart",
      sizeId: "heart-29",
      backgroundId: bgIdForWorld(active),
      fontId: "arefInk",
    });
    router.push("/gestalten");
  }

  return (
    <section className="bg-paper">
      <div className="container-page grid items-center gap-8 pb-12 pt-8 md:gap-14 md:pb-20 md:pt-14 lg:grid-cols-2">
        {/* ── Herz-Fächer: das Hauptprodukt (mobil zuerst) ── */}
        <Reveal className="order-1 lg:order-2">
          <HeartFan
            active={active}
            onSelect={setActive}
            name={previewName}
            sizeLabel="29 × 29 cm"
          />
        </Reveal>

        {/* ── Der Catch: Farbwelt wählen & Namen tippen ── */}
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
            Von Hand gemalt, kein Druck, keine Kopie. Wähle eine Farbwelt, schreib
            einen Namen – und sieh ihn live auf dem Herz erscheinen.
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
            {translit.source === "mapped" ? (
              <p className="mt-2 flex flex-wrap items-center gap-x-2 pl-1 text-sm text-ink-soft">
                <span className="text-ink-faint">{name.trim()}</span>
                <span className="text-gold">→</span>
                <span dir="rtl" className="font-arabic text-xl leading-none text-ink">
                  {translit.arabic}
                </span>
                <span className="text-ink-faint">· in arabischer Kalligrafie</span>
              </p>
            ) : translit.source === "none" && name.trim() ? (
              <p className="mt-2 pl-1 text-sm text-ink-soft">
                Auf Arabisch eintippen für echte Kalligrafie – oder wir schreiben
                deinen Namen im Atelier von Hand.
              </p>
            ) : (
              <p className="mt-2 pl-1 text-sm text-ink-soft">
                Arabisch oder lateinisch · live auf dem Herz · ab 29 €,
                unverbindlich.
              </p>
            )}
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
