import { stravaClient } from '@gabfon/strava';
import { type NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/strava/activities/by-type
 * Returns activities filtered by type
 * Query parameters:
 * - type: activity type (Ride, Run, Swim, etc.)
 * - per_page: number of activities to return (default: 30)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') as StravaActivity['type'];
    const perPage = Number.parseInt(searchParams.get('per_page') || '30', 10);

    if (!type) {
      return NextResponse.json(
        { error: 'Missing required parameter: type' },
        { status: 400 }
      );
    }

    const activities = await stravaClient.getActivitiesByType(type, perPage);

    return NextResponse.json(activities, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=300', // 5 minutes
      },
    });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to fetch activities by type' },
      { status: 500 }
    );
  }
}
