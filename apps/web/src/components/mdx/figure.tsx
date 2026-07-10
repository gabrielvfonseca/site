import type { JSX } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for {@link Figure}.
 */
interface FigureProps {
  /** Image source URL. */
  readonly src: string;
  /** Accessible alt text. */
  readonly alt: string;
  /** Optional caption rendered beneath the image. */
  readonly caption?: string;
  /** Render the image edge-to-edge inside a framed, muted plate. */
  readonly framed?: boolean;
  /** Optional extra class names. */
  readonly className?: string;
}

/**
 * A captioned image for MDX. Wraps the image in a bordered, rounded frame and
 * renders an optional centered caption in the muted voice used site-wide.
 * @param props - The figure props.
 * @returns The Figure element.
 */
export function Figure({
  src,
  alt,
  caption,
  framed = false,
  className,
}: FigureProps): JSX.Element {
  return (
    <figure className={cn('not-prose flex flex-col gap-3', className)}>
      <div
        className={cn(
          'overflow-hidden rounded-lg border border-border',
          framed && 'bg-muted/[var(--opacity-muted)] p-4 sm:p-8'
        )}
      >
        {/* biome-ignore lint/performance/noImgElement: MDX authors provide plain images without dimensions */}
        {/* biome-ignore lint/nursery/useImageSize: intrinsic size is unknown for authored MDX */}
        <img
          alt={alt}
          className={cn('w-full', framed ? 'rounded-lg' : '')}
          loading="lazy"
          src={src}
        />
      </div>
      {caption ? (
        <figcaption className="text-center text-muted-foreground text-xs leading-normal">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
