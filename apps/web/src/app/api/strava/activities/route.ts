import { stravaClient } from '@gabfon/strava';
import { type NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/strava/activities
 * Returns Strava activities
 * Query parameters:
 * - per_page: number of activities to return (default: 30)
 * - time_range: week, month, or year (optional)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const perPage = Number.parseInt(searchParams.get('per_page') || '30', 10);
    const timeRange = searchParams.get('time_range') as
      | 'week'
      | 'month'
      | 'year'
      | undefined;

    let activities;
    switch (timeRange) {
      case 'week':
        activities = await stravaClient.getCurrentWeekActivities();
        break;
      case 'month':
        activities = await stravaClient.getCurrentMonthActivities();
        break;
      case 'year':
        activities = await stravaClient.getCurrentYearActivities();
        break;
      default:
        activities = await stravaClient.getActivities(perPage);
    }

    return NextResponse.json(activities, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=300', // 5 minutes
      },
    });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to fetch Strava activities' },
      { status: 500 }
    );
  }
}
