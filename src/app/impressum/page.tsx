import type { Metadata } from "next";
import { LegalShell, PH } from "@/components/legal/LegalShell";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false },
};

export default function ImpressumPage() {
  return (
    <LegalShell title="Impressum">
      <h2>Angaben gemäß § 5 TMG</h2>
      <p>
        <PH>PLATZHALTER: Vor- und Nachname / Firmenname</PH>
        <br />
        <PH>PLATZHALTER: Straße &amp; Hausnummer</PH>
        <br />
        <PH>PLATZHALTER: PLZ Ort</PH>
        <br />
        <PH>PLATZHALTER: Land</PH>
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: <PH>PLATZHALTER: Telefonnummer</PH>
        <br />
        E-Mail: <PH>PLATZHALTER: E-Mail-Adresse</PH>
      </p>

      <h2>Umsatzsteuer</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27 a UStG:{" "}
        <PH>PLATZHALTER: USt-IdNr. oder „Kleinunternehmer gemäß § 19 UStG“</PH>
      </p>

      <h2>Redaktionell verantwortlich</h2>
      <p>
        <PH>PLATZHALTER: Name</PH>
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
