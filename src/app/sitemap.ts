import type { MetadataRoute } from "next";

const BASE = "https://calligraphy-atelier.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/gestalten`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/atelier`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/impressum`, changeFrequency: "yearly", priority: 0.1 },
    { url: `${BASE}/datenschutz`, changeFrequency: "yearly", priority: 0.1 },
    { url: `${BASE}/agb`, changeFrequency: "yearly", priority: 0.1 },
  ];
}
