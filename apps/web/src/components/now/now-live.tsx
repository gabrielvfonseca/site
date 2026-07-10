'use client';

import { Skeleton } from '@gabfon/design-system/components/skeleton';
import { type JSX, type ReactNode, useEffect, useState } from 'react';
import { CodingWidget } from './coding-widget';
import { GithubStats } from './github-stats';
import { LatestPost } from './latest-post';
import { NowPlaying } from './now-playing';
import { RunningWidget } from './running-widget';
import { StatStrip } from './stat-strip';
import { TopTracks } from './top-tracks';
import type { NowResponse } from './types';

type Status = 'loading' | 'ready' | 'error';

/** A `/now` widget section: heading + body, matching the page rhythm. */
function NowSection({
  id,
  title,
  children,
}: {
  readonly id: string;
  readonly title: string;
  readonly children: ReactNode;
}): JSX.Element {
  return (
    <section
      aria-labelledby={`now-live-${id}`}
      className="flex scroll-mt-8 flex-col gap-4"
    >
      <h2 className="font-semibold text-lg" id={`now-live-${id}`}>
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Skeleton placeholder shown while the live data loads. */
function LoadingState(): JSX.Element {
  return (
    <div className="flex flex-col gap-12">
      {['a', 'b', 'c'].map((key) => (
        <div className="flex flex-col gap-4" key={key}>
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-20 w-full" />
        </div>
      ))}
    </div>
  );
}

/**
 * Client container that fetches `/api/now` once and renders the live `/now`
 * widgets. Each source degrades independently: when a source is `null` its
 * section shows a quiet "unavailable" line. A hard fetch failure renders
 * nothing so the rest of the (static) page is unaffected.
 * @returns The live widgets, or a loading/empty state.
 */
export function NowLive(): JSX.Element | null {
  const [data, setData] = useState<NowResponse | null>(null);
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/now', { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json: NowResponse) => {
        setData(json);
        setStatus('ready');
      })
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          setStatus('error');
        }
      });
    return () => controller.abort();
  }, []);

  if (status === 'loading') {
    return <LoadingState />;
  }

  if (status === 'error' || !data) {
    return null;
  }

  return (
    <>
      <NowSection id="numbers" title="By the numbers">
        <StatStrip coding={data.wakatime} github={data.github} />
      </NowSection>

      <NowSection id="listening" title="Listening">
        <div className="flex flex-col gap-5">
          <NowPlaying track={data.spotify?.nowPlaying ?? null} />
          <TopTracks tracks={data.spotify?.topTracks ?? []} />
        </div>
      </NowSection>

      <NowSection id="running" title="Running">
        <RunningWidget data={data.strava} />
      </NowSection>

      <NowSection id="code" title="Code">
        <div className="flex flex-col gap-5">
          <GithubStats data={data.github} />
          <CodingWidget data={data.wakatime} />
        </div>
      </NowSection>

      <NowSection id="latest-post" title="Latest post">
        <LatestPost post={data.x} />
      </NowSection>
    </>
  );
}
