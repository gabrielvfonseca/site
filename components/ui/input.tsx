// ./components/input.tsx

import * as React from "react"

/* Styles */
import classNames from "classnames"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={classNames(
          "flex h-10 w-full", "rounded-md",
          "text-gray-light dark:text-gray-dark",
          "border-1 border-border", "bg-transparent", "py-2 px-3 text-sm", "placeholder:text-border placeholder:text-opacity-70", "focus:outline-none focus:ring-2 dark:focus:ring-gray-dark focus:ring-gray-light focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-offset-border",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
