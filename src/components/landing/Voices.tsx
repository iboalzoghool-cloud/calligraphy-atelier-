import { Reveal } from "@/components/ui/Reveal";
import { InkSplashes } from "@/components/ui/InkSplashes";
import { BRAND } from "@/lib/content";

// Wärmere Kleckser für die dunkle Sektion (höhere Deckkraft, damit sie tragen).
const DARK_SPLASH = [
  "rgba(198,162,90,0.16)", // Gold-soft
  "rgba(178,94,119,0.15)", // Rosé
  "rgba(93,63,87,0.16)", // Plum
  "rgba(63,107,110,0.13)", // Petrol
];

/*
  TODO (Founder): Sobald echte Bestellungen da sind, hier echte
  Kundenstimmen eintragen (Name + Anlass). Bis dahin bewusst als
  Platzhalter markiert – keine erfundenen Reviews.
*/
const TESTIMONIALS: { quote: string; author: string }[] = [
  // { quote: "…", author: "… · Anlass" },
];

export function Voices() {
  const hasReal = TESTIMONIALS.length > 0;

  return (
    <section className="relative overflow-hidden bg-ink py-20 text-paper-2 md:py-28">
      <InkSplashes colors={DARK_SPLASH} />
      <div className="container-page">
        {/* Ehrliches Marken-Versprechen (eigene Stimme, kein Fake-Review). */}
        <Reveal>
          <figure className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-soft">
              Unser Versprechen
            </p>
            <span
              className="mt-6 block font-display text-5xl leading-[0.5] text-gold-soft"
              aria-hidden
            >
              &ldquo;
            </span>
            <blockquote className="mt-2 text-balance font-display text-2xl italic leading-snug text-paper-2 md:text-[2.15rem] md:leading-[1.3]">
              Ich male jedes Stück selbst – langsam, mit echter Tinte und voller
              Aufmerksamkeit für deinen Namen. Kein Druck, keine Maschine.
            </blockquote>
            <figcaption className="mt-6 text-sm tracking-wide text-paper-2/70">
              Ibrahim · das Atelier hinter {BRAND.name}
            </figcaption>
          </figure>
        </Reveal>

        {hasReal ? (
          <div className="mx-auto mt-16 grid max-w-5xl gap-x-10 gap-y-12 sm:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.author} delay={i * 0.09}>
                <blockquote className="text-center sm:text-left">
                  <span
                    className="font-display text-4xl leading-[0.4] text-gold-soft"
                    aria-hidden
                  >
                    &ldquo;
                  </span>
                  <p className="mt-2 font-display text-xl italic leading-relaxed text-paper-2">
                    {t.quote}
                  </p>
                  <footer className="mt-4 text-sm tracking-wide text-paper-2/55">
                    — {t.author}
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        ) : (
          /* Ehrliche Fakten statt Fake-Reviews oder „folgt in Kürze“-Schild. */
          <div className="mx-auto mt-14 flex max-w-3xl flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center">
            {[
              "Seit dem 16. Lebensjahr an der Feder",
              "Jedes Stück einzeln von Hand gemalt",
              `Atelier in ${BRAND.city}`,
            ].map((fact) => (
              <span
                key={fact}
                className="inline-flex items-center gap-2.5 text-sm tracking-wide text-paper-2/80"
              >
                <span className="h-1 w-1 rounded-full bg-gold-soft" aria-hidden />
                {fact}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
