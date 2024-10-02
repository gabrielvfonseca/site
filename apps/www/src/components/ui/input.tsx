import * as React from 'react'

// Utils
import { cn } from '@utils/cn';

// Types
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

// Input component
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-lg',
          'border border-gray-400 dark:border-gray-1000 bg-gray-200 dark:bg-gray-1200',
          'text-[13px] font-medium placeholder:text-gray-700 dark:placeholder:text-gray-600 file:text-sm',
          'px-3 py-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 outline-none',          
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