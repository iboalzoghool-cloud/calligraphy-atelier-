/*
  ───────────────────────────────────────────────────────────────
  ZENTRALE INHALTE & PLATZHALTER
  Alles, was der Founder anpassen muss, liegt hier an EINER Stelle.
  Felder mit „PLATZHALTER" unbedingt vor dem Launch ersetzen.
  ───────────────────────────────────────────────────────────────
*/

export const BRAND = {
  name: "Kalligraphie",
  /** Kurzer Markenclaim (Hero/Meta). */
  tagline: "Handgemalte Namenskunst",
  /** Ein Satz, der die Marke trägt. */
  promise:
    "Jedes Stück wird von Hand gemalt – mit Tinte, Geduld und deinem Namen im Mittelpunkt.",
  // Ort, an dem gemalt wird (für „Handgemalt in …")
  city: "Offenbach",
  // PLATZHALTER: Kontakt-E-Mail für Kundenanfragen (rechtlich nötig für Impressum!)
  email: "[deine@email.de]",
  instagram: "@iboverse",
  // PLATZHALTER: optional, z. B. für TikTok-Funnel
  tiktok: "[@deinhandle]",
};

/* Preise in Cent – zentral, leicht änderbar.
   Grundpreis kommt aus der Größe (siehe SIZES in options.ts). */
export const PRICING = {
  currency: "EUR" as const,
  // Veredelungen (Upsells) – „kostet mich wenig, fühlt sich für Kund:innen wertvoll an"
  saying: 500, // persönliche Widmung / Spruch
  gold: 500, // verstärkte Goldakzente („Mehr Gold")
  gift: 700, // Premium-Geschenkverpackung
  card: 400, // handgeschriebene Grußkarte
  express: 900, // Express-Anfertigung
  date: 300, // Datum / Jahr ergänzen
  // PLATZHALTER: Versandkosten – aktuell informativ, in v1 nicht berechnet
  shippingHint: "Versand innerhalb Deutschlands – Kosten werden bei der Auftragsbestätigung mitgeteilt.",
};

/** Wöchentliche Verknappung (dezent kommuniziert). false = ausblenden. */
export const SCARCITY = {
  show: true,
  // PLATZHALTER: reale Zahl freier Plätze pro Woche
  slotsPerWeek: 8,
};

/* PLATZHALTER: realistische Bearbeitungszeit (auch im Disclaimer genutzt). */
export const PROCESSING_TIME = "7–14";

/** Format & Größe des Produkts. */
export const PRODUCT = {
  sizeLabel: "29 × 29 cm",
  material: "Alkoholtinte auf Leinwand",
};

/* Pflicht-Hinweise vor der Bestellung (Disclaimer-Modal). */
export const DISCLAIMERS = [
  {
    title: "Handgemaltes Unikat",
    body: "Dies ist handgemalte Kunst. Jedes Stück ist ein Unikat und kann in Farbverlauf, Form und Anmutung von der digitalen Vorschau abweichen.",
  },
  {
    title: "Kein Widerrufsrecht",
    body: "Personalisierte Sonderanfertigung – es besteht kein gesetzliches Widerrufsrecht (§ 312g Abs. 2 Nr. 1 BGB).",
  },
  {
    title: "Bearbeitungszeit",
    body: `Die Anfertigung dauert in der Regel ${PROCESSING_TIME} Tage. Du erhältst nach Eingang deiner Anfrage eine persönliche Rückmeldung.`,
  },
] as const;

/* FAQ – ehrlich, konkret, ohne Marketing-Floskeln. */
export const FAQ = [
  {
    q: "Ist jedes Stück wirklich handgemalt?",
    a: "Ja. Jedes Bild wird einzeln von Hand mit Alkoholtinte gemalt. Die Vorschau im Konfigurator ist eine Annäherung – dein Original entsteht frei und wird nie exakt gleich aussehen. Genau das macht es zum Unikat.",
  },
  {
    q: "Wie lange dauert die Anfertigung?",
    a: `In der Regel ${PROCESSING_TIME} Tage ab Auftragsbestätigung. Bei Anlässen wie Eid oder Muttertag bitte etwas früher bestellen.`,
  },
  {
    q: "Kann ich arabische und lateinische Namen kombinieren?",
    a: "Ja. Du kannst den Namen in arabischer oder lateinischer Schrift eingeben und aus vier Kalligrafie-Stilen wählen. Auf Wunsch ergänzen wir einen Spruch.",
  },
  {
    q: "Gibt es ein Widerrufsrecht?",
    a: "Da es sich um eine personalisierte Sonderanfertigung handelt, besteht kein gesetzliches Widerrufsrecht (§ 312g Abs. 2 Nr. 1 BGB). Bei beschädigter Lieferung finden wir natürlich eine Lösung.",
  },
  {
    q: "Wie läuft die Bezahlung?",
    a: "Aktuell schickst du deine Gestaltung als unverbindliche Anfrage. Wir bestätigen Verfügbarkeit, Preis und Versand per E-Mail und stimmen die Zahlung persönlich mit dir ab.",
  },
  {
    q: "Wie pflege ich das Bild?",
    a: "Vor direkter Sonneneinstrahlung schützen und nur trocken abstauben. So bleiben die Farben lange leuchtend.",
  },
] as const;

/* Anlässe – Einstieg in den Konfigurator. */
export const OCCASIONS = [
  {
    title: "Eid",
    ar: "عيد مبارك",
    text: "Ein persönliches Geschenk zum Fest – Name und Segenswunsch in einem.",
  },
  {
    title: "Muttertag",
    ar: "أمي",
    text: "„Liebste Mutter“ auf Tinte und Gold. Ein Bild, das bleibt.",
  },
  {
    title: "Hochzeit",
    ar: "مودة",
    text: "Zwei Namen, ein Kunstwerk. Auch als Geschenk für das Brautpaar.",
  },
  {
    title: "Geburt",
    ar: "مولود",
    text: "Der erste Name des neuen Lebens – handgemalt zum Willkommen.",
  },
] as const;
