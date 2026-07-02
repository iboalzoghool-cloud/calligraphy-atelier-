"use client";

/*
  Herz-Fächer: das handgemalte Herz als Hauptprodukt, drei Farbwelten
  aufgefächert wie Karten. Aktives Herz aufrecht vorn, die anderen ±22°.
  Weiche, langsame Tinten-Übergänge – nichts blinkt.

  Realismus statt SVG-Fake: jedes Herz ist ein freigestelltes Leinwand-Herz
  (Form, Licht & Kante aus dem echten Master-Foto gebacken); der Schatten
  folgt per CSS drop-shadow der echten Silhouette. Dahinter driftende
  Farbkleckser der aktiven Welt.
*/

export interface HeartSet {
  key: string;
  /** Textur der Farbwelt (Swatches). */
  tex: string;
  /** Freigestelltes realistisches Leinwand-Herz. */
  heart: string;
  bgId: string;
  ink: string;
  glow: string;
}

export const HEART_SETS: HeartSet[] = [
  {
    key: "Rosé",
    tex: "/backgrounds/worlds/rose.webp",
    heart: "/backgrounds/hearts/rose.webp",
    bgId: "rose",
    ink: "#7A3247",
    glow: "radial-gradient(circle, rgba(178,94,119,.26), rgba(169,130,59,.10) 55%, transparent 72%)",
  },
  {
    key: "Petrol",
    tex: "/backgrounds/worlds/petrol-gold.webp",
    heart: "/backgrounds/hearts/petrol-gold.webp",
    bgId: "petrol-gold",
    ink: "#234E50",
    glow: "radial-gradient(circle, rgba(63,107,110,.26), rgba(169,130,59,.12) 55%, transparent 72%)",
  },
  {
    key: "Blau",
    tex: "/backgrounds/worlds/navy-gold.webp",
    heart: "/backgrounds/hearts/navy-gold.webp",
    bgId: "navy-gold",
    ink: "#1E2E52",
    glow: "radial-gradient(circle, rgba(40,60,100,.26), rgba(169,130,59,.12) 55%, transparent 72%)",
  },
];

export function bgIdForWorld(key: string): string {
  return (HEART_SETS.find((s) => s.key === key) ?? HEART_SETS[0]).bgId;
}

type Slot = "center" | "left" | "right";

// Aktives Herz deutlich nach vorn (größer, aufrecht), Seitenherzen zurück.
const SLOTS: Record<Slot, { transform: string; z: number; opacity: number; name: number }> = {
  center: { transform: "rotate(0deg) translateY(-20px) scale(1.16)", z: 30, opacity: 1, name: 1 },
  left: { transform: "rotate(-23deg) translateX(-12%) scale(.82)", z: 12, opacity: 0.7, name: 0 },
  right: { transform: "rotate(23deg) translateX(12%) scale(.82)", z: 12, opacity: 0.7, name: 0 },
};

interface HeartFanProps {
  active: string;
  onSelect: (key: string) => void;
  name: string;
  sizeLabel: string;
  /** Name lateinisch statt arabisch anzeigen. */
  latin?: boolean;
}

export function HeartFan({ active, onSelect, name, sizeLabel, latin = false }: HeartFanProps) {
  const activeSet = HEART_SETS.find((s) => s.key === active) ?? HEART_SETS[0];
  const others = HEART_SETS.filter((s) => s.key !== active);
  const slotFor = (key: string): Slot =>
    key === active ? "center" : others[0]?.key === key ? "left" : "right";

  return (
    <div className="mx-auto w-full max-w-xl">
      <div
        className="animate-heartfloat relative"
        style={{ height: "min(96vw, 560px)" }}
      >
        {/* driftende Farbkleckser + Glow der aktiven Welt */}
        <div
          aria-hidden
          className="animate-drift"
          style={{
            position: "absolute",
            left: "16%",
            top: "26%",
            width: "46%",
            aspectRatio: "1 / 1",
            transform: "translate(-50%,-50%)",
            borderRadius: "50%",
            background: activeSet.glow,
            filter: "blur(14px)",
            opacity: 0.7,
            transition: "background 1.1s ease",
            zIndex: 0,
          }}
        />
        <div
          aria-hidden
          className="animate-drift"
          style={{
            position: "absolute",
            right: "14%",
            bottom: "20%",
            width: "40%",
            aspectRatio: "1 / 1",
            transform: "translate(50%,50%)",
            borderRadius: "50%",
            background: activeSet.glow,
            filter: "blur(16px)",
            opacity: 0.55,
            animationDelay: "-4.5s",
            transition: "background 1.1s ease",
            zIndex: 0,
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "50%",
            top: "46%",
            width: "min(460px, 96%)",
            aspectRatio: "1 / 1",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background: activeSet.glow,
            filter: "blur(4px)",
            transition: "background 1.1s ease",
            zIndex: 0,
          }}
        />

        {HEART_SETS.map((set) => {
          const slot = SLOTS[slotFor(set.key)];
          return (
            <button
              key={set.key}
              type="button"
              onClick={() => onSelect(set.key)}
              aria-label={`Farbwelt ${set.key}`}
              aria-pressed={set.key === active}
              style={{
                position: "absolute",
                bottom: "4%",
                left: "50%",
                marginLeft: "-39%",
                width: "min(390px, 78%)",
                transformOrigin: "50% 96%",
                transform: slot.transform,
                zIndex: slot.z,
                opacity: slot.opacity,
                transition:
                  "transform .8s cubic-bezier(.22,.68,.24,1), opacity .8s ease",
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            >
              {/* Echtes Leinwand-Herz (freigestellt) – Schatten folgt der
                  echten Silhouette, kein künstlicher Glanz. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={set.heart}
                alt=""
                draggable={false}
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  filter: "drop-shadow(0 18px 26px rgba(45,22,30,.30))",
                }}
                aria-hidden
              />
              {/* Name-Overlay (arabische Kalligrafie) – nur auf dem vorderen Herz */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: "4%",
                  opacity: slot.name,
                  transition: "opacity .8s ease",
                  pointerEvents: "none",
                }}
              >
                <span
                  dir={latin ? "ltr" : "rtl"}
                  lang={latin ? undefined : "ar"}
                  style={{
                    // Kalligrafie immer in Schwarz (wie auf dem echten Werk).
                    fontFamily: latin ? "var(--font-display)" : "var(--font-aref)",
                    fontStyle: latin ? "italic" : "normal",
                    color: "#1b1714",
                    fontSize: latin ? "clamp(28px, 6.5vw, 50px)" : "clamp(34px, 8vw, 58px)",
                    lineHeight: 1,
                    textShadow: "0 1px 10px rgba(255,255,255,0.35)",
                  }}
                >
                  {name}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Swatches (zweite Bedienung) + Größe */}
      <div className="mt-5 flex items-center justify-center gap-3">
        {HEART_SETS.map((s) => (
          <button
            key={s.key}
            type="button"
            onClick={() => onSelect(s.key)}
            aria-label={`Farbwelt ${s.key}`}
            aria-pressed={s.key === active}
            className="h-11 w-11 rounded-full bg-cover bg-center transition"
            style={{
              backgroundImage: `url(${s.tex})`,
              outline:
                s.key === active
                  ? "2px solid var(--color-ink)"
                  : "1px solid var(--color-line-strong)",
              outlineOffset: 2,
            }}
          />
        ))}
      </div>
      <p className="mt-3 text-center text-xs uppercase tracking-[0.2em] text-ink-faint">
        Herz · {sizeLabel} · von Hand gemalt
      </p>
    </div>
  );
}
