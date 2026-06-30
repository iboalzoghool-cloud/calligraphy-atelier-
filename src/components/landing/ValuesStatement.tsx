import { PH } from "@/components/legal/LegalShell";

/*
  ───────────────────────────────────────────────────────────────
  TEIL E — WERTE / STATEMENT-BLOCK
  Standard: AUS. Bewusst per Flag aktivierbar – das ist eine
  Geschäftsentscheidung (kann Zielgruppe binden ODER Zahlungs-/
  Ad-Plattformen triggern). Liebe & Menschlichkeit schwingen überall
  in der warmen Tonalität mit; ein explizites (z. B. politisches)
  Statement bleibt ein bewusster, separater Schalter in DEINER Hand.

  Zum Aktivieren: SHOW_STATEMENT = true.
  Inhalt unten anpassen (Platzhalter ersetzen).
  ───────────────────────────────────────────────────────────────
*/
const SHOW_STATEMENT: boolean = false;

export function ValuesStatement() {
  if (!SHOW_STATEMENT) return null;

  return (
    <section className="bg-ink py-16 text-canvas md:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-canvas/60">
            Aus dem Herzen
          </p>
          <h2 className="mt-5 text-balance font-display text-3xl leading-snug text-canvas md:text-[2.3rem]">
            {/* PLATZHALTER: deine Botschaft – z. B. Verbundenheit, Menschlichkeit, Solidarität */}
            <PH>PLATZHALTER: deine Botschaft in einem starken Satz</PH>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-pretty leading-relaxed text-canvas/70">
            {/* PLATZHALTER: 1–2 Sätze, wofür die Marke steht. Optional: ein Teil
                jeder Bestellung geht an … */}
            <PH>PLATZHALTER: kurzer erläuternder Text zu deiner Botschaft</PH>
          </p>
        </div>
      </div>
    </section>
  );
}
