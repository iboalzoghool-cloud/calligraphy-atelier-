"use client";

import { useEffect, useRef, useState } from "react";
import type { ConfiguratorState } from "@/lib/configurator/types";
import { getBackground, heartSrcFor, PLACEHOLDER_NAME } from "@/lib/configurator/options";
import { drawArtwork } from "@/lib/configurator/render";
import { resolveDrawInput, ensureFontsLoaded } from "@/lib/configurator/compose";
import { loadImage } from "@/lib/configurator/image-cache";
import { FloatingFrame } from "@/components/ui/FloatingFrame";

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

  return (
    <FloatingFrame interactive={interactive} className={className}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Live-Vorschau deiner Gestaltung"
        className="block h-auto w-full select-none"
      />
    </FloatingFrame>
  );
}
