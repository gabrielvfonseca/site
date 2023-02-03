// ./components/ui/hovercard.tsx

"use client"

import * as React from "react";

/* Styles */
import classNames from "classnames";

/* Radix */
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

const HoverCard = HoverCardPrimitive.Root;
const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={classNames(
      "z-20 p-4", "w-64", 
      "rounded-md shadow-md", 
      "bg-over-light dark:bg-over-dark",
      "border-1 border-solid border-border",
      "border-opacity-30 dark:border-opacity-100",
      "animate-in",
      className
    )}
    {...props}
  />
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };
