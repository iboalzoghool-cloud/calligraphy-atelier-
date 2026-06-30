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
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08} className="bg-surface">
              <div className="flex h-full flex-col p-7 md:p-8">
                <span className="font-display text-3xl text-rose">{s.n}</span>
                <h3 className="mt-4 text-xl">{s.title}</h3>
                <p className="mt-2 text-pretty leading-relaxed text-ink-soft">
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
