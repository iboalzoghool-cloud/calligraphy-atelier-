import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { InkStroke } from "@/components/ui/InkStroke";

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
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[1.75rem] border border-line">
              <Image
                src="/gallery/quds-staffelei.jpg"
                alt="Ein entstehendes Werk auf der Staffelei im Atelier"
                fill
                sizes="(max-width: 1024px) 90vw, 28rem"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
