"use client";

import { useState } from "react";
import Link from "next/link";
import { useConfigurator } from "@/lib/configurator/context";
import { buildSummary, summaryText } from "@/lib/configurator/summary";
import {
  getCheckoutAdapter,
  type CustomerInfo,
  type OrderPayload,
} from "@/lib/checkout";
import { formatPrice } from "@/lib/format";
import { PRICING, PROCESSING_TIME } from "@/lib/content";

type Status = "form" | "submitting" | "success" | "error";

const EMPTY: CustomerInfo = {
  name: "",
  email: "",
  phone: "",
  street: "",
  zip: "",
  city: "",
  country: "Deutschland",
  note: "",
};

export function OrderClient() {
  const { order } = useConfigurator();
  const [customer, setCustomer] = useState<CustomerInfo>(EMPTY);
  const [agbOk, setAgbOk] = useState(false);
  const [dsgvoOk, setDsgvoOk] = useState(false);
  const [status, setStatus] = useState<Status>("form");
  const [delivered, setDelivered] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Kein Entwurf vorhanden (z. B. direkter Aufruf / Reload).
  if (!order) {
    return (
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="eyebrow">Bestellung</p>
        <h1 className="mt-3 text-3xl">Noch kein Entwurf vorhanden</h1>
        <p className="mt-3 max-w-md text-pretty text-ink-soft">
          Gestalte zuerst dein Unikat im Konfigurator – danach landest du
          automatisch hier, um deine Anfrage zu senden.
        </p>
        <Link href="/gestalten" className="btn btn-primary mt-8">
          Zum Konfigurator
        </Link>
      </div>
    );
  }

  const summary = buildSummary(order.state);

  function set<K extends keyof CustomerInfo>(key: K, value: CustomerInfo[K]) {
    setCustomer((c) => ({ ...c, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agbOk || !dsgvoOk || !order) return;
    setStatus("submitting");
    setErrorMsg(null);

    const payload: OrderPayload = {
      customer,
      summary,
      summaryText: summaryText(order.state),
      priceCents: order.priceCents,
      currency: PRICING.currency,
      mockupDataUrl: order.mockupDataUrl,
    };

    try {
      const res = await getCheckoutAdapter().submitOrder(payload);
      setDelivered(res.delivered);
      setStatus("success");
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Etwas ist schiefgelaufen.",
      );
      setStatus("error");
    }
  }

  /* ── Bestätigung ── */
  if (status === "success") {
    return (
      <div className="container-page py-16 md:py-24">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-soft">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12.5l4.5 4.5L19 7" stroke="#9d3d61" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="mt-6 text-3xl md:text-4xl">Wird mit Liebe handgemalt,</h1>
          <p className="font-display text-2xl text-rose-deep">in scha Allah.</p>
          <p className="mx-auto mt-5 max-w-md text-pretty leading-relaxed text-ink-soft">
            Danke, {customer.name.split(" ")[0] || "dir"}! Deine Anfrage ist
            angekommen. Wir melden uns persönlich per E-Mail, bestätigen Preis &
            Versand und beginnen dann mit dem Malen – in ca. {PROCESSING_TIME}{" "}
            Tagen.
          </p>

          {!delivered ? (
            <p className="mx-auto mt-5 max-w-md rounded-xl bg-rose-soft px-4 py-3 text-sm text-rose-deep">
              Hinweis: Der automatische E-Mail-Versand ist noch nicht
              konfiguriert. Deine Anfrage wurde erfasst – richte für den echten
              Versand <code>RESEND_API_KEY</code> ein (siehe README).
            </p>
          ) : null}

          <div className="mx-auto mt-8 max-w-xs">
            {/* Canvas-Data-URL: native <img> ist hier korrekt (next/image optimiert keine data-URLs). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={order.mockupDataUrl}
              alt="Dein Entwurf"
              className="mx-auto w-56 [filter:drop-shadow(0_16px_28px_rgba(60,30,40,0.18))]"
            />
            <a
              href={order.mockupDataUrl}
              download="kalligraphie-entwurf.png"
              className="btn btn-secondary mt-6"
            >
              Entwurf als Bild speichern
            </a>
          </div>

          <div className="mt-8">
            <Link href="/" className="text-sm text-ink-soft underline-offset-4 hover:underline">
              Zurück zur Startseite
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ── Formular ── */
  const submitting = status === "submitting";

  return (
    <div className="container-page py-10 md:py-14">
      <div className="mb-8">
        <p className="eyebrow eyebrow-rule">Letzter Schritt</p>
        <h1 className="mt-2 text-3xl md:text-4xl">Deine Anfrage</h1>
        <p className="mt-2 max-w-xl text-pretty text-ink-soft">
          Unverbindlich und ohne Konto. Wir bestätigen alles persönlich, bevor
          gemalt wird.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        {/* Zusammenfassung */}
        <div className="lg:order-2">
          <div className="card overflow-hidden p-5 lg:sticky lg:top-24">
            <div className="flex gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={order.mockupDataUrl}
                alt="Dein Entwurf"
                className="h-28 w-28 shrink-0 object-contain"
              />
              <div className="min-w-0">
                <p className="text-sm font-medium text-ink">Dein Entwurf</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                  Digitale Vorschau. Das Original wird von Hand gemalt und ist
                  ein Unikat.
                </p>
              </div>
            </div>

            <dl className="mt-5 space-y-2 border-t border-line pt-4">
              {summary.map((i) => (
                <div key={i.label} className="flex justify-between gap-4 text-sm">
                  <dt className="text-ink-soft">{i.label}</dt>
                  <dd dir="auto" className="text-right font-medium text-ink">
                    {i.value}
                  </dd>
                </div>
              ))}
              <div className="flex justify-between gap-4 border-t border-line pt-3 text-base">
                <dt className="font-medium text-ink">Gesamt</dt>
                <dd className="font-semibold text-ink">
                  {formatPrice(order.priceCents)}
                </dd>
              </div>
            </dl>
            <p className="mt-3 text-xs text-ink-faint">{PRICING.shippingHint}</p>
            <Link
              href="/gestalten"
              className="mt-4 inline-block text-sm text-rose-deep underline-offset-4 hover:underline"
            >
              Entwurf ändern
            </Link>
          </div>
        </div>

        {/* Formular */}
        <form onSubmit={handleSubmit} className="lg:order-1" noValidate>
          <fieldset disabled={submitting} className="space-y-5">
            <Field label="Vollständiger Name" required>
              <input
                type="text"
                required
                autoComplete="name"
                value={customer.name}
                onChange={(e) => set("name", e.target.value)}
                className="cfg-input"
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="E-Mail" required>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={customer.email}
                  onChange={(e) => set("email", e.target.value)}
                  className="cfg-input"
                />
              </Field>
              <Field label="Telefon (optional)">
                <input
                  type="tel"
                  autoComplete="tel"
                  value={customer.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  className="cfg-input"
                />
              </Field>
            </div>

            <Field label="Straße & Hausnummer" required>
              <input
                type="text"
                required
                autoComplete="street-address"
                value={customer.street}
                onChange={(e) => set("street", e.target.value)}
                className="cfg-input"
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-[0.5fr_1fr_1fr]">
              <Field label="PLZ" required>
                <input
                  type="text"
                  required
                  inputMode="numeric"
                  autoComplete="postal-code"
                  value={customer.zip}
                  onChange={(e) => set("zip", e.target.value)}
                  className="cfg-input"
                />
              </Field>
              <Field label="Ort" required>
                <input
                  type="text"
                  required
                  autoComplete="address-level2"
                  value={customer.city}
                  onChange={(e) => set("city", e.target.value)}
                  className="cfg-input"
                />
              </Field>
              <Field label="Land" required>
                <input
                  type="text"
                  required
                  autoComplete="country-name"
                  value={customer.country}
                  onChange={(e) => set("country", e.target.value)}
                  className="cfg-input"
                />
              </Field>
            </div>

            <Field label="Anmerkung (optional)">
              <textarea
                rows={3}
                value={customer.note}
                onChange={(e) => set("note", e.target.value)}
                placeholder="Wünsche, Schreibweise des Namens, Liefertermin …"
                className="cfg-input resize-none"
              />
            </Field>

            <div className="space-y-3 rounded-xl border border-line bg-surface p-4">
              <Consent checked={agbOk} onChange={setAgbOk}>
                Ich akzeptiere die{" "}
                <Link href="/agb" className="text-rose-deep underline-offset-2 hover:underline" target="_blank">
                  AGB
                </Link>{" "}
                und nehme zur Kenntnis, dass bei dieser personalisierten
                Sonderanfertigung kein Widerrufsrecht besteht.
              </Consent>
              <Consent checked={dsgvoOk} onChange={setDsgvoOk}>
                Ich habe die{" "}
                <Link href="/datenschutz" className="text-rose-deep underline-offset-2 hover:underline" target="_blank">
                  Datenschutzerklärung
                </Link>{" "}
                gelesen und bin mit der Verarbeitung meiner Daten zur Bearbeitung
                der Anfrage einverstanden.
              </Consent>
            </div>

            {errorMsg ? (
              <p className="rounded-xl bg-rose-soft px-4 py-3 text-sm text-rose-deep">
                {errorMsg}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={!agbOk || !dsgvoOk || submitting}
              className="btn btn-primary w-full sm:w-auto"
            >
              {submitting ? "Wird gesendet …" : "Anfrage absenden"}
            </button>
            <p className="text-xs leading-relaxed text-ink-faint">
              100 % von Hand gemalt · unverbindlich, ohne Konto · wir bestätigen
              Preis &amp; Versand persönlich, bevor gemalt wird.
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required ? <span className="text-rose"> *</span> : null}
      </span>
      {children}
    </label>
  );
}

function Consent({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-5 w-5 shrink-0 accent-[#9d3d61]"
      />
      <span className="text-sm leading-relaxed text-ink-soft">{children}</span>
    </label>
  );
}
