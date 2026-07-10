import type { JSX } from 'react';
import { formatDistance, formatDuration, formatPace } from './format';
import { StatTiles } from './stat-tiles';
import type { StravaPayload } from './types';

/**
 * Props for {@link RunningWidget}.
 */
interface RunningWidgetProps {
  /** The Strava running payload, or `null` when unavailable. */
  readonly data: StravaPayload | null;
}

/**
 * Running widget: year-to-date totals as stat tiles plus a short list of recent
 * runs (distance · pace · date). Data is sourced from Strava, which is where
 * Apple Watch runs land once synced.
 * @param props - The running widget props.
 * @returns The RunningWidget element.
 */
export function RunningWidget({ data }: RunningWidgetProps): JSX.Element {
  if (!data) {
    return (
      <p className="text-muted-foreground text-sm">
        Running data is unavailable right now.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <StatTiles
        items={[
          {
            value: String(data.ytdRuns.count),
            label: 'Runs',
            hint: 'This year',
          },
          {
            value: formatDistance(data.ytdRuns.distanceKm),
            label: 'Distance',
            hint: 'This year',
          },
          {
            value: formatDuration(data.ytdRuns.movingTimeSeconds),
            label: 'Time',
            hint: 'Moving, this year',
          },
        ]}
      />
      {data.recentRuns.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {data.recentRuns.map((run) => (
            <li
              className="flex items-baseline justify-between gap-3 text-sm"
              key={`${run.date}-${run.name}`}
            >
              <span className="truncate font-medium text-foreground">
                {run.name}
              </span>
              <span className="shrink-0 text-muted-foreground tabular-nums">
                {formatDistance(run.distanceKm)} ·{' '}
                {formatPace(run.paceSecondsPerKm)}
                /km
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
