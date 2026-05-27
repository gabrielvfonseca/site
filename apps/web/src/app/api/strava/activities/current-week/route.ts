import { stravaClient } from '@gabfon/strava';
import { type NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/strava/activities/current-week
 * Returns current week's activities
 */
export async function GET(_request: NextRequest) {
  try {
    const activities = await stravaClient.getCurrentWeekActivities();

    return NextResponse.json(activities, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=300', // 5 minutes
      },
    });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to fetch current week activities' },
      { status: 500 }
    );
  }
}
