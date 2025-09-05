import { cn } from '@gabfon/design-system/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes, JSX } from 'react';

const spinnerVariants = cva('spinner-blade', {
  variants: {
    variant: {
      default: 'bg-accent-1',
      secondary: 'bg-accent-8',
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
      {Array.from({ length }, (_, index: number) => (
        <span
          className={cn(spinnerVariants({ variant, className }))}
          key={index}
          {...props}
        />
      ))}
    </div>
  );
}

export { Spinner, type SpinnerProps };
