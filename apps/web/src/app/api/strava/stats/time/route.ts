import { stravaClient } from '@gabfon/strava';
import type { NextRequest } from 'next/server';
import { handleApiError, successResponse } from '@/lib/api-error-handler';
import { parseTimeRangeParam } from '@/lib/query-validation';

/**
 * GET /api/strava/stats/time
 * Returns time statistics for time range
 * Query parameters:
 * - time_range: week, month, or year (default: week)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = parseTimeRangeParam(searchParams.get('time_range'));

    const time = await stravaClient.getTimeStats(timeRange);

    return successResponse({ time }, { cacheControl: 'short' });
  } catch (error) {
    return handleApiError(error, {
      route: '/api/strava/stats/time',
      defaultMessage: 'Failed to fetch time statistics',
    });
  }
}
