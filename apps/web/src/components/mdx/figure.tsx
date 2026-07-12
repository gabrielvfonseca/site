import type { JSX } from 'react';
import { ZoomableImage } from '@/components/mdx/zoomable-image';
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
  /** Enable click-to-zoom into a full-screen lightbox. */
  readonly zoom?: boolean;
  /** Optional extra class names. */
  readonly className?: string;
}

/**
 * A captioned image for MDX. Wraps the image in a bordered, rounded frame and
 * renders an optional centered caption in the muted voice used site-wide. With
 * `zoom`, the image expands to a full-screen lightbox on click.
 * @param props - The figure props.
 * @returns The Figure element.
 */
export function Figure({
  src,
  alt,
  caption,
  framed = false,
  zoom = false,
  className,
}: FigureProps): JSX.Element {
  const imageClass = cn('w-full', framed ? 'rounded-lg' : '');
  return (
    <figure className={cn('not-prose flex flex-col gap-3', className)}>
      <div
        className={cn(
          'overflow-hidden rounded-lg border border-border',
          framed && 'bg-muted/[var(--opacity-muted)] p-4 sm:p-8'
        )}
      >
        {zoom ? (
          <ZoomableImage alt={alt} className={imageClass} src={src} />
        ) : (
          // biome-ignore lint/performance/noImgElement: MDX authors provide plain images without dimensions
          // biome-ignore lint/nursery/useImageSize: intrinsic size is unknown for authored MDX
          <img alt={alt} className={imageClass} loading="lazy" src={src} />
        )}
      </div>
      {caption ? (
        <figcaption className="text-center text-[length:var(--font-size-caption)] text-muted-foreground leading-normal">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
