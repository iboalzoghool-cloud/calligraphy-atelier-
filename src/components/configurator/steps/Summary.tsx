"use client";

import { useConfigurator } from "@/lib/configurator/context";
import { buildSummary } from "@/lib/configurator/summary";
import { formatPrice } from "@/lib/format";
import { PRICING, PROCESSING_TIME, SCARCITY } from "@/lib/content";

interface SummaryProps {
  onProceed: () => void;
}

export function Summary({ onProceed }: SummaryProps) {
  const { state, priceCents } = useConfigurator();
  const items = buildSummary(state);
  const hasName = state.name.trim().length > 0;

  return (
    <div className="space-y-5">
      <dl className="divide-y divide-line overflow-hidden rounded-2xl border border-line">
        {items.map((i) => (
          <div key={i.label} className="flex items-baseline justify-between gap-4 px-4 py-2.5">
            <dt className="text-sm text-ink-soft">{i.label}</dt>
            <dd dir="auto" className="text-right text-sm font-medium text-ink">
              {i.value}
            </dd>
          </div>
        ))}
        <div className="flex items-baseline justify-between gap-4 bg-rose-soft/40 px-4 py-3">
          <dt className="text-sm font-medium text-ink">Gesamt</dt>
          <dd className="text-right text-lg font-semibold text-ink">
            {formatPrice(priceCents)}
          </dd>
        </div>
      </dl>

      {SCARCITY.show ? (
        <p className="flex items-center justify-center gap-2 text-xs text-ink-faint">
          <span className="h-1.5 w-1.5 rounded-full bg-rose" aria-hidden />
          Aus Liebe zum Detail nehme ich nur {SCARCITY.slotsPerWeek} Stücke pro
          Woche an.
        </p>
      ) : null}

      {!hasName ? (
        <p className="rounded-xl bg-rose-soft px-4 py-3 text-sm text-rose-deep">
          Bitte gib im Schritt „Name“ einen Namen ein, bevor du fortfährst.
        </p>
      ) : null}

      <button
        type="button"
        onClick={onProceed}
        disabled={!hasName}
        className="btn btn-primary w-full"
      >
        Weiter zur Bestellung
      </button>

      <p className="text-center text-xs leading-relaxed text-ink-faint">
        Unverbindliche Anfrage · {PRICING.shippingHint.replace(/\.$/, "")} ·
        Bearbeitungszeit {PROCESSING_TIME} Tage
      </p>
    </div>
  );
}
