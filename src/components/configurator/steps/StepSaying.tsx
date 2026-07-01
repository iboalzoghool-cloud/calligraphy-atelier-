"use client";

import { useConfigurator } from "@/lib/configurator/context";
import { SAYINGS } from "@/lib/configurator/options";
import { PRICING } from "@/lib/content";
import { formatPrice } from "@/lib/format";

export function StepSaying() {
  const { state, update } = useConfigurator();

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => update({ sayingId: null, sayingText: "" })}
          aria-pressed={state.sayingId === null}
          className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
            state.sayingId === null
              ? "border-ink bg-ink/[0.015]"
              : "border-line hover:border-line-strong"
          }`}
        >
          <span className="text-sm font-medium text-ink">Ohne Spruch</span>
          <span className="text-xs text-ink-faint">Nur der Name</span>
        </button>

        {SAYINGS.map((s) => {
          const active = state.sayingId === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => update({ sayingId: s.id, sayingText: "" })}
              aria-pressed={active}
              className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition ${
                active
                  ? "border-ink bg-ink/[0.015]"
                  : "border-line hover:border-line-strong"
              }`}
            >
              <span className="flex items-center gap-2 text-sm font-medium text-ink">
                {s.label}
                <span className="rounded-full bg-rose-soft px-2 py-0.5 text-[11px] font-medium text-rose-deep">
                  + {formatPrice(PRICING.saying)}
                </span>
              </span>
              <span
                dir="rtl"
                className="text-lg text-ink-soft"
                style={{ fontFamily: "var(--font-amiri)" }}
              >
                {s.ar}
              </span>
            </button>
          );
        })}
      </div>

      <div>
        <label htmlFor="cfg-saying-custom" className="text-sm font-medium text-ink">
          Oder eigener Text
        </label>
        <input
          id="cfg-saying-custom"
          type="text"
          dir="auto"
          maxLength={24}
          value={state.sayingText ?? ""}
          onChange={(e) => {
            const t = e.target.value;
            update({ sayingText: t, sayingId: t.trim() ? "custom" : null });
          }}
          placeholder="z. B. عائلتي · „Alles Liebe“ · حبيبي"
          className={`mt-2 w-full rounded-xl border bg-surface px-4 py-3 text-base text-ink outline-none transition placeholder:text-ink-faint ${
            state.sayingId === "custom" ? "border-ink" : "border-line-strong focus:border-ink"
          }`}
        />
        <p className="mt-1 text-xs text-ink-faint">
          Arabisch oder lateinisch · + {formatPrice(PRICING.saying)}
        </p>
      </div>

      {state.sayingId ? (
        <div>
          <p className="text-sm font-medium text-ink">Position</p>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {(["top", "bottom"] as const).map((pos) => {
              const active = state.sayingPosition === pos;
              return (
                <button
                  key={pos}
                  type="button"
                  onClick={() => update({ sayingPosition: pos })}
                  aria-pressed={active}
                  className={`rounded-xl border px-4 py-3 text-sm transition ${
                    active
                      ? "border-ink bg-ink/[0.015] font-medium text-ink"
                      : "border-line text-ink-soft hover:border-line-strong"
                  }`}
                >
                  {pos === "top" ? "Oben" : "Unten"}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
