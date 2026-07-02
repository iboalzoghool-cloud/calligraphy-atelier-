# ENDBERICHT · Übernacht-Session 2026-07-02

Guten Morgen, Brahim. Die Nacht in einem Satz: **Der Anfrage-Flow verliert
keine Leads mehr, die Seite ist rechtlich sauber, doppelt so schnell und
mobil überall verifiziert** — 12 Commits, alles auf `main` gepusht (Vercel
deployt automatisch).

## Was sich geändert hat (Section für Section)

**Hero** — lädt jetzt sofort (CSS-Animation statt JS-Reveal; vorher stand die
Seite unter 4G-Drossel 12 Sekunden „leer“). Doppelte Trust-Dots raus (die
TrustStrip direkt darunter sagt dasselbe). Herz-Texturen als WebP. Farbwelt-
Swatches auf 44 px Tap-Größe.

**Galerie** — die großen Löcher unter kurzen Karten sind weg: jedes Werk
sitzt unbeschnitten auf einer einheitlich hohen Pastell-Bühne seiner
Werkfarbe. Die ganze Karte ist jetzt Tap-Ziel, nicht nur „Anfragen →“.

**Anlässe** — Eid/Muttertag/Hochzeit/Geburt sind echte Einstiege: Klick lädt
Farbwelt + passenden Spruch vor und springt direkt zum Namens-Schritt
(`/gestalten?anlass=eid` …). Farbwelt folgt dem Karten-Akzent.

**Atelier-Teaser** — dein Video ist echt und bleibt (mein anfänglicher
KI-Verdacht war falsch — خوله، أفضل أم). Das Three.js-WebGL-Ambiente dahinter
habe ich durch reines CSS ersetzt: gleicher Tinten-Look, 0 KB JavaScript.

**Unser Versprechen (Voices)** — „Echte Kundenstimmen folgen in Kürze“ ist
raus. Stattdessen: dein Zitat mit Namen („Ibrahim · das Atelier hinter …“)
und drei ehrliche Fakten (seit dem 16. Lebensjahr, jedes Stück einzeln,
Atelier in Offenbach). Keine erfundenen Reviews — Regel gehalten.

**Sticky-CTA (mobil)** — neu gebaut: kompakt, iPhone-Safe-Area, erscheint
nach dem Hero, verschwindet am Footer, reserviert eigenen Scroll-Platz.
Verdeckt nachweislich nirgends mehr Content (Footer-Rechtslinks inklusive).

**Konfigurator** — die Vorschau bleibt auf dem Handy jetzt sticky sichtbar,
während man Farbwelt/Stil/Spruch wählt (vorher scrollte das Herz weg — genau
im Entscheidungsmoment). Default-Schrift ist Schwarz (Aref Ruqaa) wie auf den
Hero-Herzen; der rot-orange „Ink“-Font bleibt Option. Der Arabisch-Vorschlag
(„Miriam → مريم“) ist jetzt ein klarer „Übernehmen“-Button. **Und: der
Entwurf überlebt Reload/App-Wechsel** (sessionStorage) — im TikTok-In-App-
Browser vorher ein Total-Verlust.

**Bestellung/Anfrage** — Ende-zu-Ende getestet (Konfigurator → Modal →
Formular → Versand → Bestätigung). Solange `RESEND_API_KEY` fehlt, sieht die
Kundin nach dem Absenden statt Dev-Jargon jetzt zwei ehrliche Rettungswege:
vorbefüllte E-Mail an dich + Instagram-DM (@iboverse). **Kein Lead geht mehr
verloren — aber bitte Blocker #1 erledigen (5 Minuten), dann läuft es
automatisch.**

**Rechtliches** — Impressum/Datenschutz/AGB ohne sichtbare Platzhalter: deine
E-Mail eingetragen, Vercel/Resend-Passagen, Speicherfristen, Versand- und
Zahlungsformulierungen konservativ konkretisiert. § 19-Kleinunternehmer-Zeile
steht — bitte bestätigen (Blocker #2).

**Teilen/SEO** — OG-Bild aus deinem echten Werkfoto („Dein Name, in Tinte
verewigt.“) — WhatsApp/Insta-Links zeigen jetzt Kunst statt Leere. Echte
Domain als metadataBase, robots.txt + sitemap.xml, Twitter-Card.

## Zahlen (Lighthouse mobil, Prod-Build, throttled)

| Seite | vorher | nachher |
|---|---|---|
| Landing | Perf **44** · A11y 96 | Perf **85** · A11y **100** · BP 100 · SEO 100 |
| /gestalten | Perf **59** | Perf **96** · A11y 96 · SEO 100 |
| LCP Landing | 12,2 s | 4,4 s (Messartefakt Logo-Font-Swap, s. DECISIONS #13) |
| Blocking Time | 1 420 ms | **0 ms** |
| Übertragen | ~2 MB | ~1,1 MB (Fonts 799→~150 KB) |

## Entscheidungen & offene Punkte

Alle Entscheidungen mit Begründung: **DECISIONS.md** (13 Einträge).
Was nur du erledigen kannst: **BLOCKERS.md** — Kurzfassung:
1. Resend-Key + `ORDER_TO` auf Vercel setzen (5 Min) → automatischer Mailversand.
2. Kleinunternehmer-Status (§ 19) bestätigen.
3. Eigene Domain, sobald vorhanden, in `layout.tsx` tauschen.
4. Markenname entscheiden („Kalligraphie.“ ist generisch).
5. Echte Fotos der Veredelungen für die Upsell-Visualisierung.

## Ehrliche Launch-Beurteilung

**Note: 2+** (vorher: 4−). Ja, die Seite ist bereit für den ersten
TikTok-Traffic: Sie lädt schnell, sieht auf 390 px durchgehend gewollt aus,
erzählt ehrlich von echter Kunst, und jede Anfrage findet einen Weg zu dir —
selbst ohne konfigurierten Mailversand. Was zwischen 2+ und 1 steht, ist
nichts Technisches: ein echter Markenname statt „Kalligraphie.“, der
Resend-Key (damit Anfragen automatisch ankommen) und mittelfristig die ersten
echten Kundenstimmen. **Der eine nächste Hebel:** Blocker #1 heute Morgen
erledigen und dann ein erstes TikTok-Video, das auf `/gestalten?anlass=eid`
zeigt — der Weg vom Video zur persönlichen Vorschau ist jetzt zwei Taps kurz.
