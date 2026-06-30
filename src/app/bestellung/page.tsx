import type { Metadata } from "next";
import { OrderClient } from "@/components/order/OrderClient";

export const metadata: Metadata = {
  title: "Bestellung",
  description: "Sende deine unverbindliche Gestaltungs-Anfrage.",
  robots: { index: false },
};

export default function BestellungPage() {
  return <OrderClient />;
}
