'use client';

import { CheckIcon, CopyIcon } from 'lucide-react';
import {
  Children,
  cloneElement,
  isValidElement,
  type JSX,
  type ReactElement,
  type ReactNode,
  useRef,
  useState,
} from 'react';
import { cn } from '@/lib/utils';

/** How long the "copied" confirmation state persists, in ms. */
const COPIED_RESET_MS = 2000;

/** Props for {@link CodeGroup}. */
interface CodeGroupProps {
  /** The fenced code blocks to group; each `title` becomes a tab label. */
  readonly children: ReactNode;
  /** Optional extra class names. */
  readonly className?: string;
}

/** The subset of code-fence props CodeGroup reads off each child. */
interface FenceProps {
  readonly title?: string;
}

/**
 * Groups multiple fenced code blocks into a single tabbed card with one shared
 * copy button — for showing the same thing across languages or files. Each
 * child fence's `title="..."` becomes its tab label. The children render bare
 * (chromeless) so the group owns the surrounding card.
 * @param props - The code-group props.
 * @returns The CodeGroup element.
 */
export function CodeGroup({
  children,
  className,
}: CodeGroupProps): JSX.Element {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const panels = Children.toArray(children).filter(
    isValidElement
  ) as ReactElement<FenceProps>[];

  const copy = async (): Promise<void> => {
    const text = containerRef.current?.querySelector('pre')?.textContent ?? '';
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), COPIED_RESET_MS);
    } catch {
      // Clipboard access can be denied; fail silently.
    }
  };

  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-border bg-muted/[var(--opacity-muted)]">
      <div className="flex items-center justify-between border-border border-b pr-2">
        <div className="flex" role="tablist">
          {panels.map((panel, index) => (
            <button
              aria-selected={active === index}
              className={cn(
                'border-transparent border-b-2 px-4 py-2 font-medium font-mono text-muted-foreground text-xs transition-colors hover:text-foreground',
                active === index && 'border-foreground text-foreground'
              )}
              key={panel.props.title ?? index}
              onClick={() => setActive(index)}
              role="tab"
              type="button"
            >
              {panel.props.title ?? `Tab ${index + 1}`}
            </button>
          ))}
        </div>
        <button
          aria-label={copied ? 'Copied' : 'Copy code'}
          className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors duration-200 hover:bg-accent hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={copy}
          type="button"
        >
          {copied ? (
            <CheckIcon aria-hidden="true" className="size-3.5" />
          ) : (
            <CopyIcon aria-hidden="true" className="size-3.5" />
          )}
        </button>
      </div>
      <div className={cn('overflow-x-auto', className)} ref={containerRef}>
        {panels.map((panel, index) => (
          <div hidden={active !== index} key={panel.props.title ?? index}>
            {cloneElement(panel, { bare: true } as FenceProps)}
          </div>
        ))}
      </div>
    </div>
  );
}
