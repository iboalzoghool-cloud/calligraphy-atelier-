import type { Metadata } from "next";
import Link from "next/link";
import { SHOP } from "@/lib/shop/config";
import { BRAND } from "@/lib/content";

export const metadata: Metadata = {
  title: "Danke für deine Bestellung",
  robots: { index: false },
};

export default async function DankePage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; kind?: string; mock?: string }>;
}) {
  const params = await searchParams;
  const isEdition = params.kind === "edition";
  const isMock = params.mock === "1";

  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-soft">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12.5l4.5 4.5L19 7" stroke="#9d3d61" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h1 className="mt-6 text-3xl md:text-4xl">Deine Bestellung ist da 💛</h1>
      <p className="mt-2 font-display text-2xl text-rose-deep">
        {BRAND.meaning}
      </p>
      <p className="mx-auto mt-5 max-w-md text-pretty leading-relaxed text-ink-soft">
        {isEdition
          ? `Dein Kunstdruck wird jetzt beauftragt. ${SHOP.deliveryEdition} – du bekommst gleich eine Bestätigung per E-Mail.`
          : `Jetzt wird gemalt: dein Original entsteht von Hand, mit echter Tinte. ${SHOP.deliveryOriginal} – die Bestätigung mit allen Details ist unterwegs zu dir.`}
      </p>
      <p className="mx-auto mt-3 max-w-md text-sm text-ink-faint">
        Etwas an der Schreibweise ändern? Antworte einfach auf die
        Bestätigungs-Mail – vor dem {isEdition ? "Druck" : "ersten Pinselstrich"} geht nichts raus.
      </p>

      {isMock ? (
        <p className="mx-auto mt-6 max-w-md rounded-xl bg-rose-soft px-4 py-3 text-xs text-rose-deep">
          Hinweis: Testmodus ohne Zahlung (Stripe-Keys nicht konfiguriert) –
          es wurde kein Geld bewegt.
        </p>
      ) : null}

      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
        {!isEdition ? (
          <Link href="/#editionen" className="btn btn-secondary">
            Editionen entdecken
          </Link>
        ) : (
          <Link href="/gestalten" className="btn btn-secondary">
            Ein Original mit Namen gestalten
          </Link>
        )}
        <Link href="/" className="text-sm text-ink-soft underline-offset-4 hover:underline">
          Zurück zur Startseite
        </Link>
      </div>
    </div>
  );
}
