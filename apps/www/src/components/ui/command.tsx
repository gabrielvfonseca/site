"use client"

import * as React from "react";

// Command
import { Command as CommandPrimitive } from "cmdk";

// Icons
import { Search } from "lucide-react";

// Classnames
import { cn } from "@utils/cn";

// Dialog Component
import { Dialog, DialogContent } from "./dialog";

// Types
interface CommandDialogProps extends DialogProps {}

import { type DialogProps } from "@radix-ui/react-dialog";
import { ScrollArea } from "./scroll-area";

// Command Component
const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    )}
    {...props}
  />
));
// Display Name for Command
Command.displayName = CommandPrimitive.displayName;

// CommandDialogProps
const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
};

// CommandInput Component
const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b border-gray-400 dark:border-gray-900 px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full text-black dark:text-white rounded-md bg-transparent py-3 text-sm outline-none font-medium placeholder:text-gray-700 dark:placeholder:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
));
// Display Name for CommandInput
CommandInput.displayName = CommandPrimitive.Input.displayName;

// CommandList Component
const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, children, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn(className)}
    {...props}
  >
    <ScrollArea className="h-[320px]">
      {children}
    </ScrollArea>
  </CommandPrimitive.List>
));
// Display Name for CommandList
CommandList.displayName = CommandPrimitive.List.displayName;

// CommandEmpty Component
const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center font-medium text-sm"
    {...props}
  />
));
// Display Name for CommandEmpty
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

// CommandGroup Component
const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden px-1 pt-1 pb-2 font-medium text-black dark:text-white [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
      className
    )}
    {...props}
  />
));
// Display Name for CommandGroup
CommandGroup.displayName = CommandPrimitive.Group.displayName;

// CommandSeparator Component
const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-gray-400 dark:bg-gray-900", className)}
    {...props}
  />
));
// Display Name for CommandSeparator
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

// CommandItem Component
const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center font-medium rounded-md px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-zinc-900 dark:data-[selected='true']:bg-gray-200 dark:data-[selected=true]:text-gray-1000 data-[selected=true]:text-gray-200 data-[disabled=true]:opacity-50",
      className
    )}
    {...props}
  />
));
// Display Name for CommandItem
CommandItem.displayName = CommandPrimitive.Item.displayName;

// CommandShortcut Component
const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest data-[selected='true']:text-gray-600 dark:data-[selected='true']:text-gray-500",
        className
      )}
      {...props}
    />
  )
};
// Display Name for CommandShortcut
CommandShortcut.displayName = "CommandShortcut";

// Export Command Components
export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};