"use client";

import { useConfigurator } from "@/lib/configurator/context";
import { PLACEHOLDER_NAME } from "@/lib/configurator/options";
import { toArabicName } from "@/lib/configurator/translit";
import { CALLIGRAPHY_FONTS } from "@/lib/fonts";

const MAX = 18;

export function StepName() {
  const { state, update } = useConfigurator();
  const preview = state.name.trim() || PLACEHOLDER_NAME;
  const translit = toArabicName(state.name);

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="cfg-name" className="text-sm font-medium text-ink">
          Name
        </label>
        <input
          id="cfg-name"
          type="text"
          dir="auto"
          value={state.name}
          maxLength={MAX}
          onChange={(e) => update({ name: e.target.value })}
          placeholder="z. B. سلوى oder Salwa"
          className="mt-2 w-full rounded-xl border border-line-strong bg-surface px-4 py-3 text-lg text-ink outline-none transition placeholder:text-ink-faint focus:border-ink"
        />
        <div className="mt-1.5 flex items-center justify-between">
          <p className="text-xs text-ink-faint">
            Arabisch oder lateinisch – beides ist möglich.
          </p>
          <p className="text-xs text-ink-faint">
            {state.name.length}/{MAX}
          </p>
        </div>

        {translit.source === "mapped" || translit.source === "translit" ? (
          <button
            type="button"
            onClick={() => update({ name: translit.arabic ?? state.name })}
            className="mt-3 flex w-full items-center justify-between gap-3 rounded-xl border border-line-strong bg-surface px-4 py-3 text-left text-sm text-ink shadow-soft transition hover:border-ink"
          >
            <span className="flex items-center gap-2">
              {translit.source === "mapped"
                ? "Auf Arabisch:"
                : "Auf Arabisch (ungefähr):"}
              <span dir="rtl" className="font-arabic text-xl leading-none">
                {translit.arabic}
              </span>
            </span>
            <span className="shrink-0 font-medium text-rose-deep">
              Übernehmen →
            </span>
          </button>
        ) : null}
      </div>

      <div>
        <p className="text-sm font-medium text-ink">Kalligrafie-Stil</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {CALLIGRAPHY_FONTS.map((f) => {
            const active = state.fontId === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => update({ fontId: f.id })}
                aria-pressed={active}
                className={`flex flex-col items-center justify-center gap-1 rounded-xl border px-3 py-4 transition ${
                  active
                    ? "border-ink bg-ink/[0.015] shadow-soft"
                    : "border-line hover:border-line-strong"
                }`}
              >
                <span
                  dir="auto"
                  className="max-w-full truncate text-2xl leading-tight text-ink"
                  style={{ fontFamily: f.family, fontWeight: f.weight }}
                >
                  {preview}
                </span>
                <span className="text-[11px] text-ink-faint">
                  {f.label} · {f.note}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
