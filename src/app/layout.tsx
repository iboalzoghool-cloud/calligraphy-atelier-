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
    "arabische Kalligrafie",
    "handgemalt",
    "Namen in Tinte",
    "Alkohol-Tinte",
    "personalisiertes Geschenk",
    "Eid Geschenk",
    "Muttertag",
    "Hochzeit",
    "Leinwand",
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body className={`${fontVariables} min-h-screen antialiased`}>
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
