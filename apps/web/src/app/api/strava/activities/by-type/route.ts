import { stravaClient } from '@gabfon/strava';
import type { NextRequest } from 'next/server';
import {
  handleApiError,
  handleValidationError,
  successResponse,
} from '@/lib/api-error-handler';
import { parseIntParam } from '@/lib/query-validation';

interface StravaActivity {
  type: string;
}

/**
 * GET /api/strava/activities/by-type
 * Returns activities filtered by type
 * Query parameters:
 * - type: activity type (Ride, Run, Swim, etc.) - REQUIRED
 * - per_page: number of activities to return (default: 30, min: 1, max: 100)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (!type) {
      return handleValidationError('Missing required parameter: type', 400);
    }

    const perPage = parseIntParam(searchParams.get('per_page'), {
      default: 30,
      min: 1,
      max: 100,
    });

    const activities = await stravaClient.getActivitiesByType(
      type as 'Ride' | 'Run' | 'Swim' | 'Workout' | 'Hike' | 'Walk',
      perPage
    );

    return successResponse(activities, { cacheControl: 'short' });
  } catch (error) {
    return handleApiError(error, {
      route: '/api/strava/activities/by-type',
      defaultMessage: 'Failed to fetch activities by type',
    });
  }
}
