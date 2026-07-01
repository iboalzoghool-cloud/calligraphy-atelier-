import type { ReactNode } from "react";

/*
  Schlanke Vertrauens-Leiste direkt nach dem Hero – nimmt Kaufangst und macht
  den Wert sofort greifbar (ehrlich, keine erfundenen Zahlen). Auf dem Handy
  horizontal wischbar, auf Desktop zentriert.
*/

const POINTS: { icon: ReactNode; label: string }[] = [
  {
    label: "100 % von Hand gemalt",
    icon: (
      <path
        d="M4 20s2-1 4-1 3 1 5 1 3-1 5-1M6 14l9-9 3 3-9 9-4 1 1-4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Jedes Stück ein Unikat",
    icon: (
      <path
        d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Unverbindlich anfragen · ohne Konto",
    icon: (
      <>
        <path d="M12 3l7 3v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9 11.5l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    label: "Versand DE & EU · ca. 1–2 Wochen",
    icon: (
      <>
        <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <circle cx="7" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17.5" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.6" />
      </>
    ),
  },
];

export function TrustStrip() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="container-page">
        <ul className="no-scrollbar flex gap-7 overflow-x-auto py-4 md:justify-center md:gap-12">
          {POINTS.map((p) => (
            <li
              key={p.label}
              className="flex shrink-0 items-center gap-2.5 text-sm text-ink-soft"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden className="text-gold">
                {p.icon}
              </svg>
              <span className="whitespace-nowrap">{p.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
