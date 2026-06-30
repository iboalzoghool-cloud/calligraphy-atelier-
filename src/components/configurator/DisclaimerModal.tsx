"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DISCLAIMERS } from "@/lib/content";

interface DisclaimerModalProps {
  open: boolean;
  loading: boolean;
  error?: string | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function DisclaimerModal({
  open,
  loading,
  error,
  onClose,
  onConfirm,
}: DisclaimerModalProps) {
  const [agreed, setAgreed] = useState(false);
  const titleId = useId();

  // Reset beim Öffnen + ESC zum Schließen.
  useEffect(() => {
    if (open) setAgreed(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, loading, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Schließen"
            onClick={() => !loading && onClose()}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg rounded-t-3xl border border-line bg-surface p-6 shadow-lift sm:rounded-3xl sm:p-8"
          >
            <p className="eyebrow">Bevor es losgeht</p>
            <h2 id={titleId} className="mt-2 text-2xl">
              Gut zu wissen
            </h2>

            <ul className="mt-5 space-y-4">
              {DISCLAIMERS.map((d) => (
                <li key={d.title} className="flex gap-3">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose"
                    aria-hidden
                  />
                  <div>
                    <p className="text-sm font-medium text-ink">{d.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">
                      {d.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-canvas/60 p-4">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-5 w-5 shrink-0 accent-[#9d3d61]"
              />
              <span className="text-sm leading-relaxed text-ink">
                Ich habe die Hinweise gelesen und verstanden – insbesondere, dass
                es sich um ein handgemaltes Unikat ohne Widerrufsrecht handelt.
              </span>
            </label>

            {error ? (
              <p className="mt-4 text-sm text-rose-deep">{error}</p>
            ) : null}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="btn btn-secondary"
              >
                Zurück
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={!agreed || loading}
                className="btn btn-primary"
              >
                {loading ? "Mockup wird erstellt …" : "Zur Bestellung"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
