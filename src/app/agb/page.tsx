import type { Metadata } from "next";
import { LegalShell, PH } from "@/components/legal/LegalShell";
import { PROCESSING_TIME } from "@/lib/content";

export const metadata: Metadata = {
  title: "AGB",
  robots: { index: false },
};

export default function AgbPage() {
  return (
    <LegalShell title="Allgemeine Geschäftsbedingungen">
      <h2>§ 1 Geltungsbereich &amp; Anbieter</h2>
      <p>
        Diese AGB gelten für alle über diese Website angebahnten Bestellungen
        handgemalter Kalligrafie-Unikate bei{" "}
        Ibrahim Al Zoghool, Bismarckstraße 37, 63065 Offenbach am Main,
        Deutschland (nachfolgend „Anbieter“).
      </p>

      <h2>§ 2 Vertragsgegenstand</h2>
      <p>
        Gegenstand ist die Anfertigung individuell gestalteter, von Hand gemalter
        Kunstwerke (Format ca. 29 × 29 cm) nach den im Konfigurator gewählten
        Vorgaben (Form, Farbwelt, Name, Schrift, optional Spruch und
        Goldakzente).
      </p>

      <h2>§ 3 Vertragsschluss</h2>
      <p>
        Die Darstellung im Konfigurator ist kein verbindliches Angebot. Mit dem
        Absenden des Formulars gibst du eine <strong>unverbindliche Anfrage</strong>{" "}
        ab. Ein Vertrag kommt erst zustande, wenn der Anbieter die Anfrage
        ausdrücklich per E-Mail bestätigt (Annahme).
      </p>

      <h2>§ 4 Preise &amp; Versand</h2>
      <p>
        Es gelten die zum Zeitpunkt der Bestätigung genannten Preise. Versandkosten
        werden mit der Auftragsbestätigung mitgeteilt.{" "}
        <PH>PLATZHALTER: konkrete Versandkosten &amp; Liefergebiete</PH>
      </p>

      <h2>§ 5 Zahlung</h2>
      <p>
        Die Zahlungsabwicklung wird derzeit persönlich per E-Mail abgestimmt.{" "}
        <PH>PLATZHALTER: Zahlungsarten / Zahlungsziel</PH>
        {" "}
        <em>(Hinweis: Online-Zahlung via Stripe ist für Phase 2 vorgesehen.)</em>
      </p>

      <h2>§ 6 Lieferzeit</h2>
      <p>
        Da jedes Stück von Hand gefertigt wird, beträgt die Bearbeitungszeit in der
        Regel {PROCESSING_TIME} Tage ab Auftragsbestätigung, zzgl. Versanddauer.
        Abweichungen werden rechtzeitig mitgeteilt.
      </p>

      <h2>§ 7 Handgefertigte Unikate</h2>
      <p>
        Sämtliche Werke sind handgemalte Einzelstücke. Die digitale Vorschau
        (Mockup) dient nur der Orientierung. Farbverläufe, Form und Anmutung des
        Originals können davon <strong>abweichen</strong>; geringfügige
        Abweichungen stellen keinen Mangel dar, sondern sind Ausdruck der
        handwerklichen Fertigung.
      </p>

      <h2>§ 8 Widerrufsrecht</h2>
      <p>
        Da es sich um Waren handelt, die nach Kundenspezifikation angefertigt
        werden bzw. eindeutig auf persönliche Bedürfnisse zugeschnitten sind,
        besteht <strong>kein Widerrufsrecht</strong> gemäß § 312g Abs. 2 Nr. 1 BGB.
      </p>

      <h2>§ 9 Gewährleistung</h2>
      <p>
        Es gelten die gesetzlichen Gewährleistungsrechte. Bei Transportschäden
        bitte unverzüglich mit Fotonachweis melden – wir finden eine Lösung.
      </p>

      <h2>§ 10 Schlussbestimmungen</h2>
      <p>
        Es gilt das Recht der Bundesrepublik Deutschland. Sollten einzelne
        Bestimmungen unwirksam sein, bleibt der übrige Vertrag wirksam.{" "}
        <PH>PLATZHALTER: Gerichtsstand, falls zulässig</PH>
      </p>
    </LegalShell>
  );
}
