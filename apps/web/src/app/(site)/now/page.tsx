import { Badge } from '@gabfon/design-system/components/badge';
import { Skeleton } from '@gabfon/design-system/components/skeleton';
import { formatDate } from 'date-fns';
import { Activity, Clock, Code, Music } from 'lucide-react';
import Image from 'next/image';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

interface NowData {
  spotify: {
    nowPlaying: any;
    recentlyPlayed: any[];
  };
  strava: {
    weeklyDistance: number;
  };
  github: {
    totalContributions: number;
  };
  timestamp: string;
}

/**
 * Fetch now page data from the API
 * With proper cache headers for server-side caching
 */
async function getNowData(): Promise<NowData> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/now`,
    {
      next: { revalidate: 300 }, // 5 minutes
      headers: {
        'Cache-Control': 's-maxage=300, stale-while-revalidate=600',
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch now data');
  }

  return res.json();
}

/**
 * Loading skeleton component
 */
function NowSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading content"
      className="flex flex-col gap-8"
      role="status"
    >
      <section className="flex flex-col gap-2">
        <h1 className="font-bold text-2xl tracking-tight">Now</h1>
        <p className="text-muted-foreground">
          What's happening right now in my life.
        </p>
      </section>
      <div className="grid gap-4 sm:grid-cols-2">
        <Skeleton aria-hidden className="h-[200px] w-full" />
        <Skeleton aria-hidden className="h-[200px] w-full" />
        <Skeleton aria-hidden className="h-[200px] w-full" />
        <Skeleton aria-hidden className="h-[200px] w-full" />
      </div>
    </div>
  );
}

/**
 * Now page content component
 */
async function NowContent() {
  const data = await getNowData();

  const spotify = data.spotify.nowPlaying;
  const recent = data.spotify.recentlyPlayed?.[0];
  const currentMusic = spotify || recent;

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-2">
        <h1 className="font-bold text-2xl tracking-tight">Now</h1>
        <p className="text-muted-foreground">
          What I'm building, listening to, and how I'm moving. Last updated{' '}
          {data.timestamp && formatDate(new Date(data.timestamp), 'h:mm a')}.
        </p>
      </section>

      <div className="grid gap-6 sm:grid-cols-2">
        <section
          aria-labelledby="music-heading"
          className="flex flex-col gap-4 rounded-xl border border-accent-2 bg-accent/30 p-6"
        >
          <div className="flex items-center gap-2">
            <Music aria-hidden className="size-5 text-spotify" />
            <h2 className="font-semibold" id="music-heading">
              Music
            </h2>
          </div>
          {currentMusic ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                {currentMusic.item?.album?.images?.[0]?.url && (
                  <Image
                    alt={currentMusic.item.name}
                    className="size-16 rounded-md object-cover"
                    height={64}
                    src={currentMusic.item.album.images[0].url}
                    width={64}
                  />
                )}
                {!currentMusic.item?.album?.images?.[0]?.url &&
                  currentMusic.track?.album?.images?.[0]?.url && (
                    <Image
                      alt={currentMusic.track.name}
                      className="size-16 rounded-md object-cover"
                      height={64}
                      src={currentMusic.track.album.images[0].url}
                      width={64}
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
                      variant="outline"
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
        </section>

        <section
          aria-labelledby="movement-heading"
          className="flex flex-col gap-4 rounded-xl border border-accent-2 bg-accent/30 p-6"
        >
          <div className="flex items-center gap-2">
            <Activity aria-hidden className="size-5 text-strava" />
            <h2 className="font-semibold" id="movement-heading">
              Movement
            </h2>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-bold text-2xl">
              {data.strava.weeklyDistance.toFixed(1)} km
            </p>
            <p className="text-muted-foreground text-sm">this week on Strava</p>
          </div>
        </section>

        <section
          aria-labelledby="code-heading"
          className="flex flex-col gap-4 rounded-xl border border-accent-2 bg-accent/30 p-6"
        >
          <div className="flex items-center gap-2">
            <Code aria-hidden className="size-5 text-blue-500" />
            <h2 className="font-semibold" id="code-heading">
              Code
            </h2>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-bold text-2xl">
              {data.github.totalContributions}
            </p>
            <p className="text-muted-foreground text-sm">
              contributions in the last year
            </p>
          </div>
        </section>

        <section
          aria-labelledby="focus-heading"
          className="flex flex-col gap-4 rounded-xl border border-accent-2 bg-accent/30 p-6"
        >
          <div className="flex items-center gap-2">
            <Clock aria-hidden className="size-5 text-orange-500" />
            <h2 className="font-semibold" id="focus-heading">
              Current Focus
            </h2>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-medium text-sm leading-6">
              Building Frontal Labs, studying Computer Engineering at NOVA, and
              training for my next half-marathon.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

/**
 * The Now page - Server Component
 * Fetches data server-side for better performance and SEO
 * Uses Suspense boundaries for streaming and progressive enhancement
 */
export default function NowPage() {
  return (
    <Suspense fallback={<NowSkeleton />}>
      <NowContent />
    </Suspense>
  );
}
