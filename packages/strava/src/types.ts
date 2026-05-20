import { z } from 'zod';

/**
 * Strava athlete information
 */
export const StravaAthleteSchema = z.object({
  id: z.number(),
  username: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  country: z.string().nullable(),
  sex: z.enum(['M', 'F', 'O']).nullable(),
  premium: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
  badge_type_id: z.number(),
  profile_medium: z.string(),
  profile: z.string(),
  friend: z.null(),
  follower: z.null(),
  email: z.string().nullable(),
  ftp: z.number().nullable(),
  weight: z.number().nullable(),
  clubs: z.array(z.unknown()),
  bikes: z.array(
    z.object({
      id: z.string(),
      primary: z.boolean(),
      name: z.string(),
      resource_state: z.number(),
      distance: z.number(),
    })
  ),
  shoes: z.array(
    z.object({
      id: z.string(),
      primary: z.boolean(),
      name: z.string(),
      resource_state: z.number(),
      distance: z.number(),
    })
  ),
});

/**
 * Strava activity statistics
 */
export const StravaAthleteStatsSchema = z.object({
  biggest_ride_distance: z.number(),
  biggest_climb_elevation_gain: z.number(),
  recent_ride_totals: z.object({
    count: z.number(),
    distance: z.number(),
    moving_time: z.number(),
    elapsed_time: z.number(),
    elevation_gain: z.number(),
    achievement_count: z.number(),
  }),
  recent_run_totals: z.object({
    count: z.number(),
    distance: z.number(),
    moving_time: z.number(),
    elapsed_time: z.number(),
    elevation_gain: z.number(),
    achievement_count: z.number(),
  }),
  recent_swim_totals: z.object({
    count: z.number(),
    distance: z.number(),
    moving_time: z.number(),
    elapsed_time: z.number(),
    elevation_gain: z.number(),
    achievement_count: z.number(),
  }),
  ytd_ride_totals: z.object({
    count: z.number(),
    distance: z.number(),
    moving_time: z.number(),
    elapsed_time: z.number(),
    elevation_gain: z.number(),
    achievement_count: z.number(),
  }),
  ytd_run_totals: z.object({
    count: z.number(),
    distance: z.number(),
    moving_time: z.number(),
    elapsed_time: z.number(),
    elevation_gain: z.number(),
    achievement_count: z.number(),
  }),
  ytd_swim_totals: z.object({
    count: z.number(),
    distance: z.number(),
    moving_time: z.number(),
    elapsed_time: z.number(),
    elevation_gain: z.number(),
    achievement_count: z.number(),
  }),
  all_ride_totals: z.object({
    count: z.number(),
    distance: z.number(),
    moving_time: z.number(),
    elapsed_time: z.number(),
    elevation_gain: z.number(),
    achievement_count: z.number(),
  }),
  all_run_totals: z.object({
    count: z.number(),
    distance: z.number(),
    moving_time: z.number(),
    elapsed_time: z.number(),
    elevation_gain: z.number(),
    achievement_count: z.number(),
  }),
  all_swim_totals: z.object({
    count: z.number(),
    distance: z.number(),
    moving_time: z.number(),
    elapsed_time: z.number(),
    elevation_gain: z.number(),
    achievement_count: z.number(),
  }),
});

/**
 * Strava activity information
 */
export const StravaActivitySchema = z.object({
  id: z.number(),
  name: z.string(),
  distance: z.number(),
  moving_time: z.number(),
  elapsed_time: z.number(),
  total_elevation_gain: z.number(),
  elev_high: z.number().nullable(),
  elev_low: z.number().nullable(),
  type: z.enum([
    'Ride',
    'Run',
    'Swim',
    'Workout',
    'Hike',
    'Walk',
    'AlpineSki',
    'BackcountrySki',
    'Canoeing',
    'Crossfit',
    'EBikeRide',
    'Elliptical',
    'Golf',
    'Handcycle',
    'IceSkate',
    'InlineSkate',
    'Kayaking',
    'Kitesurf',
    'NordicSki',
    'RockClimbing',
    'RollerSki',
    'Rowing',
    'Snowboard',
    'Snowshoe',
    'StairStepper',
    'StandUpPaddling',
    'Surfing',
    'VirtualRide',
    'VirtualRun',
    'WeightTraining',
    'Wheelchair',
    'Windsurf',
    'Yoga',
  ]),
  sport_type: z.enum([
    'Ride',
    'Run',
    'Swim',
    'Workout',
    'Hike',
    'Walk',
    'AlpineSki',
    'BackcountrySki',
    'Canoeing',
    'Crossfit',
    'EBikeRide',
    'Elliptical',
    'Golf',
    'Handcycle',
    'IceSkate',
    'InlineSkate',
    'Kayaking',
    'Kitesurf',
    'NordicSki',
    'RockClimbing',
    'RollerSki',
    'Rowing',
    'Snowboard',
    'Snowshoe',
    'StairStepper',
    'StandUpPaddling',
    'Surfing',
    'VirtualRide',
    'VirtualRun',
    'WeightTraining',
    'Wheelchair',
    'Windsurf',
    'Yoga',
  ]),
  start_date: z.string(),
  start_date_local: z.string(),
  timezone: z.string(),
  utc_offset: z.number(),
  start_latlng: z.array(z.number()).nullable(),
  end_latlng: z.array(z.number()).nullable(),
  location_city: z.string().nullable(),
  location_state: z.string().nullable(),
  location_country: z.string().nullable(),
  achievement_count: z.number(),
  kudos_count: z.number(),
  comment_count: z.number(),
  athlete_count: z.number(),
  photo_count: z.number(),
  map: z.object({
    id: z.string(),
    summary_polyline: z.string(),
    resource_state: z.number(),
  }),
  trainer: z.boolean(),
  commute: z.boolean(),
  manual: z.boolean(),
  private: z.boolean(),
  flagged: z.boolean(),
  workout_type: z.number().nullable(),
  gear_id: z.string().nullable(),
  average_speed: z.number(),
  max_speed: z.number(),
  average_cadence: z.number().nullable(),
  average_watts: z.number().nullable(),
  weighted_average_watts: z.number().nullable(),
  kilojoules: z.number().nullable(),
  device_watts: z.boolean(),
  has_heartrate: z.boolean(),
  average_heartrate: z.number().nullable(),
  max_heartrate: z.number().nullable(),
  max_watts: z.number().nullable(),
  pr_count: z.number(),
  total_photo_count: z.number(),
  has_kudoed: z.boolean(),
  suffer_score: z.number().nullable(),
  description: z.string().nullable(),
  calories: z.number().nullable(),
  segment_efforts: z.array(z.unknown()),
  splits_metric: z.array(z.unknown()),
  splits_standard: z.array(z.unknown()),
  best_efforts: z.array(z.unknown()),
});

/**
 * Strava achievement
 */
export const StravaAchievementSchema = z.object({
  id: z.number(),
  rank: z.number(),
  type: z.enum(['overall', 'pr', 'segment']),
  effort_id: z.number().nullable(),
  segment_id: z.number().nullable(),
  activity_type: z.string(),
  rank_type: z.string(),
  start_date: z.string(),
  start_date_local: z.string(),
  achievement_type: z.string(),
});

/**
 * API response wrapper
 */
export const StravaApiResponseSchema = z.object({
  data: z.unknown(),
  status: z.number(),
  headers: z.record(z.string(), z.string()),
});

/**
 * Types for Strava API
 */
export type StravaAthlete = z.infer<typeof StravaAthleteSchema>;
export type StravaAthleteStats = z.infer<typeof StravaAthleteStatsSchema>;
export type StravaActivity = z.infer<typeof StravaActivitySchema>;
export type StravaAchievement = z.infer<typeof StravaAchievementSchema>;
export type StravaApiResponse = z.infer<typeof StravaApiResponseSchema>;
