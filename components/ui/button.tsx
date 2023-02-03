// ./components/ui/button.tsx

import * as React from "react";

/* Styles */
import { VariantProps, cva } from "class-variance-authority";
import classNames from "classnames";

/* Framer Motion */
import { motion, HTMLMotionProps } from "framer-motion";
import { motionButton } from "@/lib/motion/animation";

const buttonVariants = cva(
  "inline-flex w-fit items-center justify-center rounded-md text-sm font-medium focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-over-light text-black hover:opacity-80 dark:bg-over-dark dark:text-white",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600",
        outline:
          "bg-transparent border-1 border-border hover:bg-over-light dark:bg-over-dark dark:text-gray-dark",
        subtle:
          "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100",
        ghost:
          "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-100 dark:hover:text-slate-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent",
        link: "bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends VariantProps<typeof buttonVariants>, HTMLMotionProps<"button"> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <motion.button
        initial={motionButton.initial}
        animate={motionButton.animate}
        transition={motionButton.transition}
        exit={motionButton.exit}
        whileTap={motionButton.whileTap}
        
        className={classNames(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
