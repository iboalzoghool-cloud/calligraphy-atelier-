"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { useConfigurator } from "@/lib/configurator/context";
import { ADDONS } from "@/lib/configurator/options";
import type { AddonsState } from "@/lib/configurator/types";
import { PRICING } from "@/lib/content";
import { formatPrice } from "@/lib/format";

function ToggleCard({
  on,
  onToggle,
  media,
  label,
  desc,
  price,
  gold,
}: {
  on: boolean;
  onToggle: () => void;
  media: ReactNode;
  label: string;
  desc: string;
  price: number;
  gold?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition sm:gap-4 sm:p-5 ${
        on
          ? gold
            ? "border-gold/70 bg-gold/[0.05] shadow-soft"
            : "border-ink/60 bg-ink/[0.02] shadow-soft"
          : "border-line hover:border-line-strong"
      }`}
    >
      <span className="mt-0.5 shrink-0">{media}</span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-medium text-ink">{label}</span>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              gold ? "bg-gold/15 text-gold" : "bg-rose-soft text-rose-deep"
            }`}
          >
            + {formatPrice(price)}
          </span>
        </span>
        <span className="mt-1 block text-sm leading-relaxed text-ink-soft">
          {desc}
        </span>
      </span>
      <span
        className={`mt-0.5 flex h-7 w-12 shrink-0 items-center rounded-full p-1 transition-colors ${
          on ? (gold ? "bg-gold" : "bg-ink") : "bg-line-strong"
        }`}
      >
        <span
          className={`h-5 w-5 rounded-full bg-surface shadow transition-transform ${
            on ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
    </button>
  );
}

const ICONS: Record<keyof AddonsState | "gold", ReactNode> = {
  gold: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 3l1.8 4.8L18.6 9 14 11.2 12 16l-2-4.8L5.4 9l4.8-1.2L12 3Z" fill="currentColor" />
    </svg>
  ),
  gift: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M4 11h16v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8ZM3 7h18v4H3V7Zm9 0v13M12 7s-1-4-3.5-4S6 6 8 7m4 0s1-4 3.5-4S18 6 16 7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  card: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 6.5 12 13l8.5-6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  date: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="5" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 9h16M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  express: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
};

/** Vorschau-Kachel: echtes Foto, sonst Platzhalter mit Icon. */
function AddonThumb({ image, icon }: { image?: string; icon: ReactNode }) {
  if (image) {
    return (
      <span className="relative block h-14 w-14 overflow-hidden rounded-xl border border-line">
        <Image src={image} alt="" fill sizes="56px" className="object-cover" />
      </span>
    );
  }
  return (
    <span className="flex h-14 w-14 flex-col items-center justify-center gap-0.5 rounded-xl border border-dashed border-line-strong bg-canvas text-ink-faint">
      {icon}
      <span className="text-[8px] uppercase tracking-wide">Foto folgt</span>
    </span>
  );
}

export function StepVeredeln() {
  const { state, update } = useConfigurator();

  function toggleAddon(id: keyof AddonsState) {
    update({ addons: { ...state.addons, [id]: !state.addons[id] } });
  }

  return (
    <div className="space-y-3">
      <ToggleCard
        gold
        on={state.gold}
        onToggle={() => update({ gold: !state.gold })}
        media={<span className="text-gold">{ICONS.gold}</span>}
        label="Mehr Gold"
        desc="Gold gehört zum Look – hier wird es verstärkt: extra Schimmer & von Hand gesetzte Akzente. Ideal für Eid, Hochzeit oder besondere Geschenke."
        price={PRICING.gold}
      />
      {ADDONS.map((a) => {
        const withThumb = a.id === "gift" || a.id === "card";
        return (
          <ToggleCard
            key={a.id}
            on={state.addons[a.id]}
            onToggle={() => toggleAddon(a.id)}
            media={
              withThumb ? (
                <AddonThumb image={a.image} icon={ICONS[a.id]} />
              ) : (
                <span className="text-ink-soft">{ICONS[a.id]}</span>
              )
            }
            label={a.label}
            desc={a.desc}
            price={a.price}
          />
        );
      })}
    </div>
  );
}
