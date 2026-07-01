import type { Metadata } from "next";
import { LegalShell, PH } from "@/components/legal/LegalShell";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false },
};

export default function ImpressumPage() {
  return (
    <LegalShell title="Impressum">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        Ibrahim Al Zoghool
        <br />
        Bismarckstraße 37
        <br />
        63065 Offenbach am Main
        <br />
        Deutschland
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: 0163 1707860
        <br />
        E-Mail: <PH>PLATZHALTER: E-Mail-Adresse (rechtlich erforderlich)</PH>
        <br />
        Instagram: @iboverse
      </p>

      <h2>Umsatzsteuer</h2>
      <p>
        <PH>PLATZHALTER: bitte bestätigen</PH> Kleinunternehmer gemäß § 19 UStG –
        es wird keine Umsatzsteuer ausgewiesen. (Falls umsatzsteuerpflichtig:
        USt-IdNr. gemäß § 27 a UStG hier eintragen.)
      </p>

      <h2>Redaktionell verantwortlich (§ 18 Abs. 2 MStV)</h2>
      <p>
        Ibrahim Al Zoghool
        <br />
        Anschrift wie oben.
      </p>

      <h2>EU-Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streit­bei­legung
        (OS) bereit:{" "}
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer">
          https://ec.europa.eu/consumers/odr/
        </a>
        . Unsere E-Mail-Adresse findest du oben.
      </p>

      <h2>Verbraucherstreitbeilegung</h2>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor
        einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2>Bildnachweis</h2>
      <p>
        Alle gezeigten Werke stammen aus eigener Herstellung. <PH>PLATZHALTER: ggf. weitere Bildnachweise</PH>
      </p>
    </LegalShell>
  );
}
