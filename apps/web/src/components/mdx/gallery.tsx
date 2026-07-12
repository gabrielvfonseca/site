import type { JSX } from 'react';
import { ZoomableImage } from '@/components/mdx/zoomable-image';
import { cn } from '@/lib/utils';

/** A single image within a {@link Gallery}. */
interface GalleryItem {
  /** Image source URL. */
  readonly src: string;
  /** Accessible alt text. */
  readonly alt: string;
  /** Optional per-image caption. */
  readonly caption?: string;
}

/** Props for {@link Gallery}. */
interface GalleryProps {
  /** The images to lay out. */
  readonly items: readonly GalleryItem[];
  /** Column count on wide viewports (2 or 3). Defaults to 2. */
  readonly columns?: 2 | 3;
  /** Optional extra class names. */
  readonly className?: string;
}

/** Tailwind column classes keyed by the requested column count. */
const COLUMN_CLASS: Record<2 | 3, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
};

/**
 * A responsive image grid for MDX. Each image opens to a full-screen lightbox
 * on click and may carry its own caption. Collapses to a single column on
 * small viewports.
 * @param props - The gallery props.
 * @returns The Gallery element.
 */
export function Gallery({
  items,
  columns = 2,
  className,
}: GalleryProps): JSX.Element {
  return (
    <div
      className={cn(
        'not-prose grid grid-cols-1 gap-3',
        COLUMN_CLASS[columns],
        className
      )}
    >
      {items.map((item) => (
        <figure className="flex flex-col gap-2" key={item.src}>
          <div className="overflow-hidden rounded-lg border border-border">
            <ZoomableImage alt={item.alt} src={item.src} />
          </div>
          {item.caption ? (
            <figcaption className="text-center text-[length:var(--font-size-caption)] text-muted-foreground leading-normal">
              {item.caption}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}
