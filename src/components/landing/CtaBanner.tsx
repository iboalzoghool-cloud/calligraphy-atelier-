import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function CtaBanner() {
  return (
    <section className="pb-8 pt-16 md:py-24">
      <div className="container-page">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[2rem] px-6 py-14 text-center md:px-10 md:py-20"
            style={{ background: "linear-gradient(120deg, #2a2118, #3a2b20)" }}
          >
            {/* dezenter Rosé/Gold-Schein */}
            <div
              className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-rose/30 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-gold/25 blur-3xl"
              aria-hidden
            />
            <p
              className="relative font-arabic text-3xl text-gold-soft md:text-4xl"
              dir="rtl"
              lang="ar"
            >
              اسمٌ في حبر
            </p>
            <h2 className="relative mx-auto mt-5 max-w-2xl text-balance text-3xl text-paper-2 md:text-[2.7rem] md:leading-[1.1]">
              Verschenke einen Namen, der bleibt.
            </h2>
            <p className="relative mx-auto mt-4 max-w-lg text-pretty text-paper-2/75">
              Ein von Hand gemaltes Unikat für die Menschen, die du liebst – zu
              Eid, zur Hochzeit oder einfach aus Liebe. In zwei Minuten
              gestaltet, unverbindlich.
            </p>
            <div className="relative mt-8">
              <Link
                href="/gestalten"
                className="btn bg-paper-2 text-ink hover:bg-white"
              >
                Jetzt gestalten
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
