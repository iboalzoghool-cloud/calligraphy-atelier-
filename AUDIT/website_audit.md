# Website-Audit · Kalligraphie-Atelier (Stand: 2026-07-02, Übernacht-Session)

Geprüft: lokal (`next dev` + Prod-Build `next start`), Mobile 390×844 (Playwright,
echte Scroll-Reveals) + Desktop-Chrome. Lighthouse mobil gegen Prod-Build.

## P0 — Funktion / Recht (vor allem anderen fixen)

1. **Anfragen kommen nirgends an.** `POST /api/order` funktioniert technisch
   (E2E getestet: Konfigurator → Modal → /bestellung → Submit → 200), aber ohne
   `RESEND_API_KEY`/`ORDER_TO` ist `delivered:false` — die Anfrage existiert dann
   nur als Server-Log. Vercel-Env nicht prüfbar (MCP-Token sieht anderes Team) →
   Annahme: auch in Prod nicht konfiguriert.
   Dazu zeigt die Erfolgsseite Kund:innen **Dev-Jargon** („richte RESEND_API_KEY
   ein, siehe README“). → Kundentauglicher Fallback nötig (Mailto mit vorbefüllter
   Zusammenfassung + Instagram-DM), Env-Setup als Blocker dokumentieren.
2. **Entwurf überlebt keinen Reload.** Konfigurator-State + Order-Snapshot leben
   nur im React-Context. TikTok-/Insta-In-App-Browser wird ständig weggewischt →
   Entwurf weg, `/bestellung` zeigt „Noch kein Entwurf“. → sessionStorage-Persistenz.
3. **Impressum/Datenschutz zeigen sichtbare Platzhalter** („PLATZHALTER:
   E-Mail-Adresse (rechtlich erforderlich)“). E-Mail ist Pflichtangabe (§ 5 DDG).
   Name/Adresse/Telefon sind echt. → echte E-Mail eintragen, PH-Marker raus.
4. **Sticky-CTA verdeckt Content auf jeder Scroll-Position** (fixed, kein
   Scroll-Padding, keine safe-area): FAQ-Zeilen, CTA-Banner-Rand, Footer inkl.
   Rechtslinks. → Neubau: kompakter, `env(safe-area-inset-bottom)`, Body-Padding,
   vor Footer ausblenden.

## P1 — Performance (Lighthouse mobil, Prod-Build, throttled)

| Seite | Perf | A11y | SEO | LCP | TBT |
|---|---|---|---|---|---|
| `/` | **44** | 96 | 100 | **12,2 s** | 1 420 ms |
| `/gestalten` | **59** | 96 | 100 | 7,9 s | 630 ms |

- **LCP-Killer:** LCP-Element ist der Hero-*Text* — er hängt in `Reveal`
  (opacity 0 bis JS geladen + IntersectionObserver feuert). Above-the-fold darf
  nicht JS-gated sein.
- **TBT:** three.js-`InkBackground` (AtelierAmbience) lädt auf der Landing;
  framer-motion überall. Bootup 1,5 s, Mainthread 4,0 s, 2 MB übertragen.
- **Bilder:** `modern-image-formats` −1,46 s. HeartFan-Texturen + Video-Poster
  laufen an next/image vorbei; `worlds/*.jpg` bis 110 KB, Atelier-JPGs 300–740 KB.
- **Videos:** 2,8–4,6 MB pro Clip ×3 auf der Landing (Preload-Verhalten prüfen).
- **A11y (96):** color-contrast-Fails (ink-faint/gold-soft-Texte).

## P2 — Sections mobil (Job / Zustand)

- **Hero** (Herz-Fächer + Live-Name + Farbwelten): stark, bester Teil der Seite.
  Schwächen: Text-Reveal (s. o.), Trust-Dots doppeln die TrustStrip direkt
  darunter.
- **TrustStrip:** ok (Marquee).
- **NameShowcase** (echte Videos Pinsel/Ink-Guss): echte Markenmomente, gut.
  Videos = Gewicht (s. o.).
- **Galerie** (wischbare Slideshow, Pastell-Mats): Werke wirken. ABER: massive
  Leerfläche unter kurzen Cards (Container so hoch wie höchste Card) — wirkt
  kaputt. Nur „Anfragen →“-Textlink als Ziel.
- **OnRequest:** klar, gute Chips. CTAs ok.
- **WordsBand (مَوَدَّة):** ruhig, schön.
- **HowItWorks:** klar, viel Weißraum, ok.
- **Occasions:** Karten je Farbwelt (gut), aber „Gestalten →“ = kleiner Textlink
  und **kein Preset** — Eid-Klick lädt keinen Eid-Kontext in den Konfigurator.
- **FullBleedMoment:** stimmungsvoll, viel Leerraum unten.
- **AtelierTeaser:** Video ist **echt** (reale Herzen, echte Namen خوله/أفضل أم —
  kein KI-Bild, Anfangsverdacht widerlegt). Section gut.
- **Voices:** Founder-Versprechen gut — aber Zeile **„ECHTE KUNDENSTIMMEN FOLGEN
  IN KÜRZE“ = Baustellen-Schild**, muss raus (ehrliche Fakten statt Ankündigung).
- **FAQ:** gut & ehrlich. Letzte Zeile kollidiert mit Sticky-CTA.
- **CtaBanner:** gut (dunkel + Gold), große Leerfläche darunter.
- **Footer:** vollständig (Impressum/AGB/Datenschutz verlinkt), wird vom
  Sticky-CTA überdeckt. „in scha Allah“-Schreibweise vereinheitlichen.

## P2 — Konfigurator-Flow (E2E durchgespielt)

- 6 Schritte + Modal + Bestellformular = lang, aber logisch. Größter Bruch:
  **Vorschau scrollt auf Mobile aus dem Sichtfeld** — genau beim Stil-/Farb-Wahl
  sieht man das Herz nicht mehr. → sticky Mini-Preview auf Mobile.
- **Default-Schrift „Aref Ruqaa Ink“ malt ROT-orange**, Hero zeigt schwarz
  (Hero setzt `fontId: arefInk`, rendert selbst aber schwarz). Rot auf Rosé/
  Lavendel wirkt fremd. → Default „aref“ (schwarz), Ink als bewusste Option.
- „In arabischer Kalligrafie: مريم“-Badge IST ein Button, sieht aber nicht
  klickbar aus (kein Affordance-Signal).
- Disclaimer-Modal: inhaltlich top (Unikat/Widerruf/Zeit), Fade-in etwas lang.
- /bestellung: Formular sauber, Consents korrekt (AGB + DSGVO), Empty-State ok.

## Rechtliches (DE)

- Impressum: echt bis auf E-Mail (P0) + „Kleinunternehmer § 19 bitte bestätigen“-PH.
- Datenschutz: PH-Marker (E-Mail 2×, AVV-Hinweise, Fristen) — sichtbar für Kund:innen.
- AGB: PH-Marker (Versandkosten, Zahlungsarten, Gerichtsstand).
- Widerruf: korrekt als Ausschluss (§ 312g Abs. 2 Nr. 1 BGB) in AGB/FAQ/Modal +
  Checkbox vor Anfrage. Kein separater Widerrufs-Seiten-Bedarf für v1 (Anfrage-
  Modell, kein Fernabsatz-Kauf im Checkout). Preise: „ab 29 €“ + Versandhinweis ok.
- **metadataBase = kalligraphie.example (Platzhalter)** → echte Prod-URL setzen.
- **Kein OG-Image, kein robots.ts/sitemap.ts** → WhatsApp/Insta-Link-Vorschau leer.

## Platzhalter-Inventur

| Stelle | Fund | Aktion |
|---|---|---|
| Voices | „Echte Kundenstimmen folgen in Kürze“ | ersetzen (echte Fakten) |
| Impressum/Datenschutz | „PLATZHALTER: E-Mail“ ×3 | echte Mail |
| AGB/Datenschutz | PH Versand/Zahlung/Fristen/AVV | konkret füllen (konservativ) |
| layout.tsx | metadataBase example-Domain | Prod-URL |
| content.ts | BRAND.email, tiktok `[@deinhandle]` | Mail setzen; TikTok raus solange leer |
| Voices figcaption | „PLATZHALTER: Name“ (Kommentar) | Founder-Name |
| options.ts | „PLATZHALTER: Preise justieren“ (Kommentar) | bleibt (Founder) |
| ValuesStatement | Flag-ausgeblendet (Teil E) | bleibt aus |
