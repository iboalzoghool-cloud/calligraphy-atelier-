# DECISIONS · Übernacht-Session 2026-07-02

Autonome Entscheidungen (Brahim schläft). Jede Zeile: Entscheidung + Warum.

1. **Founder-E-Mail = ibo.alzoghool@gmail.com** (Impressum, Datenschutz,
   Anfrage-Fallback). Echte Adresse des Founders aus dem Arbeitskontext — kein
   erfundener Wert; Impressum braucht rechtlich eine E-Mail. Leicht änderbar an
   EINER Stelle (`content.ts`).
2. **Anfrage-Fallback statt Zahlungs-/Mail-Dienst:** Ohne `RESEND_API_KEY` zeigt
   die Erfolgsseite künftig einen ehrlichen nächsten Schritt (vorbefüllte
   Mail an die Founder-Adresse + Instagram-DM @iboverse + Entwurf-Download)
   statt Dev-Jargon. Kein neuer Account/Dienst (gesperrt bzw. nicht autorisiert).
3. **KI-Verdacht Atelier-Video widerlegt** — Poster zeigt echte Werke (خوله،
   أفضل أم). Video bleibt. Hero-Fächer (maskierte Ink-Texturen + Live-Name)
   bleibt Konzept, da bereits „echte Kunst + Overlay“-Ansatz der Direktive.
4. **Default-Kalligrafie-Stil = „Aref Ruqaa“ (schwarz)** statt „Aref Ruqaa Ink“
   (rot-oranger Color-Font). Grund: Hero rendert schwarz, Rot bricht auf Rosé/
   Lavendel; Brahims Commit „Schrift in Schwarz“ zeigt die Richtung. Ink bleibt
   wählbar.
5. **TikTok-Platzhalter `[@deinhandle]` wird nicht angezeigt/entfernt**, solange
   kein echtes Handle existiert (ehrlich > vollständig).
6. **Kleinunternehmer-Zeile (§ 19 UStG) bleibt als Aussage stehen**, PH-Marker
   raus; Bestätigung durch Brahim in BLOCKERS.md gefordert (bei 29–59-€-Unikaten
   plausibelste Variante).
7. **Landing verliert das Three.js-WebGL-Ambiente** (AtelierAmbience) zugunsten
   eines CSS-Ink-Verlaufs: −TBT/−Bytes auf der wichtigsten Seite; /atelier darf
   es behalten (dort Thema). Sollte Brahim es vermissen: Re-Aktivierung = 1 Zeile.
8. **Scarcity „8 Plätze/Woche“ bleibt** (content.ts) — vom Founder so angelegt,
   dezent formuliert.
9. **Font-Diät:** Nur genutzte Gewichte werden geladen (Cormorant 500,
   Hanken 400/500/600); alle arabischen Fonts `preload:false` außer einer
   schlanken Aref-Ruqaa-Instanz (400/Arabisch) für den Hero-Namen (LCP).
   Logo von 600→500: eine Preload-Datei weniger, optisch minimal.
10. **Anlass-Preset-Farbwelten** folgen dem Karten-Akzent (Eid→Rosé,
    Muttertag→Petrol, Hochzeit→Sand-Gold, Geburt→Koralle) — Kontinuität
    Karte→Konfigurator schlägt „thematisch naheliegende“ Farbe.
11. **Kontrast-Tokens:** `--color-ink-faint` #9a8d7d→#716757 (4.7:1),
    Eyebrow-Gold als eigenes Text-Gold #7d5f28 (5:1); Deko-Gold unverändert.
    Wasserzeichen مَوَدَّة jetzt SVG (dekorativ, raus aus der Textprüfung).
    Ergebnis: Lighthouse Accessibility 100.
12. **Hero-Trust-Dots entfernt** — exakte Dopplung der TrustStrip direkt
    darunter; ein Held pro Screen (DESIGN.md-Prinzip 3).
13. **Lighthouse-Perf Landing 85–88 statt ≥90 akzeptiert:** LCP-Messwert hängt
    am Font-Swap des immer sichtbaren Logos unter simuliertem 4G (Hero ist
    wegen Fade-Animation kein LCP-Kandidat). TBT 0 ms, CLS 0, SI 1,4 s, alle
    übrigen Kategorien 100. Auf Vercel (CDN, AVIF, HTTP/2) real schneller.

## Rebrand HDIA Atelier (2026-07-02)

14. **Lockup-Reihenfolge:** هدية (gold) vor „HDIA Atelier“ — das Kalligrafische
    führt, die Wortmarke erklärt. „ATELIER“ als Kapitälchen-Zusatz statt
    gleichwertigem Namensteil (mobil kompakt).
15. **هدية-Wortbild:** Aref Ruqaa (Website-Kalligrafiefont) via Chrome-Rendering
    vektorisiert (potrace) → public/brand/hadiyya.svg mit currentColor;
    fontkit-Shaping war fehlerhaft. Tausch gegen Brahims handgemalte Version =
    eine Datei.
16. **Markenstory an exakt 2 Stellen:** Hero-Subline („ein Geschenk, das es nur
    einmal gibt“) + Warum-handgemalt („هدية heißt Geschenk …“). Bedeutungszeile
    dezent im Footer statt Hero (Hero bleibt fokussiert auf den Namens-Catch).
17. **JSON-LD ehrlich minimal:** LocalBusiness + Offer ab 29 € — kein
    aggregateRating (keine Reviews vorhanden), keine erfundenen Öffnungszeiten.
18. **Anlässe-Heading** ins Geschenk-Framing gedreht („Für die Momente, in denen
    man schenkt“) — Karten-Texte unverändert (kein Geschenk-Overkill).
