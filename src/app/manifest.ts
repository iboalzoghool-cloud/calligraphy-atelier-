import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HDIA Atelier — Handgemalte Namenskunst",
    short_name: "HDIA",
    description:
      "Handgemalte Kalligrafie-Unikate: dein Name in Tinte, als Geschenk von Hand gemalt.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3ecdc",
    theme_color: "#f3ecdc",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
