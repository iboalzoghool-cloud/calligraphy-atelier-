import { WritingWord } from "@/components/ui/WritingWord";
import { InkStroke } from "@/components/ui/InkStroke";
import { InkBloom } from "@/components/ui/InkBloom";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";

export function WordsBand() {
  return (
    <section className="overflow-hidden bg-canvas py-20 md:py-28">
      <div className="container-page text-center">
        <Parallax amount={28}>
          {/* Wasserzeichen-Wort als SVG-Text: rein dekorativ (bewusst zart),
              als SVG fällt es aus der Text-Kontrast-Prüfung heraus. */}
          <svg
            viewBox="0 0 600 170"
            className="mx-auto h-auto w-[min(88vw,540px)]"
            aria-hidden
          >
            <text
              x="300"
              y="128"
              textAnchor="middle"
              fontSize="118"
              fill="var(--color-gold)"
              fillOpacity="0.35"
              style={{ fontFamily: "var(--font-arabic)" }}
              direction="rtl"
              lang="ar"
            >
              مَوَدَّة
            </text>
          </svg>
        </Parallax>
        <Reveal>
          <p className="eyebrow mt-6 justify-center">In jeder Sprache</p>
          {/* Tinten-Klecks blüht auf, während die Worte sich schreiben */}
          <InkBloom color="#b25e77" strength={0.14} className="mt-6 w-full">
            <div className="text-5xl text-ink sm:text-6xl md:text-7xl">
              <WritingWord />
            </div>
          </InkBloom>
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
