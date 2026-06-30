"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import type { ConfiguratorState } from "@/lib/configurator/types";
import { getBackground, heartSrcFor, PLACEHOLDER_NAME } from "@/lib/configurator/options";
import { drawArtwork } from "@/lib/configurator/render";
import { resolveDrawInput, ensureFontsLoaded } from "@/lib/configurator/compose";
import { loadImage } from "@/lib/configurator/image-cache";

const LOGICAL = 560; // logische Zeichenfläche (px); CSS skaliert auf Container.

interface PreviewCanvasProps {
  state: ConfiguratorState;
  /** Pointer-Tilt (Konfigurator) vs. sanftes Eigen-Drehen (Hero). */
  interactive?: boolean;
  className?: string;
}

export function PreviewCanvas({
  state,
  interactive = true,
  className = "",
}: PreviewCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const heartImgRef = useRef<HTMLImageElement | null>(null);
  const [imgTick, setImgTick] = useState(0);
  const [fontsReady, setFontsReady] = useState(false);

  const reduce = useReducedMotion();
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const rotateX = useSpring(mvX, { stiffness: 90, damping: 14 });
  const rotateY = useSpring(mvY, { stiffness: 90, damping: 14 });

  // Fonts (inkl. Arabisch) laden, dann neu zeichnen.
  useEffect(() => {
    let cancelled = false;
    ensureFontsLoaded().then(() => {
      if (!cancelled) setFontsReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Foto-Hintergrund bei Bedarf laden.
  useEffect(() => {
    let cancelled = false;
    const bg = getBackground(state.backgroundId);
    if (bg.kind === "photo") {
      loadImage(bg.src)
        .then((img) => {
          if (cancelled) return;
          imgRef.current = img;
          setImgTick((t) => t + 1);
        })
        .catch(() => {
          if (cancelled) return;
          imgRef.current = null;
          setImgTick((t) => t + 1);
        });
    } else {
      imgRef.current = null;
      setImgTick((t) => t + 1);
    }
    return () => {
      cancelled = true;
    };
  }, [state.backgroundId]);

  // Freigestelltes Herz-Motiv (falls Form = Herz und Farbwelt eines hat).
  useEffect(() => {
    let cancelled = false;
    const src = state.shape === "heart" ? heartSrcFor(state.backgroundId) : undefined;
    if (src) {
      loadImage(src)
        .then((img) => {
          if (cancelled) return;
          heartImgRef.current = img;
          setImgTick((t) => t + 1);
        })
        .catch(() => {
          if (cancelled) return;
          heartImgRef.current = null;
          setImgTick((t) => t + 1);
        });
    } else {
      heartImgRef.current = null;
      setImgTick((t) => t + 1);
    }
    return () => {
      cancelled = true;
    };
  }, [state.shape, state.backgroundId]);

  // Zeichnen bei jeder Änderung.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    canvas.width = Math.round(LOGICAL * dpr);
    canvas.height = Math.round(LOGICAL * dpr);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const displayName = state.name.trim() || PLACEHOLDER_NAME;
    drawArtwork(
      ctx,
      resolveDrawInput(state, LOGICAL, imgRef.current, displayName, heartImgRef.current),
    );
  }, [state, fontsReady, imgTick]);

  function handleMove(e: React.PointerEvent) {
    if (reduce || !interactive) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    mvY.set(px * 18);
    mvX.set(-py * 14);
  }
  function handleLeave() {
    mvY.set(0);
    mvX.set(0);
  }

  const floatAnim = reduce
    ? undefined
    : interactive
      ? { y: [0, -10, 0] }
      : { y: [0, -10, 0], rotateY: [-9, 9, -9] };

  return (
    <div className={className} style={{ perspective: 1200 }}>
      <motion.div
        animate={floatAnim}
        transition={
          reduce
            ? undefined
            : {
                duration: interactive ? 6 : 11,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          onPointerMove={handleMove}
          onPointerLeave={handleLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            transformPerspective: 1200,
          }}
        >
          <canvas
            ref={canvasRef}
            role="img"
            aria-label="Live-Vorschau deiner Gestaltung"
            className="block h-auto w-full select-none"
            style={{ filter: "drop-shadow(0 26px 38px rgba(60,30,40,0.22))" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
