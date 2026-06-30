import Link from "next/link";
import { Logo } from "./Logo";
import { BRAND } from "@/lib/content";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-canvas">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
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
                <Link href="/datenschutz" className="transition-colors hover:text-ink">
                  Datenschutz
                </Link>
              </li>
            </ul>
            {/* PLATZHALTER: Kontakt-E-Mail */}
            <p className="mt-6 text-sm text-ink-faint">{BRAND.email}</p>
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
