import type { SpotifyTrack } from '@gabfon/spotify';
import type { WakaTimeStats } from '@gabfon/wakatime';
import type { XPost } from '@gabfon/x';
import { type NextRequest, NextResponse } from 'next/server';
import type {
  GithubPayload,
  NowTrack,
  SpotifyPayload,
  StravaPayload,
  StravaRun,
} from '@/components/now/types';
import { checkRateLimit, rateLimitHeaders } from '@/lib/rate-limit';

/**
 * GET /api/now
 *
 * Aggregates the live data behind the `/now` page from five independent
 * sources — Spotify (top tracks + now playing), Strava (running), GitHub
 * (stats), X (latest post) and WakaTime (coding time). Each source is fetched
 * in parallel and wrapped in its own `try/catch`: a missing credential or
 * failed request yields `null` for that source instead of failing the whole
 * endpoint, so the UI can always render a stable shape.
 */

const TOP_TRACKS_LIMIT = 10;
const RECENT_RUNS_LIMIT = 4;
const METERS_PER_KM = 1000;

/** Map a raw Spotify track to the widget shape. */
function toTrack(track: SpotifyTrack): NowTrack {
  return {
    name: track.name,
    artist: track.artists.map((artist) => artist.name).join(', '),
    albumImage: track.album.images[0]?.url ?? null,
    url: track.external_urls.spotify,
  };
}

/** Spotify: top tracks (all-time) + currently/last played. */
async function loadSpotify(): Promise<SpotifyPayload | null> {
  try {
    const { spotifyClient } = await import('@gabfon/spotify');
    const [top, playing] = await Promise.all([
      spotifyClient.getTopTracks('long_term', TOP_TRACKS_LIMIT),
      spotifyClient.getCurrentlyPlaying(),
    ]);

    let nowPlaying: SpotifyPayload['nowPlaying'] = null;
    if (playing?.item) {
      nowPlaying = { ...toTrack(playing.item), isPlaying: playing.is_playing };
    } else {
      const recent = await spotifyClient.getRecentlyPlayed(1);
      if (recent[0]) {
        nowPlaying = { ...toTrack(recent[0].track), isPlaying: false };
      }
    }

    return { nowPlaying, topTracks: top.items.map(toTrack) };
  } catch {
    return null;
  }
}

/** Strava: YTD running totals + a few recent runs. */
async function loadStrava(): Promise<StravaPayload | null> {
  try {
    const { stravaClient } = await import('@gabfon/strava');
    const [activities, stats] = await Promise.all([
      stravaClient.getCurrentYearActivities(),
      stravaClient.getAthleteStats(),
    ]);

    const recentRuns: StravaRun[] = activities
      .filter((activity) => activity.type === 'Run')
      .slice(0, RECENT_RUNS_LIMIT)
      .map((run) => {
        const distanceKm = run.distance / METERS_PER_KM;
        return {
          name: run.name,
          distanceKm,
          paceSecondsPerKm: distanceKm > 0 ? run.moving_time / distanceKm : 0,
          movingTimeSeconds: run.moving_time,
          date: run.start_date.slice(0, 10),
        };
      });

    return {
      ytdRuns: {
        count: stats.ytd_run_totals.count,
        distanceKm: stats.ytd_run_totals.distance / METERS_PER_KM,
        movingTimeSeconds: stats.ytd_run_totals.moving_time,
      },
      recentRuns,
    };
  } catch {
    return null;
  }
}

/** GitHub: profile stats, contributions, latest repo. */
async function loadGithub(): Promise<GithubPayload | null> {
  try {
    const { githubClient } = await import('@gabfon/github');
    const [user, calendar, repos] = await Promise.all([
      githubClient.getUser(),
      githubClient.getContributionCalendar(),
      githubClient.getUserRepos(1, 'pushed'),
    ]);

    const repo = repos[0];
    return {
      contributions: calendar.totalContributions,
      followers: user.followers,
      publicRepos: user.public_repos,
      latestRepo: repo
        ? {
            name: repo.name,
            description: repo.description,
            stars: repo.stargazers_count,
            url: repo.html_url,
          }
        : null,
    };
  } catch {
    return null;
  }
}

/** X: latest original post. */
async function loadX(): Promise<XPost | null> {
  try {
    const { xClient } = await import('@gabfon/x');
    return await xClient.getLatestPost();
  } catch {
    return null;
  }
}

/** WakaTime: last-7-days coding summary. */
async function loadWakatime(): Promise<WakaTimeStats | null> {
  try {
    const { wakatimeClient } = await import('@gabfon/wakatime');
    return await wakatimeClient.getLast7Days();
  } catch {
    return null;
  }
}

/**
 * Aggregate all `/now` widget data. Fails soft per source.
 * @param request - The incoming request (used for rate limiting).
 * @returns The combined, nullable-per-source payload.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const limit = await checkRateLimit(request, {
    prefix: 'gabfon:now',
    requests: 30,
    window: '60 s',
  });
  if (limit && !limit.success) {
    return NextResponse.json(
      { error: 'Too many requests.' },
      { status: 429, headers: rateLimitHeaders(limit) }
    );
  }

  const [spotify, strava, github, x, wakatime] = await Promise.all([
    loadSpotify(),
    loadStrava(),
    loadGithub(),
    loadX(),
    loadWakatime(),
  ]);

  return NextResponse.json(
    {
      spotify,
      strava,
      github,
      x,
      wakatime,
      sources: {
        spotify: spotify !== null,
        strava: strava !== null,
        github: github !== null,
        x: x !== null,
        wakatime: wakatime !== null,
      },
    },
    { headers: { 'Cache-Control': 'public, max-age=300, s-maxage=300' } }
  );
}
