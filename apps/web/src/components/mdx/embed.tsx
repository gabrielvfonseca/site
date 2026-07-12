import type { JSX } from 'react';
import { cn } from '@/lib/utils';

/** Props for {@link Embed}. */
interface EmbedProps {
  /** The URL to embed (CodeSandbox, StackBlitz, CodePen, a form, …). */
  readonly src: string;
  /** Accessible title describing the embedded content. */
  readonly title: string;
  /** CSS aspect ratio as `"width / height"`. Defaults to `"16 / 9"`. */
  readonly ratio?: string;
  /** Fixed pixel height instead of an aspect ratio (for editors/forms). */
  readonly height?: number;
  /** Optional extra class names. */
  readonly className?: string;
}

/** Default aspect ratio when neither ratio nor height is given. */
const DEFAULT_RATIO = '16 / 9';

/**
 * A generic, lazily-loaded iframe embed for MDX — CodeSandbox, StackBlitz,
 * CodePen, maps, forms, and the like. Sizes by aspect ratio by default, or a
 * fixed height when interactive editors need one. For YouTube, prefer the
 * dedicated `Video` component.
 * @param props - The embed props.
 * @returns The Embed element.
 */
export function Embed({
  src,
  title,
  ratio = DEFAULT_RATIO,
  height,
  className,
}: EmbedProps): JSX.Element {
  return (
    <div
      className={cn(
        'not-prose my-6 overflow-hidden rounded-lg border border-border',
        className
      )}
      style={height ? { height } : { aspectRatio: ratio }}
    >
      <iframe
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        className="h-full w-full"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        src={src}
        title={title}
      />
    </div>
  );
}
