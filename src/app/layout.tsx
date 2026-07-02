import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { ConfiguratorProvider } from "@/lib/configurator/context";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PaperTexture } from "@/components/ui/PaperTexture";
import { BRAND } from "@/lib/content";

export const metadata: Metadata = {
  // Vercel-Prod-URL; bei eigener Domain hier tauschen.
  metadataBase: new URL("https://calligraphy-atelier.vercel.app"),
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s · ${BRAND.name}`,
  },
  description:
    "Handgemalte Kalligrafie-Kunst als Unikat. Gestalte Name, Form, Farbwelt und Spruch in der Live-Vorschau – jedes Stück wird von Hand gemalt.",
  keywords: [
    "HDIA Atelier",
    "arabische Kalligraphie",
    "Namensbild",
    "Geschenk personalisiert handgemalt",
    "Namen in Tinte",
    "Alkohol-Tinte",
    "Eid Geschenk",
    "Muttertag Geschenk",
    "Hochzeitsgeschenk",
    "Leinwand Herz",
    "Unikat",
  ],
  openGraph: {
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description:
      "Handgemalte Kalligrafie-Kunst als Unikat. Gestalte dein Stück in der Live-Vorschau.",
    type: "website",
    locale: "de_DE",
  },
  // OG-Bild kommt aus src/app/opengraph-image.jpg (File-Convention).
  twitter: {
    card: "summary_large_image",
  },
};

/* Strukturierte Daten: ehrlich & minimal (kein Fake-Rating). */
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: BRAND.name,
  alternateName: "هدية",
  description:
    "Handgemalte arabische Kalligraphie: Namensbilder auf Leinwand als personalisiertes Geschenk – jedes Stück ein Unikat.",
  url: "https://calligraphy-atelier.vercel.app",
  email: BRAND.email,
  sameAs: [`https://instagram.com/${BRAND.instagram.replace(/^@/, "")}`],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Offenbach am Main",
    addressCountry: "DE",
  },
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Product",
      name: "Handgemaltes Kalligraphie-Namensbild (Leinwand, Unikat)",
      description:
        "Name in arabischer Kalligraphie, von Hand mit Alkohol-Tinte auf Herz- oder Quadrat-Leinwand gemalt.",
    },
    priceCurrency: "EUR",
    price: "29.00",
    priceSpecification: {
      "@type": "PriceSpecification",
      minPrice: "29.00",
      priceCurrency: "EUR",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body className={`${fontVariables} min-h-screen antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <ConfiguratorProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <PaperTexture />
        </ConfiguratorProvider>
      </body>
    </html>
  );
}
