import { NextResponse } from 'next/server';

/**
 * GET /api/activity
 *
 * Aggregates a single "digital activity" heatmap for the last ~53 weeks by
 * merging three sources per day:
 *   - GitHub  : daily contribution counts (full year, the grid's backbone)
 *   - Strava  : number of activities logged that day (this calendar year)
 *   - Spotify : number of tracks played that day (recent history only)
 *
 * Each source is fetched independently; a missing credential or failed request
 * simply omits that source rather than failing the whole endpoint. The grid is
 * always returned (empty cells at level 0) so the UI can render a stable shape.
 */

const MS_PER_DAY = 86_400_000;
const WINDOW_DAYS = 371; // ~53 weeks
const DAYS_PER_WEEK = 7;
const SPOTIFY_RECENT_LIMIT = 50;
/** Upper bounds (as a fraction of the busiest day) for intensity levels 1–3. */
const LEVEL_1_MAX = 0.25;
const LEVEL_2_MAX = 0.5;
const LEVEL_3_MAX = 0.75;
const QUARTILE_THRESHOLDS = [LEVEL_1_MAX, LEVEL_2_MAX, LEVEL_3_MAX];

interface Cell {
  date: string;
  count: number;
  github: number;
  strava: number;
  spotify: number;
  level: 0 | 1 | 2 | 3 | 4;
}

function dayKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** GitHub contribution calendar → Map<date, count>. */
async function loadGithub(): Promise<Map<string, number> | null> {
  try {
    const { githubClient } = await import('@gabfon/github');
    const calendar = await githubClient.getContributionCalendar();
    const map = new Map<string, number>();
    for (const week of calendar.weeks) {
      for (const day of week.days) {
        map.set(day.date, (map.get(day.date) ?? 0) + day.contributionCount);
      }
    }
    return map;
  } catch {
    return null;
  }
}

/** Strava activities this year → Map<date, activityCount>. */
async function loadStrava(): Promise<Map<string, number> | null> {
  try {
    const { stravaClient } = await import('@gabfon/strava');
    const activities = await stravaClient.getCurrentYearActivities();
    const map = new Map<string, number>();
    for (const activity of activities) {
      const key = activity.start_date.slice(0, 10);
      map.set(key, (map.get(key) ?? 0) + 1);
    }
    return map;
  } catch {
    return null;
  }
}

/** Spotify recently played → Map<date, playCount> (recent days only). */
async function loadSpotify(): Promise<Map<string, number> | null> {
  try {
    const { spotifyClient } = await import('@gabfon/spotify');
    const recent = await spotifyClient.getRecentlyPlayed(SPOTIFY_RECENT_LIMIT);
    const map = new Map<string, number>();
    for (const item of recent) {
      const key = item.played_at.slice(0, 10);
      map.set(key, (map.get(key) ?? 0) + 1);
    }
    return map;
  } catch {
    return null;
  }
}

function levelFor(count: number, max: number): Cell['level'] {
  if (count === 0 || max === 0) {
    return 0;
  }
  const ratio = count / max;
  let level = 1;
  for (const threshold of QUARTILE_THRESHOLDS) {
    if (ratio > threshold) {
      level += 1;
    }
  }
  return level as Cell['level'];
}

export async function GET() {
  const [github, strava, spotify] = await Promise.all([
    loadGithub(),
    loadStrava(),
    loadSpotify(),
  ]);

  // Build a Sunday-aligned grid ending today (UTC).
  const now = new Date();
  const end = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );
  const start = new Date(end.getTime() - WINDOW_DAYS * MS_PER_DAY);
  start.setUTCDate(start.getUTCDate() - start.getUTCDay());

  const cells: Cell[] = [];
  const totals = { github: 0, strava: 0, spotify: 0 };
  let max = 0;

  for (let t = start.getTime(); t <= end.getTime(); t += MS_PER_DAY) {
    const key = dayKey(new Date(t));
    const g = github?.get(key) ?? 0;
    const s = strava?.get(key) ?? 0;
    const m = spotify?.get(key) ?? 0;
    const count = g + s + m;
    totals.github += g;
    totals.strava += s;
    totals.spotify += m;
    max = Math.max(max, count);
    cells.push({
      date: key,
      count,
      github: g,
      strava: s,
      spotify: m,
      level: 0,
    });
  }

  for (const cell of cells) {
    cell.level = levelFor(cell.count, max);
  }

  const weeks: (Cell | null)[][] = [];
  for (let i = 0; i < cells.length; i += DAYS_PER_WEEK) {
    weeks.push(cells.slice(i, i + DAYS_PER_WEEK));
  }
  const lastWeek = weeks.at(-1);
  if (lastWeek) {
    while (lastWeek.length < DAYS_PER_WEEK) {
      lastWeek.push(null);
    }
  }

  const activeDays = cells.filter((cell) => cell.count > 0).length;

  return NextResponse.json(
    {
      weeks,
      totals: {
        ...totals,
        total: totals.github + totals.strava + totals.spotify,
        activeDays,
      },
      sources: {
        github: github !== null,
        strava: strava !== null,
        spotify: spotify !== null,
      },
      range: { start: dayKey(start), end: dayKey(end) },
    },
    { headers: { 'Cache-Control': 'public, max-age=1800, s-maxage=1800' } }
  );
}
