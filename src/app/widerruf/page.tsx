import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { BRAND } from "@/lib/content";

/*
  ENTWURF – vor Live-Schaltung juristisch prüfen lassen (siehe ENDBERICHT).
  Kernlogik: Editionen (Kunstdrucke) = normales 14-Tage-Widerrufsrecht;
  personalisierte Originale = Ausschluss nach § 312g Abs. 2 Nr. 1 BGB.
*/

export const metadata: Metadata = {
  title: "Widerrufsbelehrung",
  robots: { index: false },
};

export default function WiderrufPage() {
  return (
    <LegalShell title="Widerrufsbelehrung">
      <h2>Widerrufsrecht für Editionen (Kunstdrucke)</h2>
      <p>
        Verbraucher:innen haben beim Kauf von Kunstdrucken aus unseren
        Editionen das Recht, binnen vierzehn Tagen ohne Angabe von Gründen
        diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage
        ab dem Tag, an dem du oder ein von dir benannter Dritter, der nicht
        Beförderer ist, die Ware in Besitz genommen hat.
      </p>
      <p>
        Um dein Widerrufsrecht auszuüben, musst du uns (Ibrahim Al Zoghool,
        Bismarckstraße 37, 63065 Offenbach am Main,{" "}
        <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>) mittels einer
        eindeutigen Erklärung (z.&nbsp;B. per E-Mail oder Brief) über deinen
        Entschluss informieren. Du kannst dafür das unten stehende
        Muster-Widerrufsformular verwenden, das ist jedoch nicht
        vorgeschrieben. Zur Wahrung der Frist reicht es aus, dass du die
        Mitteilung vor Ablauf der Widerrufsfrist absendest.
      </p>

      <h2>Folgen des Widerrufs</h2>
      <p>
        Wenn du diesen Vertrag widerrufst, haben wir dir alle Zahlungen, die
        wir von dir erhalten haben, einschließlich der Lieferkosten (mit
        Ausnahme zusätzlicher Kosten, die sich daraus ergeben, dass du eine
        andere Art der Lieferung als die von uns angebotene günstigste
        Standardlieferung gewählt hast), unverzüglich und spätestens binnen
        vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über
        deinen Widerruf bei uns eingegangen ist. Für die Rückzahlung verwenden
        wir dasselbe Zahlungsmittel, das du bei der ursprünglichen Transaktion
        eingesetzt hast. Wir können die Rückzahlung verweigern, bis wir die
        Ware wieder zurückerhalten haben oder du den Nachweis erbracht hast,
        dass du die Ware zurückgesandt hast, je nachdem, welches der frühere
        Zeitpunkt ist. Du trägst die unmittelbaren Kosten der Rücksendung.
      </p>

      <h2>Kein Widerrufsrecht bei personalisierten Originalen</h2>
      <p>
        Das Widerrufsrecht besteht <strong>nicht</strong> bei Verträgen zur
        Lieferung von Waren, die nicht vorgefertigt sind und für deren
        Herstellung eine individuelle Auswahl oder Bestimmung durch die
        Verbraucherin oder den Verbraucher maßgeblich ist oder die eindeutig
        auf die persönlichen Bedürfnisse zugeschnitten sind
        (§ 312g Abs. 2 Nr. 1 BGB). Das betrifft unsere{" "}
        <strong>Originale</strong>: von Hand gemalte Unikate mit deinem Namen,
        Wunschtext oder individueller Gestaltung. Bei Transportschäden oder
        Mängeln gelten selbstverständlich die gesetzlichen
        Gewährleistungsrechte – melde dich einfach.
      </p>

      <h2>Muster-Widerrufsformular</h2>
      <p>
        (Wenn du den Vertrag widerrufen willst, fülle bitte dieses Formular
        aus und sende es zurück.)
      </p>
      <p>
        An Ibrahim Al Zoghool, Bismarckstraße 37, 63065 Offenbach am Main,{" "}
        <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>:<br />
        – Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen
        Vertrag über den Kauf der folgenden Waren (*)<br />
        – Bestellt am (*)/erhalten am (*)<br />
        – Name des/der Verbraucher(s)<br />
        – Anschrift des/der Verbraucher(s)<br />
        – Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)<br />
        – Datum<br />
        (*) Unzutreffendes streichen.
      </p>
    </LegalShell>
  );
}
