import Link from "next/link";

import { cn } from "@/lib/utils";

import type { SpotifyPayload } from "./types";

/** Number of animated equalizer bars. */
const EQ_BAR_COUNT = 4;
/** Per-bar animation stagger, in seconds. */
const EQ_STAGGER_SECONDS = 0.15;
const EQ_BARS = Array.from({ length: EQ_BAR_COUNT }, (_, index) => index);

/**
 * Props for {@link NowPlaying}.
 */
interface NowPlayingProps {
  /** The now/last-playing track, or `null` when unavailable. */
  readonly track: SpotifyPayload["nowPlaying"];
}

/**
 * A compact "now playing" row: full-colour album art, an animated equalizer
 * when a track is actively playing, and the track/artist with a Spotify link.
 * Falls back to the last-played track (labelled "Last played").
 * @param props - The now playing props.
 * @returns The NowPlaying element.
 */
export function NowPlaying({ track }: NowPlayingProps) {
  if (!track) {
    return (
      <p className="text-muted-foreground text-sm">
        Nothing playing right now.
      </p>
    );
  }

  return (
    <Link
      className="group focus-visible:ring-ring flex items-center gap-3 rounded-lg text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      href={track.url}
      rel="noopener noreferrer"
      target="_blank"
    >
      {track.albumImage ? (
        <img
          alt=""
          className="border-border size-11 shrink-0 rounded-md border object-cover"
          loading="lazy"
          src={track.albumImage}
        />
      ) : (
        <span className="border-border bg-muted size-11 shrink-0 rounded-md border" />
      )}
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="text-muted-foreground flex items-center gap-2 text-xs tracking-wider uppercase">
          {track.isPlaying ? (
            <span aria-hidden="true" className="flex h-3 items-end gap-0.5">
              {EQ_BARS.map((bar) => (
                <span
                  className="now-eq-bar bg-foreground w-0.5 origin-bottom"
                  key={bar}
                  style={{
                    animationDelay: `${bar * EQ_STAGGER_SECONDS}s`,
                    height: "100%",
                  }}
                />
              ))}
            </span>
          ) : null}
          {track.isPlaying ? "Now playing" : "Last played"}
        </span>
        <span className="text-foreground truncate text-sm">{track.name}</span>
        <span className={cn("text-muted-foreground truncate text-sm")}>
          {track.artist}
        </span>
      </span>
    </Link>
  );
}
