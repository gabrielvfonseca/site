'use client';

import 'leaflet/dist/leaflet.css';
import { useTheme } from '@gabfon/design-system/providers/theme';
import L from 'leaflet';
import type { JSX } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import {
  LISBON_CENTER,
  LISBON_SPOTS,
  LISBON_ZOOM,
  type LisbonSpotCategory,
} from '@/constants/lisbon-spots';

/** Emoji glyph shown inside each marker, per category. */
const CATEGORY_GLYPH: Record<LisbonSpotCategory, string> = {
  coffee: '☕',
  work: '💻',
};

/** Human-readable label per category, shown in the popup. */
const CATEGORY_LABEL: Record<LisbonSpotCategory, string> = {
  coffee: 'Coffee',
  work: 'Work',
};

/** Marker chip size in pixels (matches `.lisbon-pin` in main.css). */
const PIN_SIZE = 32;
/** Marker center offset (half the size), so the chip sits on its coordinate. */
const PIN_ANCHOR = 16;
/** Vertical offset that lifts popups clear of the chip. */
const POPUP_OFFSET = -18;

/**
 * Monochrome CARTO basemaps that match the site's grayscale palette, keyed by
 * resolved theme. Free to use with attribution; far cleaner than raster OSM.
 */
const TILE_URL: Record<'light' | 'dark', string> = {
  light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
  dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
};

/**
 * Builds a self-contained `divIcon` chip so markers render reliably under the
 * bundler (Leaflet's default image markers break when bundled) and pick up the
 * themed `.lisbon-pin` styling from main.css.
 * @param category - The spot category, selecting the glyph.
 * @returns A Leaflet `divIcon` for the given category.
 */
function createPin(category: LisbonSpotCategory): L.DivIcon {
  return L.divIcon({
    className: 'lisbon-pin-wrap',
    html: `<div class="lisbon-pin"><span>${CATEGORY_GLYPH[category]}</span></div>`,
    iconSize: [PIN_SIZE, PIN_SIZE],
    iconAnchor: [PIN_ANCHOR, PIN_ANCHOR],
    popupAnchor: [0, POPUP_OFFSET],
  });
}

/**
 * The interactive Leaflet map itself. Rendered client-side only (loaded via a
 * `dynamic({ ssr: false })` wrapper) because Leaflet touches `window` at import.
 * Tiles follow the active theme.
 * @returns The Lisbon spots map canvas.
 */
export default function LisbonMapCanvas(): JSX.Element {
  const { resolvedTheme } = useTheme();
  const mode = resolvedTheme === 'dark' ? 'dark' : 'light';

  return (
    <MapContainer
      center={[LISBON_CENTER[0], LISBON_CENTER[1]]}
      className="h-80 w-full"
      scrollWheelZoom={false}
      zoom={LISBON_ZOOM}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        key={mode}
        url={TILE_URL[mode]}
      />
      {LISBON_SPOTS.map((spot) => (
        <Marker
          icon={createPin(spot.category)}
          key={spot.name}
          position={[spot.lat, spot.lng]}
        >
          <Popup>
            <span className="font-semibold text-foreground">{spot.name}</span>
            <span className="mt-0.5 block text-[0.6875rem] text-muted-foreground uppercase tracking-wide">
              {CATEGORY_LABEL[spot.category]}
            </span>
            <span className="mt-1.5 block text-muted-foreground">
              {spot.note}
            </span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
