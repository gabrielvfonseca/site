import { stravaClient } from '@gabfon/strava';
import { type NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/strava/stats
 * Returns Strava athlete statistics
 */
export async function GET(_request: NextRequest) {
  try {
    const stats = await stravaClient.getAthleteStats();

    return NextResponse.json(stats, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=3600', // 1 hour
      },
    });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to fetch Strava statistics' },
      { status: 500 }
    );
  }
}
