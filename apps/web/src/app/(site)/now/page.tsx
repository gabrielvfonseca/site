'use client';

import { Badge } from '@gabfon/design-system/components/badge';
import { Skeleton } from '@gabfon/design-system/components/skeleton';
import { formatDate } from 'date-fns';
import { Activity, Clock, Code, Music } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NowData {
  spotify: {
    nowPlaying: any;
    recentSpotify: any[];
  };
  strava: {
    weeklyDistance: number;
  };
  github: {
    totalContributions: number;
  };
  timestamp: string;
}

export default function NowPage() {
  const [data, setData] = useState<NowData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/now');
        const json = await res.json();
        setData(json);
      } catch (_error) {
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 300_000); // refresh every 5 mins
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <section className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl tracking-tight">Now</h1>
          <p className="text-muted-foreground">
            What's happening right now in my life.
          </p>
        </section>
        <div className="grid gap-4 sm:grid-cols-2">
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[200px] w-full" />
        </div>
      </div>
    );
  }

  const spotify = data?.spotify.nowPlaying;
  const recent = data?.spotify.recentSpotify?.[0];
  const currentMusic = spotify || recent;

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-2">
        <h1 className="font-bold text-2xl tracking-tight">Now</h1>
        <p className="text-muted-foreground">
          What I'm building, listening to, and how I'm moving. Last updated{' '}
          {data?.timestamp && formatDate(new Date(data.timestamp), 'h:mm a')}.
        </p>
      </section>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-xl border border-accent-2 bg-accent/30 p-6">
          <div className="flex items-center gap-2">
            <Music className="size-5 text-spotify" />
            <h2 className="font-semibold">Music</h2>
          </div>
          {currentMusic ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                {currentMusic.item?.album?.images?.[0]?.url && (
                  <img
                    alt={currentMusic.item.name}
                    className="size-16 rounded-md object-cover"
                    src={currentMusic.item.album.images[0].url}
                  />
                )}
                {!currentMusic.item?.album?.images?.[0]?.url &&
                  currentMusic.track?.album?.images?.[0]?.url && (
                    <img
                      alt={currentMusic.track.name}
                      className="size-16 rounded-md object-cover"
                      src={currentMusic.track.album.images[0].url}
                    />
                  )}
                <div className="flex flex-col overflow-hidden">
                  <p className="truncate font-medium">
                    {currentMusic.item?.name || currentMusic.track?.name}
                  </p>
                  <p className="truncate text-muted-foreground text-sm">
                    {currentMusic.item?.artists
                      ?.map((a: any) => a.name)
                      .join(', ') ||
                      currentMusic.track?.artists
                        ?.map((a: any) => a.name)
                        .join(', ')}
                  </p>
                  {spotify ? (
                    <Badge
                      className="mt-1 w-fit bg-spotify/10 text-[10px] text-spotify"
                      variant="secondary"
                    >
                      Now Playing
                    </Badge>
                  ) : (
                    <span className="mt-1 text-[10px] text-muted-foreground">
                      Recently Played
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              Not playing anything right now.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-accent-2 bg-accent/30 p-6">
          <div className="flex items-center gap-2">
            <Activity className="size-5 text-strava" />
            <h2 className="font-semibold">Movement</h2>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-bold text-2xl">
              {data?.strava.weeklyDistance.toFixed(1)} km
            </p>
            <p className="text-muted-foreground text-sm">this week on Strava</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-accent-2 bg-accent/30 p-6">
          <div className="flex items-center gap-2">
            <Code className="size-5 text-blue-500" />
            <h2 className="font-semibold">Code</h2>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-bold text-2xl">
              {data?.github.totalContributions}
            </p>
            <p className="text-muted-foreground text-sm">
              contributions in the last year
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-accent-2 bg-accent/30 p-6">
          <div className="flex items-center gap-2">
            <Clock className="size-5 text-orange-500" />
            <h2 className="font-semibold">Current Focus</h2>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-medium text-sm leading-6">
              Building Frontal Labs, studying Computer Engineering at NOVA, and
              training for my next half-marathon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
