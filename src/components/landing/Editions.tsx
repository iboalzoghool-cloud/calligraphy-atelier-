"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { EDITIONS, EDITIONS_LIVE, SHOP, type EditionProduct } from "@/lib/shop/config";
import { formatPrice } from "@/lib/format";

/*
  EDITIONEN – Kunstdrucke ausgewählter Motive (günstiger Einstieg).
  Kristallklare Trennung von den Originalen: jede Karte trägt das
  „Kunstdruck · Edition“-Label; die Originale bleiben das Herz der Marke.
*/

function EditionCard({ product, delay }: { product: EditionProduct; delay: number }) {
  const [sizeId, setSizeId] = useState(product.sizes[0].id);
  const [buying, setBuying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const size = product.sizes.find((s) => s.id === sizeId) ?? product.sizes[0];

  async function buy() {
    setBuying(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "edition", productId: product.id, sizeId }),
      });
      const data = (await res.json()) as { url?: string; message?: string };
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      setError(data.message ?? "Gerade nicht verfügbar.");
    } catch {
      setError("Verbindung fehlgeschlagen. Bitte erneut versuchen.");
    }
    setBuying(false);
  }

  return (
    <Reveal delay={delay}>
      <div
        className="flex h-full flex-col rounded-[1.4rem] border p-3 shadow-soft"
        style={{
          background: `linear-gradient(160deg, color-mix(in srgb, ${product.accent} 18%, #fbf7ee), color-mix(in srgb, ${product.accent} 7%, #fbf7ee))`,
          borderColor: `color-mix(in srgb, ${product.accent} 26%, var(--color-line))`,
        }}
      >
        <div className="relative h-56 overflow-hidden rounded-lg">
          <Image
            src={product.image}
            alt={`Kunstdruck „${product.title}“`}
            fill
            sizes="(max-width: 640px) 86vw, 20rem"
            quality={70}
            className="object-contain [filter:drop-shadow(0_8px_14px_rgba(45,22,30,0.2))]"
          />
        </div>
        <div className="flex flex-1 flex-col px-1.5 pb-1.5 pt-3">
          {/* Kennzeichnung – Markenschutz, kein Kleingedrucktes */}
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-ink-soft">
            Kunstdruck · Edition
          </span>
          <div className="mt-2 font-display text-lg text-ink">{product.title}</div>
          <div className="text-[13px] text-ink-soft">{product.note}</div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.sizes.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSizeId(s.id)}
                aria-pressed={s.id === sizeId}
                className={`rounded-full border px-3 py-1.5 text-xs transition ${
                  s.id === sizeId
                    ? "border-ink bg-ink text-canvas"
                    : "border-line-strong bg-surface text-ink-soft hover:text-ink"
                }`}
              >
                {s.label.split(" · ")[0]}
              </button>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between gap-3 pt-4">
            <span className="text-base font-semibold text-ink">{formatPrice(size.price)}</span>
            <button
              type="button"
              onClick={buy}
              disabled={buying}
              className="btn btn-primary min-h-11 px-5 text-sm"
            >
              {buying ? "Moment …" : "Kaufen"}
            </button>
          </div>
          {error ? (
            <p className="mt-2 text-xs text-rose-deep">{error}</p>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}

export function Editions() {
  // Pausiert (EDITIONS_LIVE in lib/shop/config.ts) – Idee & Code konserviert.
  if (!EDITIONS_LIVE) return null;
  return (
    <section id="editionen" className="scroll-mt-24 bg-paper-2 py-16 md:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Editionen"
          title="Kunstdrucke ausgewählter Motive"
          intro={`Der leichte Einstieg in die HDIA-Welt: Lieblingsmotive aus dem Atelier als hochwertiger Druck. ${SHOP.deliveryEdition} · ${SHOP.shippingNote}.`}
          stroke
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EDITIONS.map((p, i) => (
            <EditionCard key={p.id} product={p} delay={i * 0.06} />
          ))}
        </div>

        {/* Cross-Sell zum Kern der Marke */}
        <p className="mt-10 text-center text-sm text-ink-soft">
          Lieber ein <strong className="text-ink">Original mit deinem Namen</strong> –
          ein Unikat, von Hand gemalt?{" "}
          <Link href="/gestalten" className="font-medium text-rose-deep underline-offset-4 hover:underline">
            Jetzt gestalten →
          </Link>
        </p>
      </div>
    </section>
  );
}
