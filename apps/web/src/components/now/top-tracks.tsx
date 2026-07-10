import Link from 'next/link';
import type { JSX } from 'react';
import type { NowTrack } from './types';

/**
 * Props for {@link TopTracks}.
 */
interface TopTracksProps {
  /** The ranked list of top tracks. */
  readonly tracks: readonly NowTrack[];
}

/**
 * A ranked top-tracks list: position, full-colour album thumbnail, title and
 * artist, each linking out to Spotify.
 * @param props - The top tracks props.
 * @returns The TopTracks element.
 */
export function TopTracks({ tracks }: TopTracksProps): JSX.Element {
  if (tracks.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">Top tracks unavailable.</p>
    );
  }

  return (
    <ol className="flex flex-col">
      {tracks.map((track, index) => (
        <li key={`${track.name}-${track.artist}`}>
          <Link
            className="group -mx-2 flex items-center gap-3 rounded-lg px-2 py-2 transition-colors duration-200 hover:bg-muted/[var(--opacity-muted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            href={track.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="w-4 shrink-0 text-right text-muted-foreground text-xs tabular-nums">
              {index + 1}
            </span>
            {track.albumImage ? (
              // biome-ignore lint/performance/noImgElement: remote album art, no known dimensions
              // biome-ignore lint/nursery/useImageSize: intrinsic size is unknown
              <img
                alt=""
                className="size-9 shrink-0 rounded border border-border object-cover"
                loading="lazy"
                src={track.albumImage}
              />
            ) : (
              <span className="size-9 shrink-0 rounded border border-border bg-muted" />
            )}
            <span className="flex min-w-0 flex-col">
              <span className="truncate font-medium text-foreground text-sm leading-5">
                {track.name}
              </span>
              <span className="truncate text-muted-foreground text-sm leading-5">
                {track.artist}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
