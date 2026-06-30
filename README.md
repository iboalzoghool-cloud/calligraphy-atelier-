# Kalligraphie

Hochwertiger Vorschau-Konfigurator + Bestellsystem für handgemalte
Kalligrafie-Unikate. Die Komposition entsteht **clientseitig** im Browser
(HTML-Canvas + Google-Kalligrafie-Fonts) – **keine** Live-KI, **keine**
bezahlten APIs nötig. Läuft auf dem **Vercel Free Tier**.

> Jedes Stück wird von Hand gemalt. Die Website ist ein Vorschau- &
> Bestellwerkzeug, **kein** Produktionstool.

---

## Schnellstart

```bash
npm install
npm run dev
# http://localhost:3000
```

Weitere Skripte:

```bash
npm run build     # Produktions-Build
npm run start     # Build lokal starten
npm run lint      # ESLint
```

## Tech-Stack

- **Next.js 15** (App Router) · TypeScript · **Tailwind CSS v4**
- **Framer Motion** (3D-Dreheffekt der Vorschau, Microinteractions)
- **Google Fonts** via `next/font`: Aref Ruqaa, Amiri, Reem Kufi, Lateef
  (arabische Kalligrafie) + Cormorant Garamond (Display) + Inter (UI)
- Bestellungen v1: Formular → **E-Mail** (Resend, kostenloses Kontingent).
  Stripe ist über ein **Adapter-Pattern** für Phase 2 vorbereitet.
- **Keine Datenbank**, **kein** Browser-Storage – Konfig-State liegt im
  React-State (Context).

---

## Projektstruktur (Kurzüberblick)

```
public/
  backgrounds/   ← Foto-Hintergründe für den Konfigurator (textfreie Ink-Scans)
  gallery/       ← Bilder echter Stücke für die Galerie auf der Startseite
src/
  app/
    page.tsx               Startseite (Hero, Galerie, Ablauf, Anlässe, FAQ, CTA)
    gestalten/             Konfigurator (Kern)
    bestellung/            Bestellformular + Bestätigung
    impressum|agb|datenschutz/   Rechtstexte mit Platzhaltern
    api/order/route.ts     Bestell-Endpoint (E-Mail via Resend)
  components/
    configurator/          Preview-Canvas (3D), Stepper, Schritte, Disclaimer
    landing/  order/  site/  ui/  legal/
  lib/
    configurator/  options.ts  render.ts (Canvas-Engine)  context.tsx  …
    checkout/      Adapter (email aktiv, stripe = Phase-2-Stub)
    content.ts     ← zentrale Inhalte & Platzhalter (PREISE, TEXTE, KONTAKT)
    fonts.ts       ← Schriften
```

---

## Wo der Founder Inhalte einsetzen muss

Alle Platzhalter sind klar markiert:

- **`src/lib/content.ts`** – Markenname, Kontakt, Ort, **Veredelungs-Preise**
  (`PRICING`: `saying`, `gold`, `gift`, `card`, `express`, `date`),
  **Bearbeitungszeit** (`PROCESSING_TIME`), **Verknappung** (`SCARCITY`), FAQ,
  Anlässe, Disclaimer.
- **Größen & Grundpreise**: `SIZES` in `src/lib/configurator/options.ts`
  (Herz Ø 29; Quadrat 20/30/30×40/40 cm – Preis & Vorschau-Proportion hängen an
  der Größe).
- **Veredelungen/Upsells**: Katalog `ADDONS` in `options.ts`; für Geschenk-/
  Grußkarten-Vorschau optional `image:"/veredeln/…"` setzen (Foto in
  `public/veredeln/` ablegen).
- **Kalligrafie-Schriften**: `src/lib/fonts.ts` (`CALLIGRAPHY_FONTS`) – Aref
  Ruqaa Ink, Aref Ruqaa, Amiri, Reem Kufi, Gulzar.
- **Statement-Block** (Werte/Solidarität): `src/components/landing/ValuesStatement.tsx`
  – standardmäßig **aus** (`SHOW_STATEMENT = false`). Bewusst selbst aktivieren.
- **Atelier-Story**: `src/app/atelier/page.tsx` (starke Entwürfe + `[PLATZHALTER]`
  für deine persönliche Geschichte).
- **Rechtstexte** unter `src/app/impressum|agb|datenschutz/` – jede `[…]`-Stelle
  ist im UI rosa markiert. **Vor dem Launch anwaltlich prüfen lassen.**
- **Galerie**: Bildliste in `src/components/landing/Gallery.tsx`.
- **Kundenstimmen**: ehrlich als Platzhalter markiert in
  `src/components/landing/Voices.tsx` (`TESTIMONIALS`-Array füllen, sobald echte
  Stimmen vorliegen – **keine Fake-Reviews**).

### Hintergründe & Farbwelten

Die Farbwelten sind handgemalte **Ink-Texturen** (`public/backgrounds/worlds/`),
definiert in `src/lib/configurator/options.ts` (`BACKGROUNDS`). Die Render-Engine
**maskiert eine Textur in Herz ODER Quadrat** – es braucht also **keine separaten
Herz-Assets**.

> ⚠️ **Hi-Res nachliefern:** 7 der 9 Texturen stammen aktuell aus niedrig
> aufgelösten Vorlagen (~330 px). Für gestochen scharfe PNG-Mockups bitte
> **hochauflösende, quadratische, textfreie** Versionen (≥ 1400 px) mit
> **denselben Dateinamen** nach `public/backgrounds/worlds/` legen
> (`rose.jpg`, `blush-gold.jpg`, `magenta-gold.jpg`, `mauve.jpg`,
> `lavendel-gold.jpg`, `koralle.jpg`, `sand-gold.jpg`, `petrol-gold.jpg`,
> `navy-gold.jpg`).

**Neue Farbwelt hinzufügen:** quadratisches, textfreies Foto nach
`public/backgrounds/worlds/` legen und in `BACKGROUNDS` ergänzen:

```ts
{ id: "mein-scan", kind: "photo", label: "Mein Scan", src: "/backgrounds/worlds/mein-scan.jpg" }
```

Galerie-Bilder einfach nach `public/gallery/` legen und in `Gallery.tsx`
referenzieren.

---

## E-Mail-Versand einrichten (Bestellungen)

Ohne Konfiguration läuft der Bestell-Flow durch, die Anfrage wird aber **nicht**
zugestellt (es erscheint ein Hinweis auf der Bestätigungsseite).

1. Kostenloses Konto bei **[resend.com](https://resend.com)** anlegen, API-Key
   erzeugen.
2. `.env.example` nach `.env.local` kopieren und ausfüllen:

```bash
cp .env.example .env.local
```

```
RESEND_API_KEY=re_xxx
ORDER_TO=deine@email.de
ORDER_FROM="Kalligraphie <bestellung@deine-domain.de>"   # Domain bei Resend verifizieren
```

Zum reinen Testen funktioniert `ORDER_FROM="Kalligraphie <onboarding@resend.dev>"`.

Die Bestell-E-Mail enthält die komplette Konfiguration **und das PNG-Mockup als
Anhang**.

---

## Deployment (Vercel Free Tier)

1. Repository zu GitHub pushen.
2. Auf **[vercel.com](https://vercel.com)** importieren (Framework wird als
   Next.js erkannt – keine Konfiguration nötig).
3. Unter **Settings → Environment Variables** die Werte aus `.env.local` setzen
   (`RESEND_API_KEY`, `ORDER_TO`, `ORDER_FROM`).
4. Deploy. Fertig.

> Alternativ lokal: `npx vercel` (CLI). `metadataBase` in
> `src/app/layout.tsx` auf die echte Domain anpassen.

---

## Phase 2 (vorbereitet, bewusst nicht aktiv)

Mit `// TODO: Phase 2` im Code markiert:

- **Stripe-Checkout** – Adapter liegt unter `src/lib/checkout/stripe-adapter.ts`.
  Aktivierung über `getCheckoutAdapter()` in `src/lib/checkout/index.ts`; die UI
  muss dafür nicht geändert werden.
- **Echte Domain** (`metadataBase`), echte Rechtstexte, echte Kundenstimmen.

---

## Hinweise zur Qualität

- Mobile-first, getestet auf schmalen Breiten; Touch-freundliche Galerie & Steps.
- Respektiert `prefers-reduced-motion` (Animationen & 3D-Tilt werden reduziert).
- Canvas-Export via `canvas.toDataURL('image/png')` (same-origin, untainted).
