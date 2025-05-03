import { type VariantProps, cva } from 'class-variance-authority';
import type { HTMLAttributes, JSX } from 'react';

import { cn } from '@repo/design-system/lib/utils';

const spinnerVariants = cva('spinner-blade', {
  variants: {
    variant: {
      default: 'bg-[var(--spinner-blade)]',
      secondary: 'bg-[var(--spinner-blade-contrast)]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type SpinnerProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof spinnerVariants> & {
    length?: number;
  };

function Spinner({
  variant,
  className,
  length = 9,
  ...props
}: SpinnerProps): JSX.Element {
  return (
    <div className="spinner">
      {Array.from({ length: length }, (_, index: number) => (
        <span
          key={index}
          className={cn(spinnerVariants({ variant, className }))}
          {...props}
        />
      ))}
    </div>
  );
}

export { Spinner, type SpinnerProps };
