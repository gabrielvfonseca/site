'use client';

import dynamic from 'next/dynamic';
import type { JSX } from 'react';

/**
 * Leaflet reaches for `window` at import time, so the map canvas is loaded
 * client-side only. A muted placeholder holds the layout while it loads.
 */
const LisbonMapCanvas = dynamic(() => import('./lisbon-map-canvas'), {
  ssr: false,
  loading: () => <div className="h-80 w-full animate-pulse bg-muted" />,
});

/**
 * Lisbon map widget for `/now`: a theme-aware, monochrome map of my favourite
 * coffee and work spots. The map loads lazily on the client.
 * @returns The Lisbon spots map.
 */
export function LisbonMap(): JSX.Element {
  return (
    <div className="overflow-hidden rounded-xl border bg-muted shadow-sm">
      <LisbonMapCanvas />
    </div>
  );
}
