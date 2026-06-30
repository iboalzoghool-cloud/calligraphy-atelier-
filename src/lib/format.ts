/** Cent-Betrag als deutscher Euro-String, z. B. 4900 → "49,00 €". */
export function formatPrice(cents: number, currency = "EUR"): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency,
  }).format(cents / 100);
}
