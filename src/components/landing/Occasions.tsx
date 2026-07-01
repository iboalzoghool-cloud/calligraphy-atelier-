import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { InkSplashes } from "@/components/ui/InkSplashes";
import { OCCASIONS } from "@/lib/content";

// Jede Anlass-Karte trägt eine eigene Farbwelt (Rosé · Teal · Gold · Terra) –
// als Textakzent UND als entsättigte Pastell-Fläche (Farb-Bindung).
const ACCENTS = [
  { text: "text-rose-deep", hex: "#b25e77" },
  { text: "text-teal", hex: "#3f6b6e" },
  { text: "text-gold", hex: "#a9823b" },
  { text: "text-terra", hex: "#b67a56" },
] as const;

export function Occasions() {
  return (
    <section id="anlaesse" className="relative scroll-mt-24 overflow-hidden py-16 md:py-24">
      <InkSplashes />
      <div className="container-page">
        <SectionHeading
          eyebrow="Anlässe"
          title="Für die Momente, die zählen"
          intro="Ob Fest, Familie oder großer Tag – ein Name in Tinte sagt mehr als ein gekauftes Geschenk."
          stroke
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {OCCASIONS.map((o, i) => {
            const a = ACCENTS[i % ACCENTS.length];
            return (
            <Reveal key={o.title} delay={i * 0.06}>
              <Link
                href="/gestalten"
                className="group flex h-full flex-col justify-between rounded-2xl border p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lift"
                style={{
                  background: `linear-gradient(180deg, color-mix(in srgb, ${a.hex} 12%, #fbf7ee), #fbf7ee)`,
                  borderColor: `color-mix(in srgb, ${a.hex} 22%, var(--color-line))`,
                }}
              >
                <div>
                  <div
                    className={`font-arabic text-2xl leading-none ${a.text}`}
                    dir="rtl"
                    lang="ar"
                  >
                    {o.ar}
                  </div>
                  <h3 className="mt-4 font-display text-xl">{o.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {o.text}
                  </p>
                </div>
                <span className={`mt-6 inline-flex items-center gap-1.5 text-sm font-medium ${a.text}`}>
                  Gestalten
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
