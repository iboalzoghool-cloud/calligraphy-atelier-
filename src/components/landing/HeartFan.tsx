"use client";

/*
  Herz-Fächer: das handgemalte Herz als Hauptprodukt, drei Farbwelten
  aufgefächert wie Karten. Das aktive Herz steht aufrecht vorn, die anderen
  fächern nach links/rechts. Weiche, langsame Tinten-Übergänge – nichts blinkt.

  Robust: die Herzform kommt aus einem inline-SVG `clipPath` (kein CSS-mask,
  der auf mobilem Safari kippen und ein Rechteck zeigen kann). Echte Ink-Welt-
  Texturen; sobald freigestellte heart-<welt>.png in /public liegen, einfach
  das <image href> tauschen.
*/

export interface HeartSet {
  key: string;
  tex: string;
  /** passende Konfigurator-Farbwelt (wird beim „Weiter" übernommen). */
  bgId: string;
  /** Tintenfarbe des Namens auf diesem Herz. */
  ink: string;
  glow: string;
}

export const HEART_SETS: HeartSet[] = [
  {
    key: "Rosé",
    tex: "/backgrounds/worlds/rose.jpg",
    bgId: "rose",
    ink: "#7A3247",
    glow: "radial-gradient(circle, rgba(178,94,119,.24), rgba(169,130,59,.10) 55%, transparent 72%)",
  },
  {
    key: "Petrol",
    tex: "/backgrounds/worlds/petrol-gold.jpg",
    bgId: "petrol-gold",
    ink: "#234E50",
    glow: "radial-gradient(circle, rgba(63,107,110,.24), rgba(169,130,59,.12) 55%, transparent 72%)",
  },
  {
    key: "Blau",
    tex: "/backgrounds/worlds/navy-gold.jpg",
    bgId: "navy-gold",
    ink: "#1E2E52",
    glow: "radial-gradient(circle, rgba(40,60,100,.24), rgba(169,130,59,.12) 55%, transparent 72%)",
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
  /** Arabischer Name, der auf dem vorderen Herz eingeblendet wird. */
  name: string;
  /** Größenangabe, z. B. „29 × 29 cm". */
  sizeLabel: string;
}

export function HeartFan({ active, onSelect, name, sizeLabel }: HeartFanProps) {
  const activeSet = HEART_SETS.find((s) => s.key === active) ?? HEART_SETS[0];
  const others = HEART_SETS.filter((s) => s.key !== active);
  const slotFor = (key: string): Slot =>
    key === active ? "center" : others[0]?.key === key ? "left" : "right";

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="relative" style={{ height: "min(80vw, 460px)" }}>
        {/* weicher, mitwandernder Glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "50%",
            top: "46%",
            width: "min(440px, 96%)",
            aspectRatio: "1 / 1",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background: activeSet.glow,
            filter: "blur(6px)",
            transition: "background 1.1s ease",
            zIndex: 0,
          }}
        />

        {HEART_SETS.map((set, idx) => {
          const slot = SLOTS[slotFor(set.key)];
          const clipId = `heartclip-${idx}`;
          return (
            <button
              key={set.key}
              type="button"
              onClick={() => onSelect(set.key)}
              aria-label={`Farbwelt ${set.key}`}
              aria-pressed={set.key === active}
              style={{
                position: "absolute",
                bottom: "6%",
                left: "50%",
                marginLeft: "-32%",
                width: "min(300px, 64%)",
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
              {/* Herz = echte Ink-Textur, sauber per SVG-clipPath in Herzform */}
              <svg
                viewBox="0 0 100 92"
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  filter: "drop-shadow(0 16px 24px rgba(45,22,30,.30))",
                }}
                aria-hidden
              >
                <defs>
                  <clipPath id={clipId}>
                    <path d={HEART_PATH} />
                  </clipPath>
                </defs>
                <image
                  href={set.tex}
                  x="0"
                  y="0"
                  width="100"
                  height="92"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath={`url(#${clipId})`}
                />
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
                    fontFamily: "var(--font-aref)",
                    color: set.ink,
                    fontSize: "clamp(30px, 7vw, 52px)",
                    lineHeight: 1,
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
      <div className="mt-4 flex items-center justify-center gap-3">
        {HEART_SETS.map((s) => (
          <button
            key={s.key}
            type="button"
            onClick={() => onSelect(s.key)}
            aria-label={`Farbwelt ${s.key}`}
            aria-pressed={s.key === active}
            className="h-8 w-8 rounded-full bg-cover bg-center transition"
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
