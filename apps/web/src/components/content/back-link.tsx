import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import type { JSX } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for {@link BackLink}.
 */
interface BackLinkProps {
  /** Destination href, e.g. `/posts`. */
  readonly href: string;
  /** Visible label, e.g. `Writing`. */
  readonly label: string;
  /** Optional extra class names. */
  readonly className?: string;
}

/**
 * A compact, muted "back" affordance shown above article content. The arrow
 * nudges left on hover to reinforce the return direction.
 * @param props - The back link props.
 * @returns The BackLink element.
 */
export function BackLink({
  href,
  label,
  className,
}: BackLinkProps): JSX.Element {
  return (
    <Link
      className={cn(
        'group inline-flex w-fit items-center gap-1.5 rounded text-muted-foreground text-sm transition-colors duration-200 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      href={href}
    >
      <ArrowLeftIcon
        aria-hidden="true"
        className="group-hover:-translate-x-0.5 size-3.5 transition-transform duration-200"
      />
      {label}
    </Link>
  );
}
