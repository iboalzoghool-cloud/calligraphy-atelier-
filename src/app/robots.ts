import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Bestellseite ist zustandsabhängig (Entwurf nötig) – nicht indexieren.
      disallow: ["/bestellung"],
    },
    sitemap: "https://calligraphy-atelier.vercel.app/sitemap.xml",
  };
}
