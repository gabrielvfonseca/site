import { stravaClient } from '@gabfon/strava';
import type { StravaActivity } from '@gabfon/strava/types';
import { useQuery } from '@tanstack/react-query';

/**
 * Factory for creating Strava-related hooks.
 *
 * @param hookName - The name of the hook to create.
 * @returns The created hook.
 */
export const stravaHooksFactory = (hookName: string) => {
  switch (hookName) {
    case 'useAthlete':
      return () =>
        useQuery({
          queryKey: ['strava-athlete'],
          queryFn: () => stravaClient.getAthlete(),
        });
    case 'useAthleteStats':
      return (athleteId?: number) =>
        useQuery({
          queryKey: ['strava-athlete-stats', athleteId],
          queryFn: () => stravaClient.getAthleteStats(athleteId),
          enabled: !!athleteId,
        });
    case 'useActivities':
      return (perPage = 30, page = 1, before?: number, after?: number) =>
        useQuery({
          queryKey: ['strava-activities', perPage, page, before, after],
          queryFn: () =>
            stravaClient.getActivities(perPage, page, before, after),
        });
    case 'useActivity':
      return (activityId: number, includeAllEfforts = false) =>
        useQuery({
          queryKey: ['strava-activity', activityId, includeAllEfforts],
          queryFn: () =>
            stravaClient.getActivity(activityId, includeAllEfforts),
          enabled: !!activityId,
        });
    case 'useCurrentWeekActivities':
      return () =>
        useQuery({
          queryKey: ['strava-current-week-activities'],
          queryFn: () => stravaClient.getCurrentWeekActivities(),
        });
    case 'useCurrentMonthActivities':
      return () =>
        useQuery({
          queryKey: ['strava-current-month-activities'],
          queryFn: () => stravaClient.getCurrentMonthActivities(),
        });
    case 'useCurrentYearActivities':
      return () =>
        useQuery({
          queryKey: ['strava-current-year-activities'],
          queryFn: () => stravaClient.getCurrentYearActivities(),
        });
    case 'useAthleteAchievements':
      return () =>
        useQuery({
          queryKey: ['strava-athlete-achievements'],
          queryFn: () => stravaClient.getAthleteAchievements(),
        });
    case 'useActivitiesByType':
      return (type: StravaActivity['type'], perPage = 30) =>
        useQuery({
          queryKey: ['strava-activities-by-type', type, perPage],
          queryFn: () => stravaClient.getActivitiesByType(type, perPage),
        });
    case 'useDistanceStats':
      return (timeRange: 'week' | 'month' | 'year' = 'week') =>
        useQuery({
          queryKey: ['strava-distance-stats', timeRange],
          queryFn: () => stravaClient.getDistanceStats(timeRange),
        });
    case 'useTimeStats':
      return (timeRange: 'week' | 'month' | 'year' = 'week') =>
        useQuery({
          queryKey: ['strava-time-stats', timeRange],
          queryFn: () => stravaClient.getTimeStats(timeRange),
        });
    default:
      throw new Error(`Invalid hook name: ${hookName}`);
  }
};
