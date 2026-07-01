import type { ReactNode } from "react";

/** Sichtbare Platzhalter-Markierung für Inhalte, die der Founder einsetzen muss. */
export function PH({ children }: { children: ReactNode }) {
  return <span className="ph">[{children}]</span>;
}

export function LegalShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="container-page py-14 md:py-20">
      <div className="mx-auto max-w-[var(--container-prose)]">
        <p className="eyebrow">Rechtliches</p>
        <h1 className="mt-2 text-3xl md:text-4xl">{title}</h1>
        <p className="mt-3 text-sm text-ink-faint">Stand: Juli 2026</p>

        <div className="mt-6 rounded-xl border border-gold-soft bg-gold/[0.06] px-4 py-3 text-sm text-ink-soft">
          <strong className="text-ink">Hinweis:</strong> Dies ist ein
          unverbindlicher Vorlagentext. Bitte vor dem Launch durch geprüfte
          Rechtstexte ersetzen bzw. anwaltlich prüfen lassen.
        </div>

        <div className="rule-gold my-8" />

        <div className="legal-prose">{children}</div>
      </div>
    </div>
  );
}
