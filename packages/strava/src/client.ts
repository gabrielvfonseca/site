import { keys } from './keys';
import {
  type StravaAchievement,
  type StravaActivity,
  type StravaApiResponse,
  StravaApiResponseSchema,
  type StravaAthlete,
  type StravaAthleteStats,
} from './types';

const MS_PER_SECOND = 1000;
const AUTH_BUFFER_MS = 60_000;
const DEFAULT_PER_PAGE = 30;
const LARGE_PER_PAGE = 50;
const EXTRA_LARGE_PER_PAGE = 200;
const SECONDS_PER_MS = 1000;

/**
 * Base Strava API client with OAuth authentication
 */
export class StravaClient {
  private readonly baseUrl = 'https://www.strava.com/api/v3';
  private readonly clientId: string;
  private readonly clientSecret: string;
  private refreshToken: string;
  private accessToken: string | null = null;
  private tokenExpiry = 0;

  constructor() {
    const env = keys();
    this.clientId = env.STRAVA_CLIENT_ID;
    this.clientSecret = env.STRAVA_CLIENT_SECRET;
    this.refreshToken = env.STRAVA_REFRESH_TOKEN;
  }

  /**
   * Refresh access token using refresh token
   */
  private async refreshAccessToken(): Promise<string> {
    const response = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        // biome-ignore lint/style/useNamingConvention: Strava API parameter
        client_id: this.clientId,
        // biome-ignore lint/style/useNamingConvention: Strava API parameter
        client_secret: this.clientSecret,
        // biome-ignore lint/style/useNamingConvention: Strava API parameter
        grant_type: 'refresh_token',
        // biome-ignore lint/style/useNamingConvention: Strava API parameter
        refresh_token: this.refreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Strava auth error: ${response.status} ${response.statusText}`
      );
    }

    const data = (await response.json()) as {
      // biome-ignore lint/style/useNamingConvention: Strava API response field
      access_token: string;
      // biome-ignore lint/style/useNamingConvention: Strava API response field
      refresh_token: string;
      // biome-ignore lint/style/useNamingConvention: Strava API response field
      expires_in: number;
    };
    this.accessToken = data.access_token;
    this.refreshToken = data.refresh_token; // Update refresh token
    this.tokenExpiry =
      Date.now() + data.expires_in * MS_PER_SECOND - AUTH_BUFFER_MS;

    return this.accessToken;
  }

  /**
   * Get valid access token
   */
  private getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return Promise.resolve(this.accessToken);
    }
    return this.refreshAccessToken();
  }

  /**
   * Make authenticated request to Strava API
   */
  private async makeRequest(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<StravaApiResponse> {
    const url = `${this.baseUrl}${endpoint}`;

    const token = await this.getAccessToken();
    const headers = {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(
          `Strava API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      const result = StravaApiResponseSchema.parse({
        data,
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
      }) as StravaApiResponse;

      return result;
    } catch (error) {
      // biome-ignore lint/suspicious/noConsole: Logging API failure is necessary
      console.error(`Strava API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Get authenticated athlete information
   */
  async getAthlete(): Promise<StravaAthlete> {
    const response = await this.makeRequest('/athlete');
    return response.data as StravaAthlete;
  }

  /**
   * Get athlete statistics
   */
  async getAthleteStats(athleteId?: number): Promise<StravaAthleteStats> {
    const id = athleteId || (await this.getAthlete()).id;
    const response = await this.makeRequest(`/athletes/${id}/stats`);
    return response.data as StravaAthleteStats;
  }

  /**
   * Get recent activities
   */
  async getActivities(
    perPage = DEFAULT_PER_PAGE,
    page = 1,
    before?: number,
    after?: number
  ): Promise<StravaActivity[]> {
    let url = `/activities?per_page=${perPage}&page=${page}`;
    if (before) {
      url += `&before=${before}`;
    }
    if (after) {
      url += `&after=${after}`;
    }

    const response = await this.makeRequest(url);
    return response.data as StravaActivity[];
  }

  /**
   * Get activity by ID
   */
  async getActivity(
    activityId: number,
    includeAllEfforts = false
  ): Promise<StravaActivity> {
    const response = await this.makeRequest(
      `/activities/${activityId}?include_all_efforts=${includeAllEfforts}`
    );
    return response.data as StravaActivity;
  }

  /**
   * Get activities from current week
   */
  getCurrentWeekActivities(): Promise<StravaActivity[]> {
    const now = new Date();
    const weekStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - now.getDay()
    );
    const after = Math.floor(weekStart.getTime() / SECONDS_PER_MS);

    return this.getActivities(LARGE_PER_PAGE, 1, undefined, after);
  }

  /**
   * Get activities from current month
   */
  getCurrentMonthActivities(): Promise<StravaActivity[]> {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const after = Math.floor(monthStart.getTime() / SECONDS_PER_MS);

    return this.getActivities(LARGE_PER_PAGE, 1, undefined, after);
  }

  /**
   * Get activities from current year
   */
  getCurrentYearActivities(): Promise<StravaActivity[]> {
    const now = new Date();
    const yearStart = new Date(now.getFullYear(), 0, 1);
    const after = Math.floor(yearStart.getTime() / SECONDS_PER_MS);

    return this.getActivities(EXTRA_LARGE_PER_PAGE, 1, undefined, after);
  }

  /**
   * Get athlete achievements (kudos, etc.)
   */
  getAthleteAchievements(): Promise<StravaAchievement[]> {
    return Promise.resolve([]);
  }

  /**
   * Get activities by type
   */
  async getActivitiesByType(
    type: StravaActivity['type'],
    perPage = DEFAULT_PER_PAGE
  ): Promise<StravaActivity[]> {
    const activities = await this.getActivities(perPage);
    return activities.filter((activity) => activity.type === type);
  }

  /**
   * Get total distance for current week/month/year
   */
  async getDistanceStats(
    timeRange: 'week' | 'month' | 'year' = 'week'
  ): Promise<number> {
    const activities = await this.getActivitiesForRange(timeRange);
    return activities.reduce((total, activity) => total + activity.distance, 0);
  }

  /** Resolve activities for a named time range. */
  private getActivitiesForRange(
    timeRange: 'week' | 'month' | 'year'
  ): Promise<StravaActivity[]> {
    const fetchers = {
      week: () => this.getCurrentWeekActivities(),
      month: () => this.getCurrentMonthActivities(),
      year: () => this.getCurrentYearActivities(),
    };
    return fetchers[timeRange]();
  }

  /**
   * Get total time for current week/month/year
   */
  async getTimeStats(
    timeRange: 'week' | 'month' | 'year' = 'week'
  ): Promise<number> {
    const activities = await this.getActivitiesForRange(timeRange);
    return activities.reduce(
      (total, activity) => total + activity.moving_time,
      0
    );
  }
}

// Export singleton instance
export const stravaClient = new StravaClient();
