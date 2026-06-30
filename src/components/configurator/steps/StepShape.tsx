"use client";

import { useConfigurator } from "@/lib/configurator/context";
import {
  SHAPES,
  sizesForShape,
  defaultSizeForShape,
} from "@/lib/configurator/options";
import { minPriceForShape } from "@/lib/configurator/summary";
import { formatPrice } from "@/lib/format";
import type { ShapeId } from "@/lib/configurator/types";

function ShapeIcon({ shape, active }: { shape: ShapeId; active: boolean }) {
  const fill = active ? "#f6e6ec" : "#f4ede5";
  const stroke = active ? "#9d3d61" : "#cbbcae";
  return (
    <svg width="52" height="52" viewBox="0 0 56 56" fill="none" aria-hidden>
      {shape === "heart" ? (
        <path
          d="M28 49C12 38 5 30 5 20.8 5 13.7 10.6 8 17.6 8c4.4 0 8.2 2.4 10.4 6 2.2-3.6 6-6 10.4-6C45.4 8 51 13.7 51 20.8 51 30 44 38 28 49Z"
          fill={fill}
          stroke={stroke}
          strokeWidth="2"
        />
      ) : (
        <rect x="8" y="8" width="40" height="40" rx="3" fill={fill} stroke={stroke} strokeWidth="2" />
      )}
    </svg>
  );
}

export function StepShape() {
  const { state, update } = useConfigurator();
  const sizes = sizesForShape(state.shape);

  function pickShape(id: ShapeId) {
    if (id === state.shape) return;
    update({ shape: id, sizeId: defaultSizeForShape(id).id });
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {SHAPES.map((s) => {
          const active = state.shape === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => pickShape(s.id)}
              aria-pressed={active}
              className={`flex flex-col items-center gap-3 rounded-2xl border p-5 text-center transition ${
                active ? "border-ink bg-ink/[0.015] shadow-soft" : "border-line hover:border-line-strong"
              }`}
            >
              <ShapeIcon shape={s.id} active={active} />
              <div>
                <p className="font-medium text-ink">{s.label}</p>
                <p className="mt-0.5 text-xs text-ink-soft">{s.hint}</p>
                <p className="mt-1.5 text-xs font-medium text-rose-deep">
                  ab {formatPrice(minPriceForShape(s.id))}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div>
        <p className="text-sm font-medium text-ink">Größe</p>
        <p className="mt-0.5 text-xs text-ink-soft">
          Die Vorschau passt sich der Größe an.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {sizes.map((sz) => {
            const active = state.sizeId === sz.id;
            return (
              <button
                key={sz.id}
                type="button"
                onClick={() => update({ sizeId: sz.id })}
                aria-pressed={active}
                className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-3 text-left transition ${
                  active ? "border-ink bg-ink/[0.015]" : "border-line hover:border-line-strong"
                }`}
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-ink">
                    {sz.label}
                  </span>
                  {sz.hint ? (
                    <span className="text-[11px] text-ink-faint">{sz.hint}</span>
                  ) : null}
                </span>
                <span className="shrink-0 text-sm font-medium text-ink-soft">
                  {formatPrice(sz.price)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
