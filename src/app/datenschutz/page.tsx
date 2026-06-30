import type { Metadata } from "next";
import { LegalShell, PH } from "@/components/legal/LegalShell";

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: false },
};

export default function DatenschutzPage() {
  return (
    <LegalShell title="Datenschutzerklärung">
      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist:
        <br />
        <PH>PLATZHALTER: Name, Anschrift, E-Mail</PH>
      </p>

      <h2>2. Welche Daten wir verarbeiten</h2>
      <p>
        Wenn du eine Anfrage absendest, verarbeiten wir die von dir angegebenen
        Daten: Name, E-Mail-Adresse, ggf. Telefonnummer, Lieferadresse, deine
        Gestaltungswahl sowie das erzeugte Vorschau-Bild (Mockup) und optionale
        Anmerkungen.
      </p>

      <h2>3. Zweck &amp; Rechtsgrundlage</h2>
      <p>
        Die Verarbeitung erfolgt zur Bearbeitung deiner Anfrage und zur
        Anbahnung bzw. Durchführung des Vertrags (Art. 6 Abs. 1 lit. b DSGVO).
      </p>

      <h2>4. Empfänger / Auftragsverarbeiter</h2>
      <p>
        Zur Zustellung der Anfrage-E-Mail setzen wir ggf. den Dienst{" "}
        <strong>Resend</strong> (Resend, Inc., USA) ein. Dabei können die oben
        genannten Daten an den Dienstleister übermittelt werden.{" "}
        <PH>PLATZHALTER: Auftragsverarbeitungsvertrag (AVV) abschließen &amp; verlinken</PH>
      </p>
      <p>
        Das Hosting erfolgt über <strong>Vercel</strong>.{" "}
        <PH>PLATZHALTER: Vercel-Anbieterangaben &amp; AVV prüfen</PH>
      </p>

      <h2>5. Cookies &amp; Tracking</h2>
      <p>
        Diese Website verwendet <strong>keine</strong> Tracking-Cookies und kein
        Analyse-Tool. <PH>PLATZHALTER: anpassen, falls später Tools ergänzt werden</PH>
      </p>

      <h2>6. Speicherdauer</h2>
      <p>
        Wir speichern deine Daten nur so lange, wie es für die Bearbeitung deiner
        Anfrage und die Erfüllung gesetzlicher Aufbewahrungspflichten erforderlich
        ist. <PH>PLATZHALTER: konkrete Fristen</PH>
      </p>

      <h2>7. Deine Rechte</h2>
      <p>
        Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
        Verarbeitung, Datenübertragbarkeit sowie Widerspruch. Außerdem kannst du
        dich bei einer Datenschutz-Aufsichtsbehörde beschweren.
      </p>
      <ul>
        <li>Auskunft (Art. 15 DSGVO)</li>
        <li>Berichtigung (Art. 16 DSGVO)</li>
        <li>Löschung (Art. 17 DSGVO)</li>
        <li>Einschränkung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch (Art. 21 DSGVO)</li>
      </ul>

      <h2>8. Kontakt</h2>
      <p>
        Für Anliegen zum Datenschutz erreichst du uns unter:{" "}
        <PH>PLATZHALTER: E-Mail-Adresse</PH>
      </p>
    </LegalShell>
  );
}
