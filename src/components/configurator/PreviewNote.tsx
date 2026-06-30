/**
 * Eleganter, integrierter Vorschau-Hinweis (kein billiger Disclaimer).
 * Pflicht-Botschaft laut Briefing – ruhig und edel gesetzt.
 */
export function PreviewNote({ className = "" }: { className?: string }) {
  return (
    <figcaption className={`mx-auto max-w-xs text-center ${className}`}>
      <span className="mx-auto mb-3 block h-px w-10 bg-gradient-to-r from-transparent via-gold-soft to-transparent" />
      <span className="font-display text-[15px] italic text-ink">Vorschau</span>
      <span className="mt-1 block text-xs leading-relaxed text-ink-faint">
        Dein Stück wird von Hand gemalt – ein individuelles Unikat. Mit Liebe so
        schön wie möglich umgesetzt, kann es leicht abweichen.
      </span>
    </figcaption>
  );
}
