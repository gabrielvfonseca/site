import type { JSX } from 'react';
import { cn } from '@/lib/utils';

/** Props for {@link Gist}. */
interface GistProps {
  /** The gist id (the hash in `gist.github.com/<user>/<id>`). */
  readonly id: string;
  /** The gist owner's username. */
  readonly user: string;
  /** Optional single file to embed from a multi-file gist. */
  readonly file?: string;
  /** Iframe height in pixels. Defaults to 320. */
  readonly height?: number;
  /** Optional extra class names. */
  readonly className?: string;
}

/** Default embed height in pixels. */
const DEFAULT_HEIGHT = 320;

/**
 * Embeds a GitHub gist for MDX. GitHub only ships a `document.write` script, so
 * it is loaded inside a sandboxed iframe via `srcDoc` (where `document.write`
 * still works) rather than injected into the page.
 * @param props - The gist props.
 * @returns The Gist element.
 */
export function Gist({
  id,
  user,
  file,
  height = DEFAULT_HEIGHT,
  className,
}: GistProps): JSX.Element {
  const query = file ? `?file=${encodeURIComponent(file)}` : '';
  const srcDoc = `<html><head><base target="_parent"></head><body style="margin:0">
    <script src="https://gist.github.com/${user}/${id}.js${query}"></script>
  </body></html>`;

  return (
    <div
      className={cn(
        'not-prose my-6 overflow-hidden rounded-lg border border-border',
        className
      )}
    >
      <iframe
        className="w-full"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-popups"
        srcDoc={srcDoc}
        style={{ height }}
        title={`GitHub gist ${id}`}
      />
    </div>
  );
}
