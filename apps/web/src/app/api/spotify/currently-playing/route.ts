import { spotifyClient } from '@gabfon/spotify';
import { type NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/spotify/currently-playing
 * Returns currently playing track or null if nothing is playing
 */
export async function GET(_request: NextRequest) {
  try {
    const currentlyPlaying = await spotifyClient.getCurrentlyPlaying();

    return NextResponse.json(currentlyPlaying, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate', // Real-time data
      },
    });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to fetch currently playing track' },
      { status: 500 }
    );
  }
}
