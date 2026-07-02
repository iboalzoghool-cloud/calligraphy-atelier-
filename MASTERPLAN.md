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
- [ ] **P4 · Rechtliches platzhalterfrei**: Impressum/Datenschutz/AGB ohne
      sichtbare PH-Marker; E-Mail echt; konservative Formulierungen.
- [ ] **P5 · LCP-Fix**: Hero (Landing + /gestalten) nicht mehr JS-gated;
      Reveal above-the-fold sofort sichtbar; CSS-Entrance statt Opacity-0-Falle.
- [ ] **P6 · JS-Diät**: Three.js von Landing runter (CSS-Ambiente),
      framer-motion via LazyMotion/kleinere Reveals, Bundle prüfen.
- [ ] **P7 · Bilder & Videos**: worlds/Poster/Atelier-JPGs → next/image bzw.
      vorskalierte WebP; Videos preload="none"+poster; Ziel LH-Perf ≥ 90.
- [ ] **P8 · Galerie-Bühne**: Leerflächen weg (einheitliche Bühne), Cards
      voll tappbar.
- [ ] **P9 · Occasions-Presets**: Karte = Link mit Preset (Eid → Spruch عيد مبارك
      + Farbwelt), ganze Karte Tap-Ziel ≥ 52 px.
- [ ] **P10 · Konfigurator-Polish**: Default-Font schwarz (aref), Arabisch-Badge
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
