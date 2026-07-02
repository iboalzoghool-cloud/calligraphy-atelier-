/* ENTWURF – vor Live-Schaltung juristisch prüfen lassen (siehe ENDBERICHT). */
import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
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
        Der Anbieter verkauft zwei Produktlinien: <strong>Originale</strong> –
        individuell gestaltete, von Hand gemalte Kunstwerke nach den im
        Konfigurator gewählten Vorgaben (Form, Farbwelt, Name, Schrift,
        optional Spruch und Goldakzente) – sowie <strong>Editionen</strong> –
        nicht personalisierte Kunstdrucke ausgewählter Motive, die als solche
        gekennzeichnet sind.
      </p>

      <h2>§ 3 Vertragsschluss</h2>
      <p>
        Beim Kauf über den Online-Checkout kommt der Vertrag mit Abschluss des
        Bezahlvorgangs zustande; du erhältst eine Bestellbestätigung per
        E-Mail. Bei der <strong>unverbindlichen Anfrage</strong> (Sonderwünsche,
        Großformate) kommt ein Vertrag erst zustande, wenn der Anbieter die
        Anfrage ausdrücklich per E-Mail bestätigt (Annahme).
      </p>

      <h2>§ 4 Preise &amp; Versand</h2>
      <p>
        Es gelten die zum Zeitpunkt der Bestätigung genannten Preise. Der
        Versand erfolgt derzeit innerhalb Deutschlands; die konkreten
        Versandkosten werden vor Vertragsschluss mit der Auftragsbestätigung
        genannt. Ein Vertrag kommt erst zustande, wenn du danach zustimmst.
      </p>

      <h2>§ 5 Zahlung</h2>
      <p>
        Die Zahlung erfolgt im Online-Checkout über den Zahlungsdienstleister
        Stripe (u. a. Kartenzahlung). Bei Bestellungen über die unverbindliche
        Anfrage wird die Zahlung persönlich per E-Mail vereinbart (in der
        Regel Banküberweisung, Vorkasse). Zusätzliche Gebühren entstehen dir
        nicht. Alle Preise sind Endpreise; kein Ausweis der Umsatzsteuer
        gemäß § 19 UStG.
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
        Für <strong>Originale</strong> (nach Kundenspezifikation angefertigt
        bzw. eindeutig auf persönliche Bedürfnisse zugeschnitten) besteht{" "}
        <strong>kein Widerrufsrecht</strong> gemäß § 312g Abs. 2 Nr. 1 BGB.
        Für <strong>Editionen</strong> (Kunstdrucke) gilt das gesetzliche
        14-tägige Widerrufsrecht – Details in der{" "}
        <a href="/widerruf">Widerrufsbelehrung</a>.
      </p>

      <h2>§ 9 Gewährleistung</h2>
      <p>
        Es gelten die gesetzlichen Gewährleistungsrechte. Bei Transportschäden
        bitte unverzüglich mit Fotonachweis melden – wir finden eine Lösung.
      </p>

      <h2>§ 10 Schlussbestimmungen</h2>
      <p>
        Es gilt das Recht der Bundesrepublik Deutschland. Gegenüber
        Verbraucher:innen gelten die gesetzlichen Gerichtsstände. Sollten
        einzelne Bestimmungen unwirksam sein, bleibt der übrige Vertrag wirksam.
      </p>
    </LegalShell>
  );
}
