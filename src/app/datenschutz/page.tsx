import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { BRAND } from "@/lib/content";

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
        Ibrahim Al Zoghool, Bismarckstraße 37, 63065 Offenbach am Main,
        Deutschland · Telefon 0163 1707860 · E-Mail:{" "}
        <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
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
        genannten Daten an den Dienstleister übermittelt werden; mit Resend
        besteht ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO
        (Bestandteil der Nutzungsbedingungen des Dienstes).
      </p>
      <p>
        Für die Bezahlung im Shop nutzen wir <strong>Stripe</strong> (Stripe
        Payments Europe, Ltd., Irland). Beim Kauf werden die für die
        Zahlungsabwicklung erforderlichen Daten (Name, E-Mail, Lieferadresse,
        Zahlungsdaten) direkt von Stripe erhoben und verarbeitet (Art. 6
        Abs. 1 lit. b DSGVO). Wir selbst erhalten und speichern keine
        vollständigen Zahlungsdaten. Details:{" "}
        <a href="https://stripe.com/de/privacy" target="_blank" rel="noreferrer">
          stripe.com/de/privacy
        </a>
        .
      </p>
      <p>
        Das Hosting erfolgt über <strong>Vercel</strong> (Vercel Inc., 340 S
        Lemon Ave #4133, Walnut, CA 91789, USA). Beim Aufruf der Website
        verarbeitet Vercel technisch notwendige Server-Logs (z. B. IP-Adresse,
        Zeitpunkt des Abrufs) zur Bereitstellung und Absicherung des Betriebs
        (Art. 6 Abs. 1 lit. f DSGVO); Grundlage ist der
        Auftragsverarbeitungsvertrag von Vercel.
      </p>

      <h2>5. Cookies &amp; Tracking</h2>
      <p>
        Diese Website verwendet <strong>keine</strong> Tracking-Cookies und kein
        Analyse-Tool. Dein Browser speichert lediglich deinen aktuellen Entwurf
        lokal (sessionStorage), damit er beim Zurückkehren nicht verloren geht –
        diese Daten verlassen dein Gerät nicht und werden beim Schließen des
        Browsers automatisch gelöscht.
      </p>

      <h2>6. Speicherdauer</h2>
      <p>
        Wir speichern deine Daten nur so lange, wie es für die Bearbeitung deiner
        Anfrage erforderlich ist. Kommt kein Auftrag zustande, löschen wir die
        Anfrage spätestens nach sechs Monaten. Für Geschäftskorrespondenz und
        Belege abgeschlossener Aufträge gelten die gesetzlichen
        Aufbewahrungsfristen (§ 257 HGB, § 147 AO: sechs bzw. zehn Jahre).
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
        <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
      </p>
    </LegalShell>
  );
}
