import Link from "next/link";

/*
  Marken-Lockup: هدية (Wortbild, public/brand/hadiyya.svg) + „HDIA Atelier“.
  Das SVG wird als CSS-Maske eingebunden → färbt sich über currentColor
  (hell/dunkel), und der spätere Tausch gegen Brahims handgemalte Version
  bleibt eine Ein-Datei-Sache.
*/
const HADIYYA_RATIO = "1257 / 827";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="HDIA Atelier – Startseite"
    >
      <span
        aria-hidden
        className="block h-8 text-gold transition-transform duration-300 group-hover:scale-105"
        style={{
          aspectRatio: HADIYYA_RATIO,
          backgroundColor: "currentColor",
          maskImage: "url(/brand/hadiyya.svg)",
          maskRepeat: "no-repeat",
          maskSize: "contain",
          maskPosition: "center",
          WebkitMaskImage: "url(/brand/hadiyya.svg)",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          WebkitMaskPosition: "center",
        }}
      />
      <span className="flex items-baseline gap-1.5">
        <span className="font-display text-[1.45rem] font-medium leading-none tracking-[0.04em]">
          HDIA
        </span>
        <span className="text-[0.8rem] uppercase leading-none tracking-[0.18em] text-ink-soft">
          Atelier
        </span>
      </span>
    </Link>
  );
}
