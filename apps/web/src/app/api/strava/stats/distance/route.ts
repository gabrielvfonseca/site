import { stravaClient } from '@gabfon/strava';
import type { NextRequest } from 'next/server';
import { handleApiError, successResponse } from '@/lib/api-error-handler';
import { parseTimeRangeParam } from '@/lib/query-validation';

/**
 * GET /api/strava/stats/distance
 * Returns distance statistics for time range
 * Query parameters:
 * - time_range: week, month, or year (default: week)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = parseTimeRangeParam(searchParams.get('time_range'));

    const distance = await stravaClient.getDistanceStats(timeRange);

    return successResponse({ distance }, { cacheControl: 'short' });
  } catch (error) {
    return handleApiError(error, {
      route: '/api/strava/stats/distance',
      defaultMessage: 'Failed to fetch distance statistics',
    });
  }
}
