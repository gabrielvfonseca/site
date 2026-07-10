import type { JSX } from 'react';
import { cn } from '@/lib/utils';

/** Matches a YouTube video id from common URL shapes. */
const YOUTUBE_ID = /(?:youtu\.be\/|v=|embed\/)([\w-]{11})/;

/**
 * Props for {@link Video}.
 */
interface VideoProps {
  /** A YouTube URL/id, or a direct video file URL (mp4/webm). */
  readonly src: string;
  /** Accessible title for the embedded frame. */
  readonly title?: string;
  /** Optional caption rendered beneath the player. */
  readonly caption?: string;
  /** Optional extra class names. */
  readonly className?: string;
}

/**
 * A responsive 16:9 video embed for MDX. Detects YouTube URLs/ids and renders
 * an iframe; otherwise renders a native `<video>` for direct file URLs. Framed
 * to match the site's bordered media treatment.
 * @param props - The video props.
 * @returns The Video element.
 */
export function Video({
  src,
  title = 'Embedded video',
  caption,
  className,
}: VideoProps): JSX.Element {
  const youtube = YOUTUBE_ID.exec(src);

  return (
    <figure className={cn('not-prose flex flex-col gap-3', className)}>
      <div className="aspect-video overflow-hidden rounded-lg border border-border bg-muted/[var(--opacity-muted)]">
        {youtube ? (
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="size-full"
            src={`https://www.youtube-nocookie.com/embed/${youtube[1]}`}
            title={title}
          />
        ) : (
          <video className="size-full" controls src={src}>
            <track kind="captions" />
          </video>
        )}
      </div>
      {caption ? (
        <figcaption className="text-center text-muted-foreground text-xs leading-normal">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
