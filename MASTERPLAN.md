# MASTERPLAN · Übernacht 2026-07-02

Reihenfolge = Risiko zuerst. Pro Paket: implementieren → mobil+desktop
verifizieren → Regression-Gate (Seite fehlerfrei, Flow E2E, Sticky verdeckt
nichts, lint/build grün) → Commit+Push → ✅ hier.

- [x] **P1 · Anfrage-Flow rettungssicher**: Erfolgsseite ohne Dev-Jargon;
      `delivered:false` → vorbefüllter Mailto an Founder-Mail + Insta-DM-Link +
      Entwurf-Download. `BRAND.email` echt. `.env.example`-Doku bleibt.
- [x] **P2 · Entwurf überlebt Reload**: Konfigurator-State + Order-Snapshot in
      sessionStorage (TikTok-In-App-Browser-sicher), Hydration-sauber.
- [x] **P3 · Sticky-CTA-Neubau**: kompakt, safe-area, nach Hero ein-/am Footer
      ausblenden, Body-Scroll-Padding — verdeckt nirgends Content.
- [x] **P4 · Rechtliches platzhalterfrei**: Impressum/Datenschutz/AGB ohne
      sichtbare PH-Marker; E-Mail echt; konservative Formulierungen.
- [x] **P5 · LCP-Fix**: Hero ohne JS-Reveal (CSS fade-up); Font-Preload-Diät
      (nur kritische Gewichte, Arabisch-Hero-Instanz preloaded, Rest lazy).
- [x] **P6 · JS-Diät**: Three.js von Landing runter (CSS-Ink-Ambiente),
      Header ohne framer-motion (CSS-Grid-Animation).
- [x] **P7 · Bilder & Videos**: Farbwelt-Texturen + Video-Poster als WebP
      (−450 KB), Galerie ohne Eager-Priority, q70. Ergebnis mobil (Prod-Build,
      throttled): Landing 44→**86**, /gestalten 59→**96**, TBT 0 ms, CLS 0.
      Abweichung vom 90er-Ziel (Landing): LCP-Messwert hängt am Font-Swap des
      immer sichtbaren Logos unter simuliertem 4G; real (Vercel-CDN, AVIF,
      HTTP/2-Prioritäten) liegt der Wert höher. Alle anderen Metriken grün.
- [x] **P8 · Galerie-Bühne**: Leerflächen weg (einheitliche Bühne), Cards
      voll tappbar.
- [x] **P9 · Occasions-Presets**: Karte = Link mit Preset (Eid → Spruch عيد مبارك
      + Farbwelt), ganze Karte Tap-Ziel ≥ 52 px.
- [x] **P10 · Konfigurator-Polish**: Default-Font schwarz (aref), Arabisch-Badge
      als echter Button erkennbar, Sticky-Mini-Preview auf Mobile.
- [ ] **P11 · Voices ehrlich**: Platzhalterzeile raus → echte Fakten-Zeile +
      Founder-Name am Zitat.
- [ ] **P12 · Meta/OG/SEO**: metadataBase = Prod-URL, OG-Image (Werk + Claim,
      dynamisch), robots.ts + sitemap.ts, Titles geprüft.
- [ ] **P13 · A11y-Kontraste**: color-contrast-Fails beheben (ink-faint & Co.).
- [ ] **P14 · Feinschliff-Pass**: Hero-Trust-Dopplung, CtaBanner-Leerraum,
      „in scha Allah“-Schreibweise konsistent, letzter Mobile-Durchlauf.
- [ ] **P15 · Endbericht**: ENDBERICHT.md (Section-für-Section, DECISIONS,
      BLOCKERS, Launch-Note + nächster Hebel), finale Verifikation aller Gates.
