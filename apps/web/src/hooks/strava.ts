import { stravaHooksFactory } from './use-strava';

export const useAthlete = stravaHooksFactory('useAthlete');
export const useAthleteStats = stravaHooksFactory('useAthleteStats');
export const useActivities = stravaHooksFactory('useActivities');
export const useActivity = stravaHooksFactory('useActivity');
export const useCurrentWeekActivities = stravaHooksFactory(
  'useCurrentWeekActivities'
);
export const useCurrentMonthActivities = stravaHooksFactory(
  'useCurrentMonthActivities'
);
export const useCurrentYearActivities = stravaHooksFactory(
  'useCurrentYearActivities'
);
export const useAthleteAchievements = stravaHooksFactory(
  'useAthleteAchievements'
);
export const useActivitiesByType = stravaHooksFactory('useActivitiesByType');
export const useDistanceStats = stravaHooksFactory('useDistanceStats');
export const useTimeStats = stravaHooksFactory('useTimeStats');
