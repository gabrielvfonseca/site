/**
 * Hand-picked Lisbon spots for the `/now` map: places I actually like for
 * coffee and for getting focused work done. Update this list as favourites
 * change — it's the single source of truth for the map markers.
 */

/** Whether a spot is primarily a coffee stop or a place to work from. */
export type SpotCategory = 'coffee' | 'work';

/** A single mappable Lisbon spot. */
export interface Spot {
  /** Display name of the place. */
  readonly name: string;
  /** Short, personal note on why it's worth a visit. */
  readonly note: string;
  /** Whether it's a coffee stop or a work spot (drives the marker style). */
  readonly category: SpotCategory;
  /** Latitude in decimal degrees. */
  readonly lat: number;
  /** Longitude in decimal degrees. */
  readonly lng: number;
}

/** Latitude of Lisbon's approximate center. */
const CENTER_LAT = 38.7223;
/** Longitude of Lisbon's approximate center. */
const CENTER_LNG = -9.1393;

/** Approximate geographic center of Lisbon, used to frame the map. */
export const CENTER: readonly [number, number] = [CENTER_LAT, CENTER_LNG];

/** Default zoom level that comfortably fits the spots below. */
export const ZOOM = 13;

/**
 * Favourite Lisbon coffee and work spots shown on the `/now` map. These are
 * sensible, well-known starting points — swap in your own go-to places.
 *
 * Kept as a fallback so the map still renders when no Google Maps list is
 * configured (i.e. `GOOGLE_MAPS_LIST_ID` / `GOOGLE_MAPS_API_KEY` are absent).
 */
export const SPOTS: readonly Spot[] = [
  {
    name: 'Fábrica Coffee Roasters',
    note: 'Serious espresso in Baixa and my default when I want the coffee to do the talking.',
    category: 'coffee',
    lat: 38.7207,
    lng: -9.1435,
  },
  {
    name: 'Copenhagen Coffee Lab',
    note: 'Nordic-calm room in Príncipe Real — great flat whites and easy to lose an afternoon here.',
    category: 'coffee',
    lat: 38.7166,
    lng: -9.1516,
  },
  {
    name: 'Hello, Kristof',
    note: 'Magazines, natural light, and a slow morning coffee. Good for reading and thinking.',
    category: 'coffee',
    lat: 38.7095,
    lng: -9.1487,
  },
  {
    name: 'Dear Breakfast',
    note: 'Coffee plus a real breakfast — the reset spot between building sessions.',
    category: 'coffee',
    lat: 38.7112,
    lng: -9.1401,
  },
  {
    name: 'Comoba',
    note: 'Cais do Sodré brunch spot with excellent coffee and a calm, laptop-friendly corner.',
    category: 'coffee',
    lat: 38.7076,
    lng: -9.1449,
  },
  {
    name: 'Fauna & Flora',
    note: 'Plant-filled Santos favourite — the kind of place a quick coffee turns into two hours.',
    category: 'coffee',
    lat: 38.7092,
    lng: -9.1607,
  },
  {
    name: 'The Mill',
    note: 'Australian-style café off Poço dos Negros. Strong flat whites and good banana bread.',
    category: 'coffee',
    lat: 38.7128,
    lng: -9.1519,
  },
  {
    name: 'Café com Calma',
    note: 'Tiny Alcântara spot that lives up to its name — unhurried and great for a morning.',
    category: 'coffee',
    lat: 38.7048,
    lng: -9.1755,
  },
  {
    name: 'Buna',
    note: 'Campo de Ourique specialty coffee. Precise, quiet, and rarely crowded on weekdays.',
    category: 'coffee',
    lat: 38.7159,
    lng: -9.1668,
  },
  {
    name: 'Wish Slow Coffee House',
    note: 'Príncipe Real courtyard café — slow mornings, good light, better cortados.',
    category: 'coffee',
    lat: 38.7178,
    lng: -9.1493,
  },
  {
    name: 'Nannarella',
    note: 'Not coffee, but the Rato gelato stop I detour for between work sessions.',
    category: 'coffee',
    lat: 38.7185,
    lng: -9.1556,
  },
  {
    name: 'Second Home Lisboa',
    note: 'Jungle-of-a-coworking space inside Mercado da Ribeira — my pick for a proper deep-work day.',
    category: 'work',
    lat: 38.7069,
    lng: -9.1459,
  },
  {
    name: 'Heden Santos',
    note: 'Bright, quiet coworking with fast Wi-Fi when I need to actually ship something.',
    category: 'work',
    lat: 38.7101,
    lng: -9.1585,
  },
  {
    name: 'Cowork Central',
    note: 'Príncipe Real coworking with proper desks and meeting rooms for heads-down days.',
    category: 'work',
    lat: 38.7172,
    lng: -9.1509,
  },
  {
    name: 'Village Underground Lisboa',
    note: 'Shipping-container creative hub near Alcântara — a change of scene when I need one.',
    category: 'work',
    lat: 38.7027,
    lng: -9.1786,
  },
  {
    name: 'LACS Cais do Sodré',
    note: 'Polished riverside coworking, close to the ferries. Good for a focused half-day.',
    category: 'work',
    lat: 38.7061,
    lng: -9.1447,
  },
  {
    name: 'Biblioteca de Marvila',
    note: 'Riverside public library — silent, free, and my no-distraction reading-and-writing spot.',
    category: 'work',
    lat: 38.7405,
    lng: -9.0972,
  },
  {
    name: 'Selina Secret Garden',
    note: 'Baixa co-living café with a leafy patio — casual laptop work with a coffee in reach.',
    category: 'work',
    lat: 38.7118,
    lng: -9.1387,
  },
];
