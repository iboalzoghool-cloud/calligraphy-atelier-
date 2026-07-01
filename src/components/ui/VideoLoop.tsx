"use client";

import { useEffect, useRef } from "react";

interface VideoLoopProps {
  src: string;
  poster: string;
  className?: string;
}

/**
 * Stummer Loop-Clip für Hintergründe/Showcases.
 * Spielt nur, wenn im Viewport (spart mobile Daten), pausiert außerhalb.
 * Bei prefers-reduced-motion bleibt das Poster stehen (keine Bewegung).
 * muted + playsInline → zuverlässiges Autoplay auch auf iOS.
 */
export function VideoLoop({ src, poster, className }: VideoLoopProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // Poster bleibt stehen

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const p = v.play();
          if (p) p.catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
    />
  );
}
