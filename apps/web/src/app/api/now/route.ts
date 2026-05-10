import { githubClient } from '@gabfon/github';
import { spotifyClient } from '@gabfon/spotify';
import { stravaClient } from '@gabfon/strava';
import { NextResponse } from 'next/server';

const METERS_TO_KILOMETERS = 1000;

export async function GET() {
  try {
    const [spotify, strava, github] = await Promise.all([
      spotifyClient.getCurrentlyPlaying().catch(() => null),
      stravaClient.getDistanceStats('week').catch(() => 0),
      githubClient.getContributionCalendar().catch(() => null),
    ]);

    const recentSpotify = spotify
      ? []
      : await spotifyClient.getRecentlyPlayed(1).catch(() => []);

    return NextResponse.json({
      spotify: {
        nowPlaying: spotify,
        recentlyPlayed: recentSpotify,
      },
      strava: {
        weeklyDistance: strava / METERS_TO_KILOMETERS, // convert meters to km
      },
      github: {
        totalContributions: github?.totalContributions || 0,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
