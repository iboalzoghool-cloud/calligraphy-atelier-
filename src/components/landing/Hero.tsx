"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HeartFan, bgIdForWorld } from "@/components/landing/HeartFan";
import { useConfigurator } from "@/lib/configurator/context";
import { toArabicName } from "@/lib/configurator/translit";

export function Hero() {
  const router = useRouter();
  const { update } = useConfigurator();
  const [name, setName] = useState("");
  const [active, setActive] = useState("Rosé");
  const [script, setScript] = useState<"ar" | "lat">("ar");

  // Latein → arabische Kalligrafie („Miriam" → „مريم"). Nutzer kann direkt
  // Arabisch tippen (exakt) oder die lateinische Schrift wählen.
  const translit = toArabicName(name);
  const arabicName = translit.arabic ?? (name.trim() || "مريم");
  const latinName = name.trim() || "Miriam";
  const previewName = script === "ar" ? arabicName : latinName;

  function handleContinue() {
    // Name (in gewählter Schrift) + Farbwelt in den Konfigurator tragen.
    update({
      name: script === "ar" ? translit.arabic ?? name.trim() : name.trim(),
      shape: "heart",
      sizeId: "heart-29",
      backgroundId: bgIdForWorld(active),
      fontId: "aref",
    });
    router.push("/gestalten");
  }

  return (
    <section className="bg-paper">
      <div className="container-page grid items-center gap-8 pb-12 pt-8 md:gap-14 md:pb-20 md:pt-14 lg:grid-cols-2">
        {/* ── Herz-Fächer: das Hauptprodukt (mobil zuerst) ──
            Above-the-fold: CSS-Animation statt JS-Reveal, damit der Hero
            sofort malt (LCP) und nicht auf Hydration wartet. */}
        <div className="fade-up order-1 lg:order-2">
          <HeartFan
            active={active}
            onSelect={setActive}
            name={previewName}
            sizeLabel="29 × 29 cm"
            latin={script === "lat"}
          />
        </div>

        {/* ── Der Catch: Farbwelt wählen & Namen tippen ── */}
        <div className="fade-up order-2 lg:order-1">
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
          {/* Markenstory-Anker 2: das Geschenk im ersten Satz */}
          <p className="mt-5 max-w-md text-pretty text-[1.05rem] leading-relaxed text-ink-soft">
            Jedes Original von Hand gemalt – ein Geschenk, das es nur einmal
            gibt. Wähle eine Farbwelt, schreib einen Namen und sieh ihn live
            auf dem Herz erscheinen.
          </p>

          {/* Live-Namensfeld – der interaktive Catch */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleContinue();
            }}
            className="mt-6 max-w-md"
          >
            {/* Schriftwahl: Arabisch (empfohlen) oder Lateinisch */}
            <div className="mb-3 inline-flex rounded-full border border-line-strong bg-surface p-1 text-sm">
              <button
                type="button"
                onClick={() => setScript("ar")}
                aria-pressed={script === "ar"}
                className={`rounded-full px-3.5 py-1.5 transition ${script === "ar" ? "bg-ink text-canvas" : "text-ink-soft hover:text-ink"}`}
              >
                <span className="font-arabic text-base">عربي</span> Arabisch
              </button>
              <button
                type="button"
                onClick={() => setScript("lat")}
                aria-pressed={script === "lat"}
                className={`rounded-full px-3.5 py-1.5 transition ${script === "lat" ? "bg-ink text-canvas" : "text-ink-soft hover:text-ink"}`}
              >
                Latein
              </button>
            </div>

            <div className="relative flex items-center">
              <input
                id="hero-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                dir="auto"
                autoComplete="off"
                aria-label="Dein Name für die Live-Vorschau"
                placeholder={
                  script === "ar" ? "Name – arabisch oder lateinisch…" : "Dein Name…"
                }
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
            {script === "lat" ? (
              <p className="mt-2 pl-1 text-sm text-ink-soft">
                Dein Name in lateinischer Schrift – im Atelier von Hand
                geschrieben. Für arabische Kalligrafie oben auf Arabisch
                umschalten.
              </p>
            ) : translit.source === "typed-arabic" ? (
              <p className="mt-2 flex flex-wrap items-center gap-x-2 pl-1 text-sm text-ink-soft">
                <span dir="rtl" className="font-arabic text-xl leading-none text-ink">
                  {translit.arabic}
                </span>
                <span className="text-ink-faint">· exakt, direkt auf Arabisch ✓</span>
              </p>
            ) : translit.source === "mapped" ? (
              <p className="mt-2 flex flex-wrap items-center gap-x-2 pl-1 text-sm text-ink-soft">
                <span className="text-ink-faint">{name.trim()}</span>
                <span className="text-gold">→</span>
                <span dir="rtl" className="font-arabic text-xl leading-none text-ink">
                  {translit.arabic}
                </span>
                <span className="text-ink-faint">· in arabischer Kalligrafie</span>
              </p>
            ) : translit.source === "translit" ? (
              <p className="mt-2 flex flex-wrap items-center gap-x-2 pl-1 text-sm text-ink-soft">
                <span className="text-ink-faint">{name.trim()}</span>
                <span className="text-gold">→</span>
                <span dir="rtl" className="font-arabic text-xl leading-none text-ink">
                  {translit.arabic}
                </span>
                <span className="text-rose-deep">
                  · ungefähr – tippe direkt auf Arabisch für die exakte Schreibweise
                </span>
              </p>
            ) : (
              <p className="mt-2 pl-1 text-sm text-ink-soft">
                Tipp: Tippe deinen Namen direkt auf Arabisch für die exakte
                Kalligrafie – oder lateinisch, wir schreiben ihn von Hand.
              </p>
            )}
          </form>

          {/* Trust-Claims stehen direkt darunter in der TrustStrip – hier nur
              der Neben-CTA, keine Dopplung. */}
          <div className="mt-6 text-sm">
            <Link
              href="#galerie"
              className="font-medium text-ink underline-offset-4 hover:underline"
            >
              Galerie ansehen →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
