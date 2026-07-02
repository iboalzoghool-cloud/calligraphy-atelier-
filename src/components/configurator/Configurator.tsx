"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useConfigurator } from "@/lib/configurator/context";
import { OCCASION_PRESETS } from "@/lib/configurator/options";
import { exportMockup } from "@/lib/configurator/compose";
import { formatPrice } from "@/lib/format";
import { PreviewCanvas } from "./PreviewCanvas";
import { PreviewNote } from "./PreviewNote";
import { Stepper, type StepMeta } from "./Stepper";
import { StepShape } from "./steps/StepShape";
import { StepBackground } from "./steps/StepBackground";
import { StepName } from "./steps/StepName";
import { StepSaying } from "./steps/StepSaying";
import { StepVeredeln } from "./steps/StepVeredeln";
import { Summary } from "./steps/Summary";
import { DisclaimerModal } from "./DisclaimerModal";

interface StepDef extends StepMeta {
  title: string;
  desc: string;
}

const STEPS: StepDef[] = [
  { id: "form", label: "Form", title: "Wähle die Form", desc: "Herz oder Quadrat – beide im Format 29 × 29 cm." },
  { id: "farbwelt", label: "Farbwelt", title: "Wähle die Farbwelt", desc: "Der handgemalte Tinten-Hintergrund deines Stücks." },
  { id: "name", label: "Name", title: "Dein Name", desc: "Arabisch oder lateinisch – er steht im Mittelpunkt." },
  { id: "spruch", label: "Spruch", title: "Spruch hinzufügen", desc: "Optional: ein arabischer Segens- oder Liebesgruß (+ 5 €)." },
  { id: "veredeln", label: "Veredeln", title: "Veredle dein Unikat", desc: "Optional: Goldakzente, Geschenkverpackung & mehr." },
  { id: "fertig", label: "Übersicht", title: "Übersicht", desc: "Prüfe deine Gestaltung und sende die Anfrage." },
];

export function Configurator() {
  const router = useRouter();
  const { state, update, priceCents, setOrder, ready } = useConfigurator();

  const [step, setStep] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Anlass-Preset (?anlass=eid …): nach der Storage-Hydration einmalig
  // anwenden und direkt zum Namens-Schritt springen – der schnellste Weg
  // von der Anlass-Karte zum persönlichen Entwurf.
  const presetApplied = useRef(false);
  useEffect(() => {
    if (!ready || presetApplied.current) return;
    presetApplied.current = true;
    const key = new URLSearchParams(window.location.search).get("anlass");
    const preset = key ? OCCASION_PRESETS[key] : undefined;
    if (preset) {
      update(preset);
      setStep(2); // Schritt „Name“
    }
  }, [ready, update]);

  const isLast = step === STEPS.length - 1;
  const meta = STEPS[step];

  async function handleConfirm() {
    setSubmitting(true);
    setError(null);
    try {
      const mockupDataUrl = await exportMockup(state, 1080);
      setOrder({ state, mockupDataUrl, priceCents });
      router.push("/bestellung");
    } catch {
      setError("Das Mockup konnte nicht erstellt werden. Bitte erneut versuchen.");
      setSubmitting(false);
    }
  }

  return (
    <div className="container-page py-8 md:py-12">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
        {/* ── Live-Vorschau ── */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <PreviewCanvas
            state={state}
            interactive
            className="mx-auto w-full max-w-[15rem] py-4 sm:max-w-xs lg:max-w-md"
          />
          <PreviewNote className="mt-2" />
        </div>

        {/* ── Schritte ── */}
        <div className="min-w-0">
          <div className="mb-7 flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <Stepper steps={STEPS} current={step} onSelect={setStep} />
            </div>
          </div>

          <div className="min-h-[19rem]">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-2xl">{meta.title}</h2>
              <span className="shrink-0 text-sm text-ink-soft">
                {formatPrice(priceCents)}
              </span>
            </div>
            <p className="mt-1 text-sm text-ink-soft">{meta.desc}</p>

            <div className="mt-6">
              {meta.id === "form" && <StepShape />}
              {meta.id === "farbwelt" && <StepBackground />}
              {meta.id === "name" && <StepName />}
              {meta.id === "spruch" && <StepSaying />}
              {meta.id === "veredeln" && <StepVeredeln />}
              {meta.id === "fertig" && (
                <Summary onProceed={() => setModalOpen(true)} />
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="btn btn-ghost"
            >
              ← Zurück
            </button>
            {!isLast ? (
              <button
                type="button"
                onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
                className="btn btn-primary"
              >
                Weiter
              </button>
            ) : (
              <span className="text-xs text-ink-faint">Fast geschafft ✦</span>
            )}
          </div>
        </div>
      </div>

      <DisclaimerModal
        open={modalOpen}
        loading={submitting}
        error={error}
        onClose={() => !submitting && setModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
