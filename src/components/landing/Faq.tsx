import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQ } from "@/lib/content";

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 py-16 md:py-24">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            eyebrow="Häufige Fragen"
            title="Was du wissen solltest"
            intro="Transparenz gehört zu Handgemachtem. Fehlt etwas? Schreib uns einfach."
          />

          <div className="lg:pt-2">
            {FAQ.map((item) => (
              <details key={item.q} className="faq-item group py-1">
                <summary className="flex items-center justify-between gap-4 py-5 text-left">
                  <span className="text-[1.05rem] font-medium text-ink">
                    {item.q}
                  </span>
                  <svg
                    className="faq-chevron shrink-0 text-ink-faint"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p className="faq-answer pb-5 pr-8 text-pretty leading-relaxed text-ink-soft">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
