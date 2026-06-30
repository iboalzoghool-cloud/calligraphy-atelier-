import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { InkStroke } from "@/components/ui/InkStroke";
import { WritingWord } from "@/components/ui/WritingWord";
import { PH } from "@/components/legal/LegalShell";

export const metadata: Metadata = {
  title: "Atelier",
  description:
    "Die Geschichte hinter den handgemalten Unikaten – über Kalligrafie, Handarbeit und die Bedeutung eines Namens.",
};

interface BlockProps {
  index: number;
  eyebrow: string;
  title: string;
  image: string;
  alt: string;
  children: ReactNode;
}

function StoryBlock({ index, eyebrow, title, image, alt, children }: BlockProps) {
  const flip = index % 2 === 1;
  return (
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
      <Reveal className={flip ? "lg:order-2" : ""}>
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] border border-line">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 90vw, 32rem"
            className="object-cover"
          />
        </div>
      </Reveal>
      <Reveal delay={0.08} className={flip ? "lg:order-1" : ""}>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 text-balance text-2xl leading-tight md:text-[2rem]">
          {title}
        </h2>
        <div className="mt-4 space-y-3 text-pretty leading-relaxed text-ink-soft">
          {children}
        </div>
      </Reveal>
    </div>
  );
}

export default function AtelierPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-paper">
        <div className="container-page py-16 text-center md:py-24">
          <p className="eyebrow">Atelier</p>
          <h1 className="mx-auto mt-4 max-w-3xl text-balance text-4xl leading-[1.05] md:text-6xl">
            Wo Namen zu Kunst werden
          </h1>
          <div className="mx-auto mt-7 text-4xl text-ink sm:text-5xl">
            <WritingWord />
          </div>
          <p className="mx-auto mt-7 max-w-xl text-pretty text-lg leading-relaxed text-ink-soft">
            Dieses Atelier ist kein Geschäft, sondern ein Raum, in dem Kunst
            entsteht. Hier wird jeder Name mit Tinte, Geduld und Liebe gemalt –
            für die Menschen, die uns am Herzen liegen.
          </p>
          <InkStroke
            variant="flourish"
            className="mx-auto mt-8 h-8 w-52"
            color="var(--color-gold)"
            width={2.5}
          />
        </div>
      </section>

      {/* Story */}
      <div className="container-page space-y-20 py-16 md:space-y-28 md:py-24">
        <StoryBlock
          index={0}
          eyebrow="Die Leidenschaft"
          title="Es begann mit Tinte und Geduld"
          image="/gallery/herz-rohling.jpg"
          alt="Ein handgemaltes Herz aus Tinte"
        >
          <p>
            <PH>PLATZHALTER: deine persönliche Geschichte – wann und warum du
            angefangen hast zu malen</PH>.
          </p>
          <p>
            Was als stilles Hobby begann, wurde zu einer Sprache: die Art, wie
            sich Tinte über das Papier bewegt, wie aus einem Namen ein Bild wird.
            Jedes Werk ist ein leises Gespräch zwischen Hand, Farbe und dem
            Menschen, für den es entsteht.
          </p>
        </StoryBlock>

        <StoryBlock
          index={1}
          eyebrow="Warum Handarbeit"
          title="In einer gedruckten Welt zählt das Echte"
          image="/gallery/ink-textur.jpg"
          alt="Nahaufnahme einer Alkoholtinten-Textur"
        >
          <p>
            Alles lässt sich heute kopieren, drucken und in Sekunden
            vervielfältigen. Genau deshalb berührt das Handgemalte. Es trägt die
            Zeit, die jemand investiert hat.
          </p>
          <p>
            Und es trägt eine leise Botschaft: <em>Du warst mir diese Stunden
            wert.</em>
          </p>
        </StoryBlock>

        <StoryBlock
          index={2}
          eyebrow="Die Bedeutung"
          title="Ein Name ist mehr als ein Wort"
          image="/gallery/salwa-quadrat.jpg"
          alt="Quadratisches Werk mit arabischem Namen"
        >
          <p>
            In der arabischen Kalligrafie ist ein Name Identität, Liebe und Würde
            zugleich. Ihn zu malen heißt, einen Menschen zu ehren – ob Mutter,
            Partner, Kind oder dich selbst.
          </p>
          <p>Aus Buchstaben wird Zugehörigkeit.</p>
        </StoryBlock>

        <StoryBlock
          index={3}
          eyebrow="Das Versprechen"
          title="Niemals zweimal dasselbe"
          image="/gallery/namen-quadrate.jpg"
          alt="Zwei individuell gestaltete Namens-Werke"
        >
          <p>
            Tinte lässt sich nie vollständig kontrollieren – und das ist das
            Schöne daran. Jeder Verlauf entsteht nur ein einziges Mal.
          </p>
          <p>
            Dein Stück wird mit Zeit und Hingabe gemalt und bleibt für immer ein
            Original.
          </p>
        </StoryBlock>
      </div>

      {/* CTA */}
      <section className="pb-20 md:pb-28">
        <div className="container-page">
          <div className="rounded-[2rem] border border-line bg-surface px-6 py-14 text-center md:py-16">
            <h2 className="mx-auto max-w-xl text-balance text-3xl md:text-4xl">
              Lass deinen Namen malen.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-pretty text-ink-soft">
              Gestalte in wenigen Schritten dein eigenes Unikat – mit Live-Vorschau.
            </p>
            <Link href="/gestalten" className="btn btn-primary mt-8">
              Jetzt gestalten
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
