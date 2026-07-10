import type { WakaTimeStats } from '@gabfon/wakatime';
import type { XPost } from '@gabfon/x';

/** A track normalised for the Spotify widgets. */
export interface NowTrack {
  readonly name: string;
  readonly artist: string;
  readonly albumImage: string | null;
  readonly url: string;
}

/** Spotify widget payload: top tracks + now/last playing. */
export interface SpotifyPayload {
  readonly nowPlaying: (NowTrack & { readonly isPlaying: boolean }) | null;
  readonly topTracks: readonly NowTrack[];
}

/** A single normalised Strava run. */
export interface StravaRun {
  readonly name: string;
  readonly distanceKm: number;
  readonly paceSecondsPerKm: number;
  readonly movingTimeSeconds: number;
  readonly date: string;
}

/** Strava widget payload: YTD totals + recent runs. */
export interface StravaPayload {
  readonly ytdRuns: {
    readonly count: number;
    readonly distanceKm: number;
    readonly movingTimeSeconds: number;
  };
  readonly recentRuns: readonly StravaRun[];
}

/** GitHub widget payload. */
export interface GithubPayload {
  readonly contributions: number;
  readonly followers: number;
  readonly publicRepos: number;
  readonly latestRepo: {
    readonly name: string;
    readonly description: string | null;
    readonly stars: number;
    readonly url: string;
  } | null;
}

/** The full `/api/now` response, nullable per source. */
export interface NowResponse {
  readonly spotify: SpotifyPayload | null;
  readonly strava: StravaPayload | null;
  readonly github: GithubPayload | null;
  readonly x: XPost | null;
  readonly wakatime: WakaTimeStats | null;
  readonly sources: {
    readonly spotify: boolean;
    readonly strava: boolean;
    readonly github: boolean;
    readonly x: boolean;
    readonly wakatime: boolean;
  };
}
