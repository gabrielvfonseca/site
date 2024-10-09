import * as React from 'react'

// Utils
import { cn } from '../utils/cn';

// Types
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

// Input Variants
export const inputVariants = cn(
  'rounded-lg',
  'border border-gray-200 bg-background-200',
  'text-sm font-normal text-gray-900 placeholder:text-gray-600',
  'p-3 focus:outline-none', 
);

// Input component
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full',
          'disabled:cursor-not-allowed disabled:opacity-50 outline-none',
          inputVariants, 
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  }
);
// Display Name for Input Component
Input.displayName = 'Input';

// Export
export { Input };