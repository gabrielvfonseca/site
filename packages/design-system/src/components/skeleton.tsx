import type * as React from "react";

import { cn } from "../lib/utils";

export function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("bg-accent animate-pulse rounded-md", className)}
      data-slot="skeleton"
      {...props}
    />
  );
}
