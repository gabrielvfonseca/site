import type { WakaTimeStats } from '@gabfon/wakatime';
import type { JSX } from 'react';
import { NOW_STATS } from '@/constants/now';
import { StatTiles } from './stat-tiles';
import type { GithubPayload } from './types';

/** Grid column bounds for the strip. */
const MIN_COLUMNS = 2;
const MAX_COLUMNS = 4;

/**
 * Props for {@link StatStrip}.
 */
interface StatStripProps {
  /** WakaTime coding summary (live coding hours), or `null`. */
  readonly coding: WakaTimeStats | null;
  /** GitHub payload (contributions), or `null`. */
  readonly github: GithubPayload | null;
}

/**
 * "By the numbers": a strip of headline tiles combining live figures (coding
 * time from WakaTime, contributions from GitHub) with the hand-curated stats in
 * `NOW_STATS` (coffee, books, …).
 * @param props - The stat strip props.
 * @returns The StatStrip element.
 */
export function StatStrip({ coding, github }: StatStripProps): JSX.Element {
  const tiles = [
    coding
      ? {
          value: coding.humanReadableTotal,
          label: 'Coding',
          hint: 'Last 7 days',
        }
      : null,
    github
      ? {
          value: github.contributions.toLocaleString('en-US'),
          label: 'Contributions',
          hint: 'Past year',
        }
      : null,
    ...NOW_STATS.map((stat) => ({
      value: stat.value,
      label: stat.label,
      hint: stat.hint,
    })),
  ].filter((tile): tile is NonNullable<typeof tile> => tile !== null);

  if (tiles.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        Stats are unavailable right now.
      </p>
    );
  }

  // Size the grid to the number of tiles (clamped 2–4) so a missing live source
  // never leaves empty cells.
  const columns = Math.min(Math.max(tiles.length, MIN_COLUMNS), MAX_COLUMNS) as
    | 2
    | 3
    | 4;

  return <StatTiles columns={columns} items={tiles} />;
}
