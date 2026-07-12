import { type NextRequest, NextResponse } from 'next/server';
import { env } from '@/config/env';
import { SPOTS, type Spot, type SpotCategory } from '@/constants/spots';
import { checkRateLimit, rateLimitHeaders } from '@/lib/rate-limit';

/**
 * GET /api/spots
 *
 * Returns the coffee and work spots shown on the `/now` map.
 *
 * When `GOOGLE_MAPS_API_KEY` and `GOOGLE_MAPS_LIST_ID` are both configured the
 * list is resolved live from Google Maps (each entry in `GOOGLE_MAPS_LIST_ID` is
 * either a place ID or a list id; place ids are read directly via the Places API
 * "Place Details" endpoint). Otherwise the curated static list in
 * `@/constants/spots` is returned, so the map always renders something.
 */

/** Shape returned to the client — matches `@/constants/spots`'s `Spot`. */
type SpotResponse = Spot;

const PLACES_API = 'https://places.googleapis.com/v1/places';

/** Google place "types" that imply a coffee stop rather than a work spot. */
const COFFEE_TYPES = new Set([
  'cafe',
  'coffee_shop',
  'bakery',
  'restaurant',
  'food',
  'meal_takeaway',
]);

/**
 * Classify a place as `coffee` or `work` from its Google place types.
 * @param types - The place's type array from the Places API.
 * @returns The spot category.
 */
function classify(types: string[] | undefined): SpotCategory {
  if (types?.some((type) => COFFEE_TYPES.has(type))) {
    return 'coffee';
  }
  return 'work';
}

/**
 * Resolve a single Google place id to a `Spot` via the Places API (New).
 * @param placeId - The Google Maps place id.
 * @param key - The server-side API key.
 * @returns The resolved spot, or `null` on failure.
 */
async function resolvePlace(
  placeId: string,
  key: string
): Promise<Spot | null> {
  try {
    const res = await fetch(
      `${PLACES_API}/${encodeURIComponent(placeId)}?fields=displayName,formattedAddress,location,types`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': key,
          'X-Goog-FieldMask':
            'displayName,formattedAddress,location.latitude,location.longitude,types',
        },
        // Cache for an hour; the list changes rarely.
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) {
      return null;
    }
    const data = (await res.json()) as {
      displayName?: { text?: string };
      formattedAddress?: string;
      location?: { latitude?: number; longitude?: number };
      types?: string[];
    };
    if (
      !data.displayName?.text ||
      data.location?.latitude == null ||
      data.location?.longitude == null
    ) {
      return null;
    }
    return {
      name: data.displayName.text,
      note: data.formattedAddress ?? 'A spot worth a visit.',
      category: classify(data.types),
      lat: data.location.latitude,
      lng: data.location.longitude,
    };
  } catch {
    return null;
  }
}

/**
 * Build the live spot list from Google Maps.
 * @param listId - Comma-separated place ids (or a list id).
 * @param key - The server-side API key.
 * @returns The resolved spots, or `null` if nothing resolved.
 */
async function loadFromGoogle(
  listId: string,
  key: string
): Promise<Spot[] | null> {
  const placeIds = listId
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);
  if (placeIds.length === 0) {
    return null;
  }
  const spots = (
    await Promise.all(placeIds.map((id) => resolvePlace(id, key)))
  ).filter((spot): spot is Spot => spot !== null);
  return spots.length > 0 ? spots : null;
}

/**
 * GET handler for `/api/spots`.
 * @param request - The incoming request (used for rate limiting).
 * @returns The spot list, preferring Google Maps when configured.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const limit = await checkRateLimit(request, {
    prefix: 'gabfon:spots',
    requests: 30,
    window: '60 s',
  });
  if (limit && !limit.success) {
    return NextResponse.json(
      { error: 'Too many requests.' },
      { status: 429, headers: rateLimitHeaders(limit) }
    );
  }

  let spots: SpotResponse[] = [...SPOTS];
  let source: 'google' | 'static' = 'static';

  if (env.GOOGLE_MAPS_API_KEY && env.GOOGLE_MAPS_LIST_ID) {
    const live = await loadFromGoogle(
      env.GOOGLE_MAPS_LIST_ID,
      env.GOOGLE_MAPS_API_KEY
    );
    if (live) {
      spots = live;
      source = 'google';
    }
  }

  return NextResponse.json(
    { spots, source },
    { headers: { 'Cache-Control': 'public, max-age=300, s-maxage=300' } }
  );
}
