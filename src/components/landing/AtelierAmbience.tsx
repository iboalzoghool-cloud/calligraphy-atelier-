"use client";

import dynamic from "next/dynamic";

// three.js erst clientseitig & lazy laden (eigener Chunk, kein SSR).
const InkBackground = dynamic(() => import("@/components/ui/InkBackground"), {
  ssr: false,
});

export function AtelierAmbience({ className }: { className?: string }) {
  return <InkBackground className={className} />;
}
