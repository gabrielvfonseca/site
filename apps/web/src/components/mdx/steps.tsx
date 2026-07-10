import type { JSX, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the {@link Steps} container.
 */
interface StepsProps {
  /** Ordered {@link Step} children. */
  readonly children: ReactNode;
  /** Optional extra class names. */
  readonly className?: string;
}

/**
 * A vertical, numbered process list for walkthroughs in MDX. Renders a
 * continuous connector line down the left gutter with each {@link Step}
 * marker sitting on top of it. Monochrome by design.
 * @param props - The steps props.
 * @returns The Steps container.
 */
export function Steps({ children, className }: StepsProps): JSX.Element {
  return (
    <div
      className={cn(
        'not-prose relative ml-2 flex flex-col gap-6 border-border border-l pl-8 [counter-reset:step]',
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * Props for a single {@link Step}.
 */
interface StepProps {
  /** Short step title. */
  readonly title: string;
  /** Step body content. */
  readonly children: ReactNode;
}

/**
 * A single step within {@link Steps}. The numbered marker is derived
 * automatically from source order via a CSS counter.
 * @param props - The step props.
 * @returns The Step element.
 */
export function Step({ title, children }: StepProps): JSX.Element {
  return (
    <div className="relative [counter-increment:step]">
      <span
        aria-hidden="true"
        className="-left-[2.55rem] absolute flex size-6 items-center justify-center rounded-full border border-border bg-background text-muted-foreground text-xs tabular-nums before:content-[counter(step)]"
      />
      <div className="flex flex-col gap-1.5">
        <p className="font-medium text-foreground text-sm leading-none">
          {title}
        </p>
        <div className="text-muted-foreground text-sm leading-relaxed [&>*+*]:mt-2 [&>p]:m-0">
          {children}
        </div>
      </div>
    </div>
  );
}
