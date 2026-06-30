"use client";

import { useConfigurator } from "@/lib/configurator/context";
import { BACKGROUNDS } from "@/lib/configurator/options";
import { backgroundTileStyle } from "@/lib/configurator/render";

export function StepBackground() {
  const { state, update } = useConfigurator();

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-3">
        {BACKGROUNDS.map((bg) => {
          const active = state.backgroundId === bg.id;
          return (
            <button
              key={bg.id}
              type="button"
              onClick={() => update({ backgroundId: bg.id })}
              aria-pressed={active}
              className="group text-left"
            >
              <span
                className={`relative block aspect-square w-full overflow-hidden rounded-xl border transition ${
                  active
                    ? "border-ink ring-2 ring-ink/15"
                    : "border-line group-hover:border-line-strong"
                }`}
                style={backgroundTileStyle(bg)}
              >
                {active ? (
                  <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-canvas">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path
                        d="M2.5 6.2 5 8.5 9.5 3.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                ) : null}
              </span>
              <span
                className={`mt-2 block truncate text-xs ${
                  active ? "font-medium text-ink" : "text-ink-soft"
                }`}
              >
                {bg.label}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-ink-faint">
        Die Farbwelten sind eine Annäherung. Dein Original wird frei von Hand
        gemalt – der Tintenfluss wird nie exakt gleich sein.
      </p>
    </div>
  );
}
