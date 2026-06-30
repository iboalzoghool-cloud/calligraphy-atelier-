import { NextResponse } from "next/server";
import type { OrderPayload, OrderResult } from "@/lib/checkout/types";

/*
  Bestell-Endpoint (v1): nimmt die Konfiguration + Kundendaten + PNG-Mockup
  entgegen und verschickt eine E-Mail. Nutzt Resend (kostenloses Kontingent)
  via reinem fetch – KEIN zusätzliches SDK / kein bezahlter Dienst nötig.

  Benötigte Env-Vars (siehe README / .env.example):
    RESEND_API_KEY   – API-Key von resend.com (kostenlos)
    ORDER_TO         – Empfänger (deine E-Mail)
    ORDER_FROM       – Absender, verifizierte Domain bei Resend
                       (Fallback: onboarding@resend.dev zum Testen)

  Ohne RESEND_API_KEY läuft der Flow trotzdem durch (delivered:false),
  damit man lokal testen kann. TODO Phase 2: Stripe-Zahlung anschließen.
*/

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: Request) {
  let payload: OrderPayload;
  try {
    payload = (await req.json()) as OrderPayload;
  } catch {
    return NextResponse.json(
      { ok: false, delivered: false, message: "Ungültige Anfrage." } satisfies OrderResult,
      { status: 400 },
    );
  }

  const { customer, summary, summaryText, priceCents, currency, mockupDataUrl } =
    payload ?? {};

  // Minimale Validierung
  if (
    !customer ||
    !customer.name?.trim() ||
    !isEmail(customer.email ?? "") ||
    !customer.street?.trim() ||
    !customer.zip?.trim() ||
    !customer.city?.trim()
  ) {
    return NextResponse.json(
      {
        ok: false,
        delivered: false,
        message: "Bitte fülle die Pflichtfelder korrekt aus.",
      } satisfies OrderResult,
      { status: 422 },
    );
  }

  const priceStr = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: currency || "EUR",
  }).format((priceCents || 0) / 100);

  const summaryRows = (summary ?? [])
    .map(
      (i) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#6c605a">${escapeHtml(
          i.label,
        )}</td><td style="padding:4px 0;font-weight:600">${escapeHtml(i.value)}</td></tr>`,
    )
    .join("");

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#1b1714;max-width:560px">
      <h2 style="font-weight:600">Neue Gestaltungs-Anfrage</h2>
      <p style="color:#6c605a">Über den Konfigurator eingegangen.</p>
      <h3>Konfiguration</h3>
      <table style="border-collapse:collapse;font-size:14px">${summaryRows}
        <tr><td style="padding:8px 12px 4px 0;color:#6c605a">Gesamtpreis</td>
        <td style="padding:8px 0 4px;font-weight:700">${escapeHtml(priceStr)}</td></tr>
      </table>
      <h3>Kunde</h3>
      <p style="font-size:14px;line-height:1.6">
        ${escapeHtml(customer.name)}<br/>
        ${escapeHtml(customer.email)}${customer.phone ? " · " + escapeHtml(customer.phone) : ""}<br/>
        ${escapeHtml(customer.street)}<br/>
        ${escapeHtml(customer.zip)} ${escapeHtml(customer.city)}<br/>
        ${escapeHtml(customer.country || "")}
      </p>
      ${customer.note ? `<p style="font-size:14px"><b>Anmerkung:</b><br/>${escapeHtml(customer.note)}</p>` : ""}
      <p style="color:#9a8d85;font-size:12px">Das Mockup (PNG) hängt dieser Mail an.</p>
    </div>`;

  const text =
    `Neue Gestaltungs-Anfrage\n\n${summaryText ?? ""}\n\n` +
    `Kunde:\n${customer.name}\n${customer.email}${customer.phone ? " / " + customer.phone : ""}\n` +
    `${customer.street}\n${customer.zip} ${customer.city}\n${customer.country ?? ""}\n` +
    `${customer.note ? "\nAnmerkung: " + customer.note + "\n" : ""}`;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_TO;

  // Kein Key konfiguriert → Flow läuft durch (Dev), aber nicht zugestellt.
  if (!apiKey || !to) {
    console.warn(
      "[order] RESEND_API_KEY/ORDER_TO fehlen – Bestellung NICHT versendet:\n" + text,
    );
    return NextResponse.json({
      ok: true,
      delivered: false,
      message: "Anfrage erfasst (E-Mail-Versand ist noch nicht konfiguriert).",
    } satisfies OrderResult);
  }

  // PNG-Anhang aus der data-URL extrahieren
  const attachments = [];
  const match = /^data:image\/png;base64,(.+)$/.exec(mockupDataUrl ?? "");
  if (match) {
    attachments.push({ filename: "kalligraphie-mockup.png", content: match[1] });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.ORDER_FROM || "Kalligraphie <onboarding@resend.dev>",
        to: [to],
        reply_to: customer.email,
        subject: `Neue Anfrage – ${customer.name}`,
        html,
        text,
        attachments,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[order] Resend-Fehler:", res.status, detail);
      return NextResponse.json(
        {
          ok: false,
          delivered: false,
          message: "E-Mail-Versand fehlgeschlagen. Bitte später erneut versuchen.",
        } satisfies OrderResult,
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivered: true } satisfies OrderResult);
  } catch (err) {
    console.error("[order] Unerwarteter Fehler:", err);
    return NextResponse.json(
      { ok: false, delivered: false, message: "Serverfehler beim Versand." } satisfies OrderResult,
      { status: 500 },
    );
  }
}
