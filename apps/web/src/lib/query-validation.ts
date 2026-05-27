import { z } from 'zod';

/**
 * Parse and validate an integer query parameter
 * Returns the value if valid, otherwise returns default
 */
export function parseIntParam(
  value: string | null,
  config: {
    default: number;
    min?: number;
    max?: number;
  }
): number {
  if (!value) {
    return config.default;
  }

  const num = Number.parseInt(value, 10);

  if (Number.isNaN(num)) {
    return config.default;
  }

  if (config.min !== undefined && num < config.min) {
    return config.default;
  }

  if (config.max !== undefined && num > config.max) {
    return config.default;
  }

  return num;
}

/**
 * Parse and validate a string enum query parameter
 * Returns the value if it matches one of the allowed values, otherwise returns default
 */
export function parseEnumParam<T extends readonly string[]>(
  value: string | null,
  allowedValues: T,
  defaultValue: T[number]
): T[number] {
  if (!value) {
    return defaultValue;
  }

  if (allowedValues.includes(value as T[number])) {
    return value as T[number];
  }

  return defaultValue;
}

/**
 * Schema for validating time range parameters (week, month, year)
 */
export const timeRangeSchema = z.enum(['week', 'month', 'year']);
export type TimeRange = z.infer<typeof timeRangeSchema>;

/**
 * Parse and validate a time range query parameter
 */
export function parseTimeRangeParam(
  value: string | null,
  defaultValue: TimeRange = 'week'
): TimeRange {
  return parseEnumParam(
    value,
    ['week', 'month', 'year'] as const,
    defaultValue
  );
}

/**
 * Schema for validating Spotify time range parameters
 */
export const spotifyTimeRangeSchema = z.enum([
  'short_term',
  'medium_term',
  'long_term',
]);
export type SpotifyTimeRange = z.infer<typeof spotifyTimeRangeSchema>;

/**
 * Parse and validate a Spotify time range query parameter
 */
export function parseSpotifyTimeRangeParam(
  value: string | null,
  defaultValue: SpotifyTimeRange = 'medium_term'
): SpotifyTimeRange {
  return parseEnumParam(
    value,
    ['short_term', 'medium_term', 'long_term'] as const,
    defaultValue
  );
}
