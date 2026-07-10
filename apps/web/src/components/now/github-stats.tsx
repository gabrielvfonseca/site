import { LINK_CLASS } from '@gabfon/design-system/lib/constants';
import { StarIcon } from 'lucide-react';
import Link from 'next/link';
import type { JSX } from 'react';
import { StatTiles } from './stat-tiles';
import type { GithubPayload } from './types';

/**
 * Props for {@link GithubStats}.
 */
interface GithubStatsProps {
  /** The GitHub payload, or `null` when unavailable. */
  readonly data: GithubPayload | null;
}

/**
 * GitHub widget: contributions/followers/repos as stat tiles, plus the most
 * recently pushed repository with its star count.
 * @param props - The GitHub stats props.
 * @returns The GithubStats element.
 */
export function GithubStats({ data }: GithubStatsProps): JSX.Element {
  if (!data) {
    return (
      <p className="text-muted-foreground text-sm">
        GitHub data is unavailable right now.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <StatTiles
        columns={2}
        items={[
          { value: String(data.publicRepos), label: 'Public repos' },
          { value: String(data.followers), label: 'Followers' },
        ]}
      />
      {data.latestRepo ? (
        <p className="flex flex-wrap items-baseline gap-x-2 text-sm">
          <span className="text-muted-foreground">Latest push</span>
          <Link
            className={LINK_CLASS}
            href={data.latestRepo.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {data.latestRepo.name}
          </Link>
          <span className="inline-flex items-center gap-1 text-muted-foreground tabular-nums">
            <StarIcon aria-hidden="true" className="size-3" />
            {data.latestRepo.stars}
          </span>
        </p>
      ) : null}
    </div>
  );
}
