import type { JSX, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for {@link Lead}.
 */
interface LeadProps {
  /** The introductory paragraph text. */
  readonly children: ReactNode;
  /** When set, sets the first letter as a raised drop cap. */
  readonly dropcap?: boolean;
  /** Optional extra class names. */
  readonly className?: string;
}

/**
 * A lead-in paragraph for MDX that opens a piece at a larger size than the
 * body, optionally with a drop cap. Sets the tone before the body settles into
 * its regular rhythm. Monochrome, no decorative color.
 * @param props - The lead props.
 * @returns The Lead element.
 */
export function Lead({
  children,
  dropcap = false,
  className,
}: LeadProps): JSX.Element {
  return (
    <p
      className={cn(
        'text-balance text-foreground text-lg leading-relaxed sm:text-xl',
        dropcap &&
          '[&::first-letter]:float-left [&::first-letter]:mr-2 [&::first-letter]:font-semibold [&::first-letter]:text-5xl [&::first-letter]:leading-[0.8]',
        className
      )}
    >
      {children}
    </p>
  );
}
