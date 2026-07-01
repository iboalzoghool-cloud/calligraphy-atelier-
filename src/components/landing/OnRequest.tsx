import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

// Sonderwünsche jenseits von Herz & Quadrat – klar anfragbar machen.
const REQUESTS = [
  { de: "Namensschild", ar: "اسم" },
  { de: "Koranvers-Kunst", ar: "آية" },
  { de: "Doppelname zur Hochzeit", ar: "زواج" },
  { de: "Großformat", ar: "كبير" },
  { de: "Eigenes Motiv", ar: "تصميمك" },
];

export function OnRequest() {
  return (
    <section id="auf-wunsch" className="scroll-mt-24 py-14 md:py-20">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-12 md:px-12 md:py-14">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(100% 130% at 100% 0%, rgba(178,94,119,0.09), transparent 55%), radial-gradient(90% 120% at 0% 100%, rgba(169,130,59,0.07), transparent 55%)",
              }}
            />
            <div className="max-w-2xl">
              <p className="eyebrow eyebrow-rule">Auf Wunsch</p>
              <h2 className="mt-4 text-balance text-3xl leading-[1.12] md:text-[2.4rem]">
                Dein eigenes Motiv? Ein Vers? Ein großes Format?
              </h2>
              <p className="mt-5 text-pretty leading-relaxed text-ink-soft">
                Neben Herz und Quadrat entsteht vieles auf Anfrage – ein
                Namensschild, ein Koranvers, ein Doppelname zur Hochzeit oder ein
                großes Statement-Stück. Erzähl uns deine Idee, wir setzen sie von
                Hand um.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {REQUESTS.map((r) => (
                  <span
                    key={r.de}
                    className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-canvas px-3.5 py-1.5 text-sm text-ink"
                  >
                    {r.de}
                    <span dir="rtl" className="font-arabic text-base leading-none text-gold">
                      {r.ar}
                    </span>
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/gestalten" className="btn btn-primary">
                  Im Konfigurator starten
                </Link>
                <Link href="/gestalten?wunsch=1" className="btn btn-secondary">
                  Sonderwunsch beschreiben
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
