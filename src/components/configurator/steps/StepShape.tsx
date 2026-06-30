"use client";

import { useConfigurator } from "@/lib/configurator/context";
import { SHAPES } from "@/lib/configurator/options";
import { basePriceForShape } from "@/lib/configurator/summary";
import { formatPrice } from "@/lib/format";
import type { ShapeId } from "@/lib/configurator/types";

function ShapeIcon({ shape, active }: { shape: ShapeId; active: boolean }) {
  const fill = active ? "#f6e6ec" : "#f4ede5";
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden>
      {shape === "heart" ? (
        <path
          d="M28 49C12 38 6 30 6 21.5 6 14.6 11.4 9 18.1 9c4 0 7.6 2 9.9 5.2C30.3 11 33.9 9 37.9 9 44.6 9 50 14.6 50 21.5 50 30 44 38 28 49Z"
          fill={fill}
          stroke={active ? "#9d3d61" : "#cbbcae"}
          strokeWidth="2"
        />
      ) : (
        <rect
          x="8"
          y="8"
          width="40"
          height="40"
          rx="5"
          fill={fill}
          stroke={active ? "#9d3d61" : "#cbbcae"}
          strokeWidth="2"
        />
      )}
    </svg>
  );
}

export function StepShape() {
  const { state, update } = useConfigurator();
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {SHAPES.map((s) => {
        const active = state.shape === s.id;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => update({ shape: s.id })}
            aria-pressed={active}
            className={`flex flex-col items-center gap-3 rounded-2xl border p-5 text-center transition ${
              active
                ? "border-ink bg-ink/[0.015] shadow-soft"
                : "border-line hover:border-line-strong"
            }`}
          >
            <ShapeIcon shape={s.id} active={active} />
            <div>
              <p className="font-medium text-ink">{s.label}</p>
              <p className="mt-0.5 text-xs text-ink-soft">{s.hint}</p>
              <p className="mt-1.5 text-xs font-medium text-rose-deep">
                ab {formatPrice(basePriceForShape(s.id))}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
