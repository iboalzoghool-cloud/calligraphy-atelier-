import Link from "next/link";
import { Logo } from "./Logo";
import { BRAND } from "@/lib/content";
import { EDITIONS_LIVE } from "@/lib/shop/config";

export function Footer() {
  const igHandle = BRAND.instagram.replace(/^@/, "");
  const igUrl =
    igHandle && !igHandle.startsWith("[")
      ? `https://instagram.com/${igHandle}`
      : undefined;
  const showEmail = Boolean(BRAND.email) && !BRAND.email.startsWith("[");

  return (
    <footer className="mt-24 border-t border-line bg-canvas">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            {/* Bedeutungszeile – die Marke in einem Atemzug erklärt */}
            <p className="mt-3 text-sm tracking-wide text-ink-faint">
              {BRAND.meaning}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              {BRAND.promise}
            </p>
            {/* PLATZHALTER: Ort, an dem gemalt wird */}
            <p className="mt-4 text-sm text-ink-faint">
              Handgemalt in {BRAND.city}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-ink">Entdecken</h3>
            <ul className="mt-4 space-y-3 text-sm text-ink-soft">
              <li>
                <Link href="/gestalten" className="transition-colors hover:text-ink">
                  Konfigurator
                </Link>
              </li>
              <li>
                <Link href="/#galerie" className="transition-colors hover:text-ink">
                  Galerie
                </Link>
              </li>
              {EDITIONS_LIVE ? (
                <li>
                  <Link href="/#editionen" className="transition-colors hover:text-ink">
                    Editionen
                  </Link>
                </li>
              ) : null}
              <li>
                <Link href="/atelier" className="transition-colors hover:text-ink">
                  Atelier
                </Link>
              </li>
              <li>
                <Link href="/#anlaesse" className="transition-colors hover:text-ink">
                  Anlässe
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="transition-colors hover:text-ink">
                  Häufige Fragen
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-ink">Rechtliches</h3>
            <ul className="mt-4 space-y-3 text-sm text-ink-soft">
              <li>
                <Link href="/impressum" className="transition-colors hover:text-ink">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/agb" className="transition-colors hover:text-ink">
                  AGB
                </Link>
              </li>
              <li>
                <Link href="/widerruf" className="transition-colors hover:text-ink">
                  Widerruf
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="transition-colors hover:text-ink">
                  Datenschutz
                </Link>
              </li>
            </ul>
            <div className="mt-6 space-y-2 text-sm">
              {igUrl ? (
                <a
                  href={igUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-ink"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
                    <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
                  </svg>
                  {BRAND.instagram}
                </a>
              ) : null}
              {showEmail ? (
                <p className="text-ink-faint">
                  <a href={`mailto:${BRAND.email}`} className="hover:text-ink">
                    {BRAND.email}
                  </a>
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {BRAND.name}. Jedes Stück ein Unikat.
          </p>
          <p>Mit Liebe handgemalt, in scha Allah.</p>
        </div>
      </div>
    </footer>
  );
}
