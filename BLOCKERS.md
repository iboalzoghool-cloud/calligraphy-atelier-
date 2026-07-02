# BLOCKERS · braucht Brahim (kann die Session nicht selbst lösen)

0. **Shop scharf schalten (Stripe-TESTMODUS, ~10 Min):**
   - stripe.com → Testmodus → `STRIPE_SECRET_KEY` (sk_test_…) als Vercel-Env.
   - Webhook-Endpoint anlegen: `https://<domain>/api/stripe-webhook`,
     Event `checkout.session.completed` → `STRIPE_WEBHOOK_SECRET` setzen.
   - Testkauf mit Karte 4242 4242 4242 4242 durchspielen.
   - **Live-Schaltung erst nach juristischer Prüfung der Rechtstexte
     (AGB/Widerruf sind ENTWÜRFE) + eigener Entscheidung** — der Code
     akzeptiert bewusst nur Test-Keys; für Live einmal melden.
   - Für Editionen: Gelato-Konto + ein Probedruck pro Motiv (Farbtreue!).
1. **E-Mail-Zustellung der Anfragen scharf schalten (5 Min):**
   - resend.com-Konto anlegen (kostenlos), API-Key erzeugen.
   - Auf Vercel (Projekt calligraphy-atelier) Env-Vars setzen:
     `RESEND_API_KEY`, `ORDER_TO=ibo.alzoghool@gmail.com`
     (optional `ORDER_FROM` nach Domain-Verifizierung).
   - Bis dahin: Site nutzt den eingebauten Fallback (vorbefüllte Kunden-Mail an
     dich + Instagram-DM) — es geht kein Lead verloren, aber automatische
     Zustellung ist besser.
2. **Kleinunternehmer-Status bestätigen** (Impressum sagt § 19 UStG — falls du
   umsatzsteuerpflichtig bist: USt-IdNr. eintragen).
3. **Echte Domain** (aktuell calligraphy-atelier.vercel.app als metadataBase
   gesetzt): sobald eigene Domain existiert, in `src/app/layout.tsx` ändern.
4. ~~Markenname~~ ✅ **Gelöst: HDIA Atelier** (هدية). Offen bleibt nur:
   Brahims handgemalte هدية-Version → ersetzt `public/brand/hadiyya.svg`
   (Ein-Datei-Tausch).
5. **Echte Fotos der Veredelungen** (`/public/upsells/`: Geschenkverpackung,
   Grußkarte, Goldakzente) — Upsell-Sektion visualisiert erst dann (KI-Regel:
   echte Kunst > generiert).
