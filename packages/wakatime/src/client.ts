import { keys } from './keys';
import type { WakaTimeApiStats, WakaTimeStats } from './types';

/** WakaTime API base URL. */
const API_BASE = 'https://wakatime.com/api/v1';

/**
 * Minimal WakaTime client. Reads the authenticated user's coding-time
 * summaries using Basic auth (base64-encoded API key).
 */
export class WakaTimeClient {
  private readonly apiKey: string | undefined;

  constructor() {
    const env = keys();
    this.apiKey = env.WAKATIME_API_KEY;
  }

  /**
   * Coding-time summary for the last 7 days.
   * @returns The normalised {@link WakaTimeStats}.
   */
  async getLast7Days(): Promise<WakaTimeStats> {
    if (!this.apiKey) {
      throw new Error('WAKATIME_API_KEY is not configured');
    }

    const auth = Buffer.from(this.apiKey).toString('base64');
    const response = await fetch(
      `${API_BASE}/users/current/stats/last_7_days`,
      { headers: { authorization: `Basic ${auth}` } }
    );

    if (!response.ok) {
      throw new Error(
        `WakaTime API error: ${response.status} ${response.statusText}`
      );
    }

    const body = (await response.json()) as { data: WakaTimeApiStats };
    const data = body.data;

    return {
      totalSeconds: data.total_seconds,
      humanReadableTotal: data.human_readable_total,
      dailyAverageSeconds: data.daily_average,
      humanReadableDailyAverage: data.human_readable_daily_average,
      languages: data.languages.map((language) => ({
        name: language.name,
        percent: language.percent,
        text: language.text,
      })),
      range: { start: data.start, end: data.end },
    };
  }
}

/** Shared singleton WakaTime client. */
export const wakatimeClient = new WakaTimeClient();
