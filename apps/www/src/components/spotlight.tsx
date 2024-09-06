"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";

// Icons
import {
  Folder,
  Home,
  Pencil,
  Text,
} from "lucide-react";

// UI Components
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@components/ui/command";
import { Button } from "./ui/button";

// ContentLayer
import { allNotes } from "@/.contentlayer/generated";

// Custom Hook
import { useDeviceType } from '@hooks/use-device-type';

export function Spotlight() {
  // Spotlight State
  const [open, setOpen] = React.useState<boolean>(false);

  // Router
  const router = useRouter();

  // Pathname and Search Params
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get Device Type
  const deviceType = useDeviceType();

  // UseEffect Hook for Keyboard Shortcut
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Check device type and set appropriate shortcut
      const isMac = deviceType === 'macOS';
      const isWindows = deviceType === 'Windows';
      const isMobile = deviceType === 'Android' || deviceType === 'iOS';

      // Define shortcut conditions
      const openSpotlight = e.key === "j" && (isMac ? e.metaKey : e.ctrlKey);

      // Handle open/close for non-mobile devices
      if (openSpotlight && !isMobile) {
        e.preventDefault();
        setOpen((prevOpen) => !prevOpen);
      } else if (isMobile) {
        // Display open button or other UI element for mobile
        if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [deviceType]);

  // UseEffect Hook for Pathname and Search Params change
  React.useEffect(() => {
    setOpen(false);
  }, [pathname, searchParams]);

  // Determine button text based on device type
  const getButtonText = () => {
    switch (deviceType) {
      case 'macOS':
        return '⌘J';
      case 'Windows':
        return 'Ctrl+J';
      case 'Android':
      case 'iOS':
        return 'Open';
      default:
        return 'Open';
    }
  };

  // Return JSX
  return (
    <>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setOpen(true)}
      >
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-gray-400 dark:border-gray-900 px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          {getButtonText()}
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem
              onSelect={() => router.push("/")}
            >
              <Home className="mr-2 h-4 w-4" />
              <span>Home</span>
            </CommandItem>
            <CommandItem
              onSelect={() => router.push("/notes")}
            >
              <Pencil className="mr-2 h-4 w-4" />
              <span>Notes</span>
            </CommandItem>
            <CommandItem
              onSelect={() => router.push("/projects")}
            >
              <Folder className="mr-2 h-4 w-4" />
              <span>Projects</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Latest Notes">
            {
              allNotes.map((note) => (
                <CommandItem
                  key={note.slug}
                  onSelect={() => router.push(note.slug)}
                >
                  <Text className="mr-2 h-4 w-4" />
                  <span>{note.title}</span>
                </CommandItem>
              ))
            }
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};