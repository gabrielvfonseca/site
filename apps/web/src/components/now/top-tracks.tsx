import Link from "next/link";

import type { NowTrack } from "./types";

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
export function TopTracks({ tracks }: TopTracksProps) {
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
            className="group hover:bg-muted/50 focus-visible:ring-ring -mx-2 flex items-center gap-3 rounded-lg px-2 py-2 transition-colors duration-200 focus:outline-none focus-visible:ring-2"
            href={track.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="text-muted-foreground w-4 shrink-0 text-right text-xs tabular-nums">
              {index + 1}
            </span>
            {track.albumImage ? (
              <img
                alt=""
                className="border-border size-9 shrink-0 rounded border object-cover"
                loading="lazy"
                src={track.albumImage}
              />
            ) : (
              <span className="border-border bg-muted size-9 shrink-0 rounded border" />
            )}
            <span className="flex min-w-0 flex-col">
              <span className="text-foreground truncate text-sm leading-5">
                {track.name}
              </span>
              <span className="text-muted-foreground truncate text-sm leading-5">
                {track.artist}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
