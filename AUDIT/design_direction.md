# Design-Direktive · Übernacht-Session (baut auf DESIGN.md auf)

DESIGN.md bleibt das Fundament (Tokens, Farben, Typo, Motion). Diese Direktive
übersetzt Brahims Urteil („steril & flach, die Kunst kommt nicht rüber“) in
konkrete Eingriffe dieser Session — mobil zuerst, 90 % TikTok/Insta-Traffic.

## 1 · Farben aus der Kunst (konsequent, nicht ansatzweise)
- Jede Section trägt EINE Werk-Farbwelt als Pastell-Fläche (`color-mix ~14–18 %`),
  Akzent nur als Punkt/Kante/CTA (Tabelle in DESIGN.md).
- Galerie-Cards & Anlass-Karten behalten ihre Werk-Bindung; Leerflächen der
  Galerie beseitigen (einheitliche Card-Bühne statt Container-Max-Höhe).
- Dunkle Akzent-Momente (Voices, CtaBanner) = Tinten-Dunkel `#241d15` + Gold —
  bleiben die zwei „Edel-Anker“ der Seite.

## 2 · Echte Kunst nach vorn
- Hero-Fächer bleibt (echte Ink-Texturen + Live-Name = Direktive „Foto+Overlay“).
- Atelier-Video (echt, خوله/أفضل أم) bleibt prominent; Prozess-Videos
  (Pinsel, Tinten-Guss) bleiben im NameShowcase — sie SIND die Marke.
- Kein KI-Bild irgendwo; nichts erfinden. Upsell-Visualisierung wartet auf
  echte Fotos (BLOCKERS #5).

## 3 · Textur & Tiefe
- PaperTexture (noise) bleibt global; Ink-Splashes bleiben, aber GPU-arm.
- Section-Übergänge: weiche Ink-Verlauf-Kanten (CSS-Gradients statt WebGL auf
  der Landing — Performance-Entscheidung DECISIONS #7).
- Parallax/Reveal: dezent, 60 fps, `prefers-reduced-motion` respektiert.
  NEU: Above-the-fold rendert IMMER sofort sichtbar (kein JS-gated Reveal) —
  Reveal nur unterhalb des ersten Viewports.

## 4 · Typografie mit Seele
- Cormorant Garamond (Display) + Hanken Grotesk (UI) bleiben.
- Arabische Akzent-Wörter (مودة، من القلب، عيد مبارك …) bleiben Identität;
  Kalligrafie-Namen standardmäßig in Tinten-SCHWARZ (Aref Ruqaa), „Ink“-Color-
  Font nur als bewusste Wahl.
- Kontraste: Textfarben ≥ 4.5:1 (A11y-Fix), Gold nur für Deko/Eyebrows ≥ 3:1.

## 5 · Mobile-Daumen-Regel
- Haupt-CTAs ≥ 52 px hoch, volle Breite auf Mobile; EIN Haupt-CTA pro Viewport.
- Sticky-Bar neu: kompakt (eine Zeile), `env(safe-area-inset-bottom)`,
  erscheint nach dem Hero, verschwindet am Footer, verdeckt nie Content
  (Scroll-Padding am Body).
- Occasions-Karten: ganze Karte = Tap-Ziel, führt in vorkonfigurierten
  Konfigurator (Eid → Eid-Spruch + Farbwelt vorgeladen).

## 6 · Konversion
- Hero-Namensfeld bleibt der Catch; danach max. 2 Entscheidungen bis zur
  Anfrage sichtbar machen (Sticky-Mini-Preview im Konfigurator, damit das Herz
  bei jeder Wahl sichtbar bleibt).
- Vertrauen = echte Fakten statt Platzhalter: „Seit dem 16. Lebensjahr an der
  Feder · jedes Stück einzeln gemalt in Offenbach · unverbindliche Anfrage“ +
  Founder-Zitat + Prozess-Videos. Keine erfundenen Reviews (harte Regel).
- Anfrage-Erfolg: nächster Schritt IMMER klar (Mail-Fallback/DM), nie Dev-Sprech.
