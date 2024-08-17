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
          'border file:border-0 border-gray-300 dark:border-gray-900',
          'bg-white dark:bg-gray-1000 file:bg-transparent',
          'text-[13px] font-medium placeholder:text-zinc-400 file:text-sm',
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