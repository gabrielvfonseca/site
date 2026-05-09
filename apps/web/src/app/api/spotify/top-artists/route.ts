import { spotifyClient } from '@gabfon/spotify';
import { type NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/spotify/top-artists
 * Returns user's top artists
 * Query parameters:
 * - time_range: short_term, medium_term, or long_term (default: medium_term)
 * - limit: number of artists to return (default: 50)
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

    const topArtists = await spotifyClient.getTopArtists(timeRange, limit);

    return NextResponse.json(topArtists, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=3600', // 1 hour
      },
    });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to fetch top artists' },
      { status: 500 }
    );
  }
}
