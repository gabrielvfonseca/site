// biome-ignore-all lint/style/useNamingConvention: raw API types mirror the WakaTime JSON shape (snake_case)

/**
 * A single programming language's share of coding time.
 */
export interface WakaTimeLanguage {
  /** Language name, e.g. `TypeScript`. */
  readonly name: string;
  /** Percentage of total time (0–100). */
  readonly percent: number;
  /** Human-readable duration, e.g. `4 hrs 12 mins`. */
  readonly text: string;
}

/**
 * Normalised WakaTime coding-time summary for a period.
 */
export interface WakaTimeStats {
  /** Total coding seconds in the range. */
  readonly totalSeconds: number;
  /** Human-readable total, e.g. `18 hrs 30 mins`. */
  readonly humanReadableTotal: string;
  /** Average coding seconds per day. */
  readonly dailyAverageSeconds: number;
  /** Human-readable daily average. */
  readonly humanReadableDailyAverage: string;
  /** Languages by share, descending. */
  readonly languages: readonly WakaTimeLanguage[];
  /** Range covered by the summary (ISO dates). */
  readonly range: { readonly start: string; readonly end: string };
}

/** Raw language entry from the WakaTime stats API. */
export interface WakaTimeApiLanguage {
  readonly name: string;
  readonly percent: number;
  readonly text: string;
  readonly total_seconds: number;
}

/** Raw `data` object from the WakaTime stats API. */
export interface WakaTimeApiStats {
  readonly total_seconds: number;
  readonly human_readable_total: string;
  readonly daily_average: number;
  readonly human_readable_daily_average: string;
  readonly languages: readonly WakaTimeApiLanguage[];
  readonly start: string;
  readonly end: string;
}
