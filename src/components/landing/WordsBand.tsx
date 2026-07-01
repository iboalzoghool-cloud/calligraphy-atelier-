import { WritingWord } from "@/components/ui/WritingWord";
import { InkStroke } from "@/components/ui/InkStroke";
import { Reveal } from "@/components/ui/Reveal";

export function WordsBand() {
  return (
    <section className="overflow-hidden bg-canvas py-20 md:py-28">
      <div className="container-page text-center">
        <Reveal>
          <div
            className="font-arabic text-6xl leading-none text-gold/35 sm:text-7xl md:text-8xl"
            dir="rtl"
            lang="ar"
            aria-hidden
          >
            مَوَدَّة
          </div>
          <p className="eyebrow mt-6 justify-center">In jeder Sprache</p>
          <div className="mt-6 text-5xl text-ink sm:text-6xl md:text-7xl">
            <WritingWord />
          </div>
          <p className="mx-auto mt-8 max-w-md text-pretty leading-relaxed text-ink-soft">
            Ein Name, ein Wort, ein Segen – von Hand geschrieben. Kalligrafie ist
            die Sprache der Zuneigung, auf Arabisch wie in deiner.
          </p>
          <InkStroke
            variant="flourish"
            className="mx-auto mt-8 h-7 w-44"
            color="var(--color-gold)"
            width={2.5}
          />
        </Reveal>
      </div>
    </section>
  );
}
