import { spotifyClient } from '@gabfon/spotify';
import type { NextRequest } from 'next/server';
import { handleApiError, successResponse } from '@/lib/api-error-handler';

/**
 * GET /api/spotify/currently-playing
 * Returns currently playing track or null if nothing is playing
 */
export async function GET(_request: NextRequest) {
  try {
    const currentlyPlaying = await spotifyClient.getCurrentlyPlaying();

    return successResponse(currentlyPlaying, { cacheControl: 'no-cache' });
  } catch (error) {
    return handleApiError(error, {
      route: '/api/spotify/currently-playing',
      defaultMessage: 'Failed to fetch currently playing track',
    });
  }
}
