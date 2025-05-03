import { cn } from "@repo/design-system/lib/utils"

export function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-modal animate-pulse rounded-md", className)}
      {...props}
    />
  )
}