import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function CtaBanner() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-14 text-center md:px-10 md:py-20">
            {/* dezenter Rosé/Gold-Schein */}
            <div
              className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-rose/25 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-gold/20 blur-3xl"
              aria-hidden
            />
            <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-canvas/60">
              Bereit?
            </p>
            <h2 className="relative mx-auto mt-4 max-w-2xl text-balance text-3xl text-canvas md:text-[2.7rem] md:leading-[1.1]">
              Mach den ersten Strich – wir malen den Rest.
            </h2>
            <p className="relative mx-auto mt-4 max-w-md text-pretty text-canvas/70">
              In zwei Minuten zu deinem Entwurf. Unverbindlich und ohne Anmeldung.
            </p>
            <div className="relative mt-8">
              <Link
                href="/gestalten"
                className="btn bg-canvas text-ink hover:bg-white"
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
