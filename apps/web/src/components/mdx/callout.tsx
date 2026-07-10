import { InfoIcon, LightbulbIcon, TriangleAlertIcon } from 'lucide-react';
import type { ComponentType, JSX, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type CalloutVariant = 'note' | 'tip' | 'warning';

const VARIANTS: Record<
  CalloutVariant,
  { icon: ComponentType<{ className?: string }>; label: string }
> = {
  note: { icon: InfoIcon, label: 'Note' },
  tip: { icon: LightbulbIcon, label: 'Tip' },
  warning: { icon: TriangleAlertIcon, label: 'Warning' },
};

interface CalloutProps {
  /** Visual variant. Defaults to `note`. */
  variant?: CalloutVariant;
  /** Optional heading; falls back to the variant label. */
  title?: string;
  children: ReactNode;
}

/**
 * A scalable, design-system-aligned callout for MDX content (note/tip/warning).
 * Monochrome by design; the `warning` variant borrows the destructive token.
 * @param props - The callout props.
 * @returns The Callout component.
 */
export function Callout({
  variant = 'note',
  title,
  children,
}: CalloutProps): JSX.Element {
  const { icon: Icon, label } = VARIANTS[variant];

  return (
    <div
      className={cn(
        'not-prose my-6 flex gap-3 rounded-lg border p-4 text-sm',
        variant === 'warning'
          ? 'border-destructive/[var(--opacity-subtle)] bg-destructive/[var(--opacity-disabled)]'
          : 'border-border bg-muted/[var(--opacity-muted)]'
      )}
    >
      <Icon
        className={cn(
          'mt-0.5 size-4 shrink-0',
          variant === 'warning' ? 'text-destructive' : 'text-muted-foreground'
        )}
      />
      <div className="flex flex-col gap-1">
        <p className="font-medium text-foreground leading-none">
          {title ?? label}
        </p>
        <div className="text-muted-foreground leading-relaxed [&>p]:m-0">
          {children}
        </div>
      </div>
    </div>
  );
}
