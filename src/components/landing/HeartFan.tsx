"use client";

/*
  Herz-Fächer: das handgemalte Herz als Hauptprodukt, drei Farbwelten
  aufgefächert wie Karten. Aktives Herz aufrecht vorn, die anderen ±22°.
  Weiche, langsame Tinten-Übergänge – nichts blinkt.

  Premium-Look statt flachem „Sticker": jedes Herz bekommt Tiefe (Vignette),
  Glanz und eine feine Gold-Kante – wie eine echte 3D-Leinwand. Form kommt aus
  einem inline-SVG `clipPath` (robust, kein Rechteck-Artefakt auf mobilem Safari).
  Dahinter driftende Farbkleckser der aktiven Welt.
*/

export interface HeartSet {
  key: string;
  tex: string;
  bgId: string;
  ink: string;
  glow: string;
}

export const HEART_SETS: HeartSet[] = [
  {
    key: "Rosé",
    tex: "/backgrounds/worlds/rose.jpg",
    bgId: "rose",
    ink: "#7A3247",
    glow: "radial-gradient(circle, rgba(178,94,119,.26), rgba(169,130,59,.10) 55%, transparent 72%)",
  },
  {
    key: "Petrol",
    tex: "/backgrounds/worlds/petrol-gold.jpg",
    bgId: "petrol-gold",
    ink: "#234E50",
    glow: "radial-gradient(circle, rgba(63,107,110,.26), rgba(169,130,59,.12) 55%, transparent 72%)",
  },
  {
    key: "Blau",
    tex: "/backgrounds/worlds/navy-gold.jpg",
    bgId: "navy-gold",
    ink: "#1E2E52",
    glow: "radial-gradient(circle, rgba(40,60,100,.26), rgba(169,130,59,.12) 55%, transparent 72%)",
  },
];

export function bgIdForWorld(key: string): string {
  return (HEART_SETS.find((s) => s.key === key) ?? HEART_SETS[0]).bgId;
}

const HEART_PATH =
  "M50 88 C 20 66 4 46 4 28 C 4 14 15 5 27 5 C 37 5 45 11 50 21 C 55 11 63 5 73 5 C 85 5 96 14 96 28 C 96 46 80 66 50 88 Z";

type Slot = "center" | "left" | "right";

const SLOTS: Record<Slot, { transform: string; z: number; opacity: number; name: number }> = {
  center: { transform: "rotate(0deg) translateY(-16px) scale(1.06)", z: 30, opacity: 1, name: 1 },
  left: { transform: "rotate(-22deg) translateX(-14%) scale(.9)", z: 12, opacity: 0.82, name: 0 },
  right: { transform: "rotate(22deg) translateX(14%) scale(.9)", z: 12, opacity: 0.82, name: 0 },
};

interface HeartFanProps {
  active: string;
  onSelect: (key: string) => void;
  name: string;
  sizeLabel: string;
}

export function HeartFan({ active, onSelect, name, sizeLabel }: HeartFanProps) {
  const activeSet = HEART_SETS.find((s) => s.key === active) ?? HEART_SETS[0];
  const others = HEART_SETS.filter((s) => s.key !== active);
  const slotFor = (key: string): Slot =>
    key === active ? "center" : others[0]?.key === key ? "left" : "right";

  return (
    <div className="mx-auto w-full max-w-lg">
      <div
        className="animate-heartfloat relative"
        style={{ height: "min(90vw, 500px)" }}
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

        {HEART_SETS.map((set, idx) => {
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
                bottom: "5%",
                left: "50%",
                marginLeft: "-36%",
                width: "min(340px, 72%)",
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
              {/* Herz mit Tiefe, Glanz & Gold-Kante – wie eine echte Leinwand */}
              <svg
                viewBox="0 0 100 92"
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  overflow: "visible",
                  filter: "drop-shadow(0 14px 22px rgba(45,22,30,.28))",
                }}
                aria-hidden
              >
                <defs>
                  <clipPath id={`hc-${idx}`}>
                    <path d={HEART_PATH} />
                  </clipPath>
                  <linearGradient id={`hs-${idx}`} x1="16%" y1="8%" x2="70%" y2="84%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
                    <stop offset="30%" stopColor="rgba(255,255,255,0.03)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  </linearGradient>
                </defs>
                <image
                  href={set.tex}
                  x="0"
                  y="0"
                  width="100"
                  height="92"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath={`url(#hc-${idx})`}
                />
                {/* nur zarter Glanz (versiegelte Leinwand) – KEIN Gold-Rahmen */}
                <path d={HEART_PATH} fill={`url(#hs-${idx})`} />
              </svg>
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
                  dir="rtl"
                  lang="ar"
                  style={{
                    // Kalligrafie immer in Schwarz (wie auf dem echten Werk).
                    fontFamily: "var(--font-aref)",
                    color: "#1b1714",
                    fontSize: "clamp(34px, 8vw, 58px)",
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
            className="h-9 w-9 rounded-full bg-cover bg-center transition"
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
