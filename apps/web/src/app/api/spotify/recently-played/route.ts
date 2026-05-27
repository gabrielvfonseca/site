import { spotifyClient } from '@gabfon/spotify';
import { type NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/spotify/recently-played
 * Returns recently played tracks
 * Query parameters:
 * - limit: number of tracks to return (default: 50)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Number.parseInt(searchParams.get('limit') || '50', 10);

    const recentTracks = await spotifyClient.getRecentlyPlayed(limit);

    return NextResponse.json(recentTracks, {
      status: 200,
      headers: {
        'Cache-Control': 's-maxage=300, stale-while-revalidate=600, public', // CDN cache 5 minutes, stale while revalidate 10 minutes
      },
    });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to fetch recently played tracks' },
      { status: 500 }
    );
  }
}
