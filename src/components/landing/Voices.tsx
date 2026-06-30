import { Reveal } from "@/components/ui/Reveal";
import { BRAND } from "@/lib/content";

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
    <section className="border-y border-line bg-surface py-16 md:py-24">
      <div className="container-page">
        {/* Ehrliches Marken-Versprechen (eigene Stimme, kein Fake-Review). */}
        <Reveal>
          <figure className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Unser Versprechen</p>
            <blockquote className="mt-5 text-balance font-display text-2xl leading-snug text-ink md:text-[2.1rem] md:leading-[1.25]">
              „Ich male jedes Stück selbst – langsam, mit echter Tinte und voller
              Aufmerksamkeit für deinen Namen. Kein Druck, keine Maschine.“
            </blockquote>
            <figcaption className="mt-5 text-sm text-ink-faint">
              {/* PLATZHALTER: Name der Künstlerin / des Künstlers */}
              Das Atelier hinter {BRAND.name}
            </figcaption>
          </figure>
        </Reveal>

        <div className="mx-auto mt-14 max-w-4xl">
          <p className="mb-5 text-center text-xs uppercase tracking-[0.18em] text-ink-faint">
            {hasReal ? "Was Kund:innen sagen" : "Kundenstimmen folgen in Kürze"}
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {hasReal
              ? TESTIMONIALS.map((t) => (
                  <figure key={t.author} className="rounded-2xl border border-line bg-canvas p-6">
                    <blockquote className="text-sm leading-relaxed text-ink">
                      „{t.quote}“
                    </blockquote>
                    <figcaption className="mt-4 text-xs text-ink-faint">
                      {t.author}
                    </figcaption>
                  </figure>
                ))
              : [0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="relative rounded-2xl border border-dashed border-line-strong bg-canvas/50 p-6"
                  >
                    <span className="absolute right-4 top-4 rounded-full bg-line px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-faint">
                      Platzhalter
                    </span>
                    <span className="font-display text-4xl leading-none text-line-strong" aria-hidden>
                      „
                    </span>
                    <p className="mt-1 text-sm leading-relaxed text-ink-faint">
                      Hier erscheint bald eine echte Stimme einer Kundin oder
                      eines Kunden.
                    </p>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
