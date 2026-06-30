import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { OCCASIONS } from "@/lib/content";

export function Occasions() {
  return (
    <section id="anlaesse" className="scroll-mt-24 py-16 md:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Anlässe"
          title="Für die Momente, die zählen"
          intro="Ob Fest, Familie oder großer Tag – ein Name in Tinte sagt mehr als ein gekauftes Geschenk."
          stroke
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {OCCASIONS.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.06}>
              <Link
                href="/gestalten"
                className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-surface p-6 transition hover:border-line-strong hover:shadow-soft"
              >
                <div>
                  <h3 className="text-xl">{o.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {o.text}
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-rose-deep">
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
          ))}
        </div>
      </div>
    </section>
  );
}
