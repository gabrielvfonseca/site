"use client";

import "leaflet/dist/leaflet.css";
import { useTheme } from "@gabfon/design-system/providers/theme";
import L from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { CENTER, ZOOM } from "@/data/spots";
import type { Spot, SpotCategory } from "@/data/spots";

/** Emoji glyph shown inside each marker, per category. */
const CATEGORY_GLYPH: Record<SpotCategory, string> = {
  coffee: "☕",
  work: "💻",
};

/** Human-readable label per category, shown in the popup. */
const CATEGORY_LABEL: Record<SpotCategory, string> = {
  coffee: "Coffee",
  work: "Work",
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
const TILE_URL: Record<"light" | "dark", string> = {
  light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
};

/**
 * Builds a self-contained `divIcon` chip so markers render reliably under the
 * bundler (Leaflet's default image markers break when bundled) and pick up the
 * themed `.lisbon-pin` styling from main.css.
 * @param category - The spot category, selecting the glyph.
 * @returns A Leaflet `divIcon` for the given category.
 */
function createPin(category: SpotCategory): L.DivIcon {
  return L.divIcon({
    className: "lisbon-pin-wrap",
    html: `<div class="lisbon-pin"><span>${CATEGORY_GLYPH[category]}</span></div>`,
    iconSize: [PIN_SIZE, PIN_SIZE],
    iconAnchor: [PIN_ANCHOR, PIN_ANCHOR],
    popupAnchor: [0, POPUP_OFFSET],
  });
}

/**
 * The interactive Leaflet map itself. Rendered client-side only (loaded via a
 * `dynamic({ ssr: false })` wrapper) because Leaflet touches `window` at import.
 * Spots are fetched from `/api/spots` so the map can be driven by a Google Maps
 * list when configured. Tiles follow the active theme.
 * @returns The Lisbon spots map canvas.
 */
export default function LisbonMapCanvas() {
  const { resolvedTheme } = useTheme();
  const mode = resolvedTheme === "dark" ? "dark" : "light";

  const [spots, setSpots] = useState<Spot[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const res = await fetch("/api/spots", {
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }
        const data = (await res.json()) as { spots: Spot[] };
        setSpots(data.spots);
      } catch (error_) {
        if (error_ instanceof DOMException && error_.name === "AbortError") {
          return;
        }
        setError(true);
      }
    };
    void load();
    return () => {
      controller.abort();
    };
  }, []);

  if (error) {
    return (
      <div className="bg-muted text-muted-foreground flex h-80 w-full items-center justify-center rounded-xl text-sm">
        Couldn&apos;t load the map spots right now.
      </div>
    );
  }

  if (!spots) {
    return <div className="bg-muted h-80 w-full animate-pulse" />;
  }

  return (
    <MapContainer
      center={[CENTER[0], CENTER[1]]}
      className="h-80 w-full"
      scrollWheelZoom={false}
      zoom={ZOOM}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        key={mode}
        url={TILE_URL[mode]}
      />
      {spots.map((spot) => (
        <Marker
          icon={createPin(spot.category)}
          key={spot.name}
          position={[spot.lat, spot.lng]}
        >
          <Popup>
            <span className="text-foreground">{spot.name}</span>
            <span className="text-muted-foreground mt-0.5 block text-[0.6875rem] tracking-wide uppercase">
              {CATEGORY_LABEL[spot.category]}
            </span>
            <span className="text-muted-foreground mt-1.5 block">
              {spot.note}
            </span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
