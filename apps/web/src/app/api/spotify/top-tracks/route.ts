import { spotifyClient } from '@gabfon/spotify';
import { type NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/spotify/top-tracks
 * Returns user's top tracks
 * Query parameters:
 * - time_range: short_term, medium_term, or long_term (default: medium_term)
 * - limit: number of tracks to return (default: 50)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange =
      (searchParams.get('time_range') as
        | 'short_term'
        | 'medium_term'
        | 'long_term') || 'medium_term';
    const limit = Number.parseInt(searchParams.get('limit') || '50', 10);

    const topTracks = await spotifyClient.getTopTracks(timeRange, limit);

    return NextResponse.json(topTracks, {
      status: 200,
      headers: {
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=7200, public', // CDN cache 1 hour, stale while revalidate 2 hours
      },
    });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to fetch top tracks' },
      { status: 500 }
    );
  }
}
