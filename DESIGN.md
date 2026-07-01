# Design-System — Kalligrafie-Atelier

> Das verbindliche Fundament. Neue UI baut **strikt** hierauf auf – kein Ad-hoc-Erfinden
> pro Sektion. Quelle der Tokens: `src/app/globals.css` (`@theme`). Mobil-first (390px).

## Prinzipien
1. **Ruhig, edel, handgemacht** – nie steril/Template. Weißraum zwischen den Momenten.
2. **Eine dominante Farbe pro Kapitel**, abgeleitet aus dem echten Werk, verbunden durch die
   Creme-Basis. Kein Regenbogen.
3. **Das Visuelle führt**, Text stützt. Ein Held pro Screen.
4. **Bewegung: Apple-smooth, nicht laut** – spring/eased, GPU-günstig, in-view-gated,
   `prefers-reduced-motion`-safe.
5. **Echte Kunst > KI.** Galerie-Fotos sind der Markenkern.

## Farbe
Basis & Tinte (Tokens):
- `--color-canvas` `#f3ecdc` (Pergament) · `--color-surface` `#fbf7ee` · `--color-paper-2` `#fbf6ea`
- `--color-ink` `#241d15` · `--color-ink-soft` `#6a6053` · `--color-ink-faint` `#9a8d7d`
- `--color-line` `#ded6c6` · `--color-line-strong` `#cfc4b0`

Akzente (sparsam, gold als „precious"):
- `--color-gold` `#a9823b` · `--color-gold-soft` `#c6a25a`
- `--color-rose` `#b25e77` / `-deep` `#984861` / `-soft` `#f2e2e7`
- `--color-teal` `#3f6b6e` · `--color-terra` `#b67a56` · `--color-plum` `#5d3f57`

**Werk-Farbwelten → Pastell-Ableitung für Flächen** (aus den echten Fotos gezogen; je Kapitel
EINE nutzen, entsättigt in die Fläche gemischt, `color-mix(in srgb, <accent> ~14–18%, #fbf7ee)`):

| Farbwelt      | Werk-Akzent | Beispiel-Stück            |
|---------------|-------------|---------------------------|
| Türkis-Gold   | `#2f8f96`   | Allah · Muhammad          |
| Rosa-Gold     | `#c85f86`   | Herz „Für Mama"           |
| Magenta-Rosé  | `#cf5f97`   | Namens-Quadrat            |
| Lavendel-Gold | `#8a5f77`   | Zuneigung & Ruhe / Merieh |
| Petrol        | `#3f7d7f`   | Zwei Namen (Doppel)       |
| Terracotta    | `#a9744f`   | „Nach jeder Härte"        |
| Sand/Gold     | `#a9823b`   | Staffelei-Motive          |

Regel: Akzent = Punkt/Kante/CTA-Farbe; Fläche = entsättigte Pastell-Version; Text bleibt Ink.

## Typografie
- **Display-Serife:** Cormorant Garamond (`--font-display`) – Headlines, editorial.
- **UI-Sans:** Hanken Grotesk (`--font-sans`) – Fließtext/UI.
- **Arabische Kalligrafie** (Nutzer wählt Stil): Aref Ruqaa Ink/Aref Ruqaa (Ruqʿah), Amiri
  (Naskh), Reem Kufi (Kufi), Gulzar (Nastaliq). Vars `--font-aref`, `--font-amiri`, …
- **Arabisch immer** RTL, korrekte Ligaturen, Kalligrafie-Font – nie System-Fallback.
  Latein → nach Möglichkeit als arabische Kalligrafie (Transliteration, s. `lib/configurator/translit.ts`).

## Form-Tokens
- Radius: `--radius-xs 6 · sm 10 · md 14 · lg 20 · xl 28`px
- Schatten: `--shadow-soft`, `--shadow-lift`
- Motion: `--ease-out-soft` (Reveal), `--ease-ink` (organisch), `--dur-fast .3s · mid .6s · slow .95s`

## Motion-Vokabular
`FloatingFrame` (Schweben/Kippen 3D), `Reveal`/`InkReveal` (gestaffelt, blur→scharf),
`swash-draw` (Kalligrafie-Schwung), `animate-drift/breathe/floaty`, Three.js-Ink-Ambiente.
Alle reduced-motion-safe. Kein 360°-Dreh (Rückseite leer) – nur kippen/schweben.

## Review-Gates
Jedes Kapitel gegen `.claude/agents/` prüfen: **apple-architecture** (Katch/Hierarchie/Perf),
**pastel-artist** (Werkfarbe→UI, Textur, edel), **muslim-conversion** (Arabisch korrekt,
Anlässe, CTA, würdevoll). Jeder mit Veto.
