import * as React from 'react';

// Radix UI
import { Slot } from '@radix-ui/react-slot';

// Class Variance Authority
import { cva, type VariantProps } from 'class-variance-authority';

// Utils
import { cn } from '@utils/cn';

// Loading Spinner
import Spinner from '@components/spinner';

// Variants
const buttonVariants = cva(
  'inline-flex items-center justify-center cursor-pointer whitespace-nowrap font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border border-gray-800 text-white bg-gradient-to-b from-gray-900 to-gray-1000 hover:to-gray-800 dark:border-gray-400 dark:text-black dark:from-gray-100 dark:to-gray-200 dark:hover:to-gray-300',
        secondary: 'border border-gray-400 text-black bg-gradient-to-b from-gray-100 to-gray-200 hover:to-gray-300 dark:border-gray-800 dark:text-white dark:from-gray-1000 dark:to-gray-1100 dark:hover:opacity-85',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-gray-400 hover:bg-gray-100 text-gray-800 dark:border-gray-800 dark:text-white dark:hover:bg-gray-900',
        transparent: 'dark:text-gray-400 dark:hover:text-gray-400/80',
        link: '',
        ghost: '',
      },
      size: {
        default: 'h-10 px-4 py-2 text-base',
        sm: 'h-7 px-3 text-xs',
        lg: 'h-11 px-8 text-lg',
        icon: 'size-9',
      },
      radius: {
        default: 'rounded-lg',
        sm: 'rounded-md',
        lg: 'rounded-xl',
        md: 'rounded-md',
        full: 'rounded-full',
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      radius: 'default',
    },
  }
);

// Types
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'transparent' | 'link' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  radius?: 'default' | 'sm' | 'lg' | 'md' | 'full';
  asChild?: boolean;
  loading?: boolean;
  loadingWidth?: string; // New prop for width when loading
}

// Button component
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    loading = false, // Default to false for non-loading state
    size, 
    radius, 
    asChild = false, 
    loadingWidth = 'w-20', // Default width for loading state
    children,
    ...props 
  }, ref) => {
    // Slot component
    const Comp = asChild ? Slot : 'button';

    // Loading component
    if (loading) {
      return (
        <Comp
          className={cn(buttonVariants({ radius, variant, size, className }), 'flex items-center justify-center', loadingWidth)}
          ref={ref}
          {...props}
        >
          <Spinner size='sm' />
        </Comp>
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ radius, variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

// Display name for the Button component
Button.displayName = 'Button';

// Export
export { 
  Button, 
  buttonVariants 
};
