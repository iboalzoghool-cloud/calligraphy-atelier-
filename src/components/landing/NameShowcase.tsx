import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { FloatingFrame } from "@/components/ui/FloatingFrame";
import { VideoLoop } from "@/components/ui/VideoLoop";
import { InkSplashes } from "@/components/ui/InkSplashes";

/**
 * „Dein Name in Tinte" – echtes Werk als Hochformat-Clip (handyfreundlich),
 * mit der emotionalen Geschenk-/Liebe-Botschaft.
 */
export function NameShowcase() {
  return (
    <section className="relative scroll-mt-24 overflow-hidden py-16 md:py-24">
      <InkSplashes />
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <p className="eyebrow eyebrow-rule">Dein Name</p>
            <h2 className="mt-4 text-balance text-3xl leading-[1.12] md:text-[2.6rem]">
              Ein Name, in fließender Tinte.
            </h2>
            <InkLine />
            <p className="mt-6 max-w-md text-pretty leading-relaxed text-ink-soft">
              Dein Name – oder der eines geliebten Menschen – von Hand in weiche
              Alkohol-Tinte geschrieben. Kein Druck, keine Kopie: ein Wort, das
              bleibt und ein Gefühl schenkt. In deiner Farbwelt – Rosé, Lavendel,
              Türkis oder Gold.
            </p>
            <Link href="/gestalten" className="btn btn-primary mt-8">
              Deinen Namen gestalten
            </Link>
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            {/* Zwei echte Werke, zwei Farbwelten (Hochformat, handyfreundlich) */}
            <div className="mx-auto grid max-w-md grid-cols-2 gap-4">
              {[
                {
                  src: "/videos/name-liebe.mp4",
                  poster: "/videos/name-liebe.jpg",
                  offset: "-rotate-2",
                },
                {
                  src: "/videos/name-lavendel.mp4",
                  poster: "/videos/name-lavendel.jpg",
                  offset: "rotate-2 sm:mt-10",
                },
              ].map((v) => (
                <FloatingFrame
                  key={v.src}
                  interactive
                  glare
                  float={false}
                  shadow={false}
                  maxTilt={7}
                  className={v.offset}
                >
                  <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[1.25rem] border border-line shadow-lift">
                    <VideoLoop
                      src={v.src}
                      poster={v.poster}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                </FloatingFrame>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InkLine() {
  return (
    <span
      className="mt-4 block h-px w-24 bg-gradient-to-r from-gold to-transparent"
      aria-hidden
    />
  );
}
