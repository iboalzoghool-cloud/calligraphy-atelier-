/**
 * Sehr dezente Papier-/Leinwand-Körnung über der ganzen Seite – nimmt dem
 * warmen Beige das „Flache" und gibt ihm Textur. Fixierter Overlay,
 * pointer-events aus, minimale Deckkraft, multipliziert für Papier-Tiefe.
 */
export function PaperTexture() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.05] mix-blend-multiply"
      style={{
        backgroundImage: "url(/noise.svg)",
        backgroundSize: "300px 300px",
      }}
    />
  );
}
