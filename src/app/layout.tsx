import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { ConfiguratorProvider } from "@/lib/configurator/context";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PaperTexture } from "@/components/ui/PaperTexture";
import { BRAND } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL("https://kalligraphie.example"), // PLATZHALTER: echte Domain (Phase 2)
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
