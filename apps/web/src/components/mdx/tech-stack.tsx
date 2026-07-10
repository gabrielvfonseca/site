import { Badge } from '@gabfon/design-system/components/badge';
import type { JSX } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for {@link TechStack}.
 */
interface TechStackProps {
  /** The list of technologies / tags to render as pills. */
  readonly items: readonly string[];
  /** Optional label rendered above the pills, e.g. `Built with`. */
  readonly label?: string;
  /** Optional extra class names. */
  readonly className?: string;
}

/**
 * A labelled row of pill badges for MDX — ideal for a project's tech stack or
 * a post's topic tags. Uses the shared design-system {@link Badge}.
 * @param props - The tech stack props.
 * @returns The TechStack element.
 */
export function TechStack({
  items,
  label,
  className,
}: TechStackProps): JSX.Element {
  return (
    <div className={cn('not-prose flex flex-col gap-2.5', className)}>
      {label ? (
        <span className="text-muted-foreground text-xs uppercase tracking-wider">
          {label}
        </span>
      ) : null}
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <Badge key={item}>{item}</Badge>
        ))}
      </div>
    </div>
  );
}
