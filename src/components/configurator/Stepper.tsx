"use client";

export interface StepMeta {
  id: string;
  label: string;
}

interface StepperProps {
  steps: StepMeta[];
  current: number;
  onSelect: (index: number) => void;
}

export function Stepper({ steps, current, onSelect }: StepperProps) {
  const pct = ((current + 1) / steps.length) * 100;

  return (
    <div>
      {/* Mobile: kompakter Fortschritt */}
      <div className="md:hidden">
        <div className="flex items-baseline justify-between">
          <p className="text-sm font-medium text-ink">
            {steps[current].label}
          </p>
          <p className="text-xs text-ink-faint">
            Schritt {current + 1} / {steps.length}
          </p>
        </div>
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-rose transition-[width] duration-500 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Desktop: beschriftete, klickbare Schritte */}
      <ol className="hidden items-center gap-1 md:flex">
        {steps.map((step, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <li key={step.id} className="flex flex-1 items-center gap-2">
              <button
                type="button"
                onClick={() => onSelect(i)}
                className="group flex min-w-0 flex-1 flex-col gap-2 text-left"
                aria-current={active ? "step" : undefined}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold transition-colors ${
                      active
                        ? "bg-ink text-canvas"
                        : done
                          ? "bg-rose/15 text-rose-deep"
                          : "bg-line text-ink-faint group-hover:text-ink-soft"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={`truncate text-xs font-medium transition-colors ${
                      active ? "text-ink" : "text-ink-faint group-hover:text-ink-soft"
                    }`}
                  >
                    {step.label}
                  </span>
                </span>
                <span
                  className={`h-[3px] w-full rounded-full transition-colors ${
                    active ? "bg-ink" : done ? "bg-rose/40" : "bg-line"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
