'use client';

import { cn } from '@gabfon/design-system/lib/utils';
import { type JSX, useEffect, useState } from 'react';
import { formatDisplayDate } from '@/lib/format-date';

interface Cell {
  date: string;
  count: number;
  github: number;
  strava: number;
  spotify: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ActivityData {
  weeks: (Cell | null)[][];
  totals: {
    github: number;
    strava: number;
    spotify: number;
    total: number;
    activeDays: number;
  };
  sources: { github: boolean; strava: boolean; spotify: boolean };
  range: { start: string; end: string };
}

/** Monochrome intensity scale — empty → white. */
const LEVEL_CLASS = [
  'bg-muted/50',
  'bg-muted-foreground/25',
  'bg-muted-foreground/45',
  'bg-muted-foreground/70',
  'bg-foreground',
] as const;

const WEEKDAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function tooltip(cell: Cell): string {
  const when = formatDisplayDate(cell.date);
  if (cell.count === 0) {
    return `No activity — ${when}`;
  }
  const parts: string[] = [];
  if (cell.github) {
    parts.push(`${cell.github} GitHub`);
  }
  if (cell.strava) {
    parts.push(`${cell.strava} Strava`);
  }
  if (cell.spotify) {
    parts.push(`${cell.spotify} Spotify`);
  }
  return `${cell.count} on ${when} · ${parts.join(', ')}`;
}

/** Month labels aligned to the column where a new month first appears. */
function monthLabels(weeks: (Cell | null)[][]): (string | null)[] {
  let previous = -1;
  return weeks.map((week) => {
    const first = week.find(Boolean);
    if (!first) {
      return null;
    }
    const month = new Date(first.date).getUTCMonth();
    if (month !== previous) {
      previous = month;
      return MONTHS[month] ?? null;
    }
    return null;
  });
}

function Legend(): JSX.Element {
  return (
    <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
      <span>Less</span>
      {LEVEL_CLASS.map((cls, i) => (
        <span
          className={cn('size-[11px] rounded-[2px]', cls)}
          key={`legend-${i}`}
        />
      ))}
      <span>More</span>
    </div>
  );
}

function GraphSkeleton(): JSX.Element {
  return (
    <div aria-hidden="true" className="flex gap-1">
      {Array.from({ length: 53 }).map((_, col) => (
        <div className="flex flex-col gap-1" key={`sk-col-${col}`}>
          {Array.from({ length: 7 }).map((__, row) => (
            <div
              className="size-[11px] animate-pulse rounded-[2px] bg-muted/50"
              key={`sk-${col}-${row}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * A GitHub-style contribution heatmap that merges GitHub, Strava and Spotify
 * activity into a single monochrome grid for the last ~53 weeks.
 * @returns The ContributionGraph component.
 */
export function ContributionGraph(): JSX.Element {
  const [data, setData] = useState<ActivityData | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(
    'loading'
  );

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/activity', { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json: ActivityData) => {
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

  const labels = data ? monthLabels(data.weeks) : [];
  const liveSources = data
    ? (['github', 'strava', 'spotify'] as const).filter(
        (key) => data.sources[key]
      )
    : [];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className="text-muted-foreground text-sm">
          {status === 'ready' && data
            ? `${data.totals.total.toLocaleString()} contributions across ${data.totals.activeDays} active days`
            : 'Daily activity across GitHub, Strava & Spotify'}
        </p>
        <Legend />
      </div>

      <div className="-mx-1 overflow-x-auto px-1 pb-1">
        {status === 'loading' && <GraphSkeleton />}

        {status === 'error' && (
          <p className="py-6 text-muted-foreground text-sm">
            Activity is unavailable right now.
          </p>
        )}

        {status === 'ready' && data && (
          <div className="flex w-max flex-col gap-1">
            {/* Month labels */}
            <div className="flex gap-1 pl-8 text-[10px] text-muted-foreground">
              {labels.map((label, i) => (
                <div className="w-[11px] shrink-0" key={`m-${i}`}>
                  <span className="whitespace-nowrap">{label}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-1">
              {/* Weekday labels */}
              <div className="flex w-7 shrink-0 flex-col gap-1 pr-1 text-[10px] text-muted-foreground">
                {WEEKDAY_LABELS.map((label, i) => (
                  <div
                    className="flex h-[11px] items-center justify-end leading-none"
                    key={`wd-${i}`}
                  >
                    {label}
                  </div>
                ))}
              </div>

              {/* Cells */}
              {data.weeks.map((week, col) => (
                <div className="flex flex-col gap-1" key={`col-${col}`}>
                  {week.map((cell, row) =>
                    cell ? (
                      <div
                        className={cn(
                          'size-[11px] rounded-[2px] ring-1 ring-border/50 ring-inset transition-colors',
                          LEVEL_CLASS[cell.level]
                        )}
                        key={cell.date}
                        title={tooltip(cell)}
                      />
                    ) : (
                      <div
                        className="size-[11px]"
                        key={`empty-${col}-${row}`}
                      />
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {status === 'ready' && data && (
        <p className="text-muted-foreground/75 text-xs">
          {liveSources.length > 0
            ? `Live from ${liveSources.join(', ')}. `
            : 'Awaiting connected sources. '}
          Spotify reflects recent listening only.
        </p>
      )}
    </div>
  );
}
