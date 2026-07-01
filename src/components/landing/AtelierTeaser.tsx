import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { InkStroke } from "@/components/ui/InkStroke";
import { FloatingFrame } from "@/components/ui/FloatingFrame";

export function AtelierTeaser() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <p className="eyebrow">Das Atelier</p>
            <h2 className="mt-3 text-balance text-3xl leading-[1.1] md:text-[2.6rem]">
              Hinter jedem Strich
              <br />
              steckt eine Hand.
            </h2>
            <InkStroke
              variant="underline"
              className="mt-4 h-4 w-40"
              color="var(--color-rose)"
              width={2.5}
            />
            <p className="mt-6 max-w-md text-pretty leading-relaxed text-ink-soft">
              Kein Drucker, kein Algorithmus. Nur Tinte, Papier und Zeit. Jedes
              Stück entsteht langsam, mit Atem und Aufmerksamkeit – und trägt am
              Ende eine kleine Unvollkommenheit, die es unverwechselbar macht.
            </p>
            <Link
              href="/atelier"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-ink underline-offset-4 hover:underline"
            >
              Die Geschichte lesen
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <div className="relative mx-auto w-full max-w-md">
              <FloatingFrame interactive glare float={false} shadow={false} maxTilt={7}>
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] border border-line shadow-lift">
                  <Image
                    src="/atelier/makkah.jpg"
                    alt="Ein handgemaltes Werk auf der Staffelei im Atelier"
                    fill
                    sizes="(max-width: 1024px) 90vw, 28rem"
                    className="object-cover"
                  />
                </div>
              </FloatingFrame>
              {/* Signatur-Badge – „Aus dem Herzen" */}
              <div className="absolute -bottom-5 -right-3 rounded-2xl border border-line bg-surface px-5 py-3.5 shadow-lift">
                <div
                  className="font-arabic text-2xl leading-none text-gold"
                  dir="rtl"
                  lang="ar"
                >
                  من القلب
                </div>
                <div className="mt-1.5 text-[11px] uppercase tracking-[0.16em] text-ink-soft">
                  Aus dem Herzen
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
