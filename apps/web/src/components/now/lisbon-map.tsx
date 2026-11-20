"use client";

import dynamic from "next/dynamic";

/**
 * Leaflet reaches for `window` at import time, so the map canvas is loaded
 * client-side only. A muted placeholder holds the layout while it loads.
 */
const LisbonMapCanvas = dynamic(() => import("./lisbon-map-canvas"), {
  ssr: false,
  loading: () => <div className="bg-muted h-80 w-full animate-pulse" />,
});

/**
 * Lisbon map widget for `/now`: a theme-aware, monochrome map of my favourite
 * coffee and work spots. The map loads lazily on the client.
 * @returns The Lisbon spots map.
 */
export function LisbonMap() {
  return (
    <div className="bg-muted overflow-hidden rounded-xl border shadow-sm">
      <LisbonMapCanvas />
    </div>
  );
}
