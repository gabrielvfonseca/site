import { stravaClient } from '@gabfon/strava';
import { type NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/strava/stats/distance
 * Returns distance statistics for time range
 * Query parameters:
 * - time_range: week, month, or year (default: week)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange =
      (searchParams.get('time_range') as 'week' | 'month' | 'year') || 'week';

    const distance = await stravaClient.getDistanceStats(timeRange);

    return NextResponse.json(
      { distance },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=300', // 5 minutes
        },
      }
    );
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to fetch distance statistics' },
      { status: 500 }
    );
  }
}
