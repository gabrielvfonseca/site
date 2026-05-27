import { spotifyClient } from '@gabfon/spotify';
import type { NextRequest } from 'next/server';
import { handleApiError, successResponse } from '@/lib/api-error-handler';
import {
  parseIntParam,
  parseSpotifyTimeRangeParam,
} from '@/lib/query-validation';

/**
 * GET /api/spotify/top-artists
 * Returns user's top artists
 * Query parameters:
 * - time_range: short_term, medium_term, or long_term (default: medium_term)
 * - limit: number of artists to return (default: 50, min: 1, max: 50)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const timeRange = parseSpotifyTimeRangeParam(
      searchParams.get('time_range')
    );
    const limit = parseIntParam(searchParams.get('limit'), {
      default: 50,
      min: 1,
      max: 50,
    });

    const topArtists = await spotifyClient.getTopArtists(timeRange, limit);

    return successResponse(topArtists, { cacheControl: 'long' });
  } catch (error) {
    return handleApiError(error, {
      route: '/api/spotify/top-artists',
      defaultMessage: 'Failed to fetch top artists',
    });
  }
}
