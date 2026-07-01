import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PROCESSING_TIME } from "@/lib/content";

const STEPS = [
  {
    n: "01",
    title: "Gestalten",
    text: "Form, Farbwelt, Name, Schrift und optional ein Spruch – alles in der Live-Vorschau.",
  },
  {
    n: "02",
    title: "Anfrage senden",
    text: "Du schickst deinen Entwurf unverbindlich. Wir bestätigen Verfügbarkeit, Preis und Versand persönlich.",
  },
  {
    n: "03",
    title: "Handgemalt erhalten",
    text: `Dein Unikat wird in ca. ${PROCESSING_TIME} Tagen von Hand gemalt und sorgfältig verpackt geliefert.`,
  },
];

export function HowItWorks() {
  return (
    <section id="ablauf" className="scroll-mt-24 border-y border-line bg-surface py-16 md:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="So funktioniert's"
          title="In drei Schritten zum Unikat"
          center
          stroke
        />
        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.09}>
              <div className="flex h-full flex-col">
                <span className="font-display text-[2.75rem] leading-none text-gold">
                  {s.n}
                </span>
                <span className="my-5 block h-px w-full bg-line" aria-hidden />
                <h3 className="font-display text-2xl font-medium">{s.title}</h3>
                <p className="mt-2.5 text-pretty leading-relaxed text-ink-soft">
                  {s.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
