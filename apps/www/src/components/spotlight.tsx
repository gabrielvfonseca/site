"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

// Icons
import {
  Folder,
  Home,
  Menu,
  Pencil,
  Text,
} from "lucide-react";

// UI Components
import {
  CommandDialog,
  CommandDrawer,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@components/ui/command";
import { Button } from "@components/ui/button";

// ContentLayer
import { allNotes } from "@/.contentlayer/generated";

// Types
import type { Notes as Note } from 'contentlayer/generated';
import { useMediaQuery } from "../hooks/use-media-query";

// Spotlight Component
export function Spotlight() {
  // Spotlight State
  const [open, setOpen] = React.useState<boolean>(false);

  // Router
  const router = useRouter();

  // Pathname
  const pathname = usePathname();

  // UseEffect Hook for Keyboard Shortcut
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Define shortcut conditions
      const openSpotlight = e.key === "j" && (e.metaKey || e.ctrlKey);

      // Handle open/close for non-mobile devices
      if (openSpotlight) {
        e.preventDefault();
        setOpen((prevOpen) => !prevOpen);
      }
    };

    // Add Event Listener
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // UseEffect Hook for Pathname and Search Params change
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Media Query
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Content JSX
  const CommandContent = (): JSX.Element => (
    <>
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
            allNotes
              .sort((a: Note, b: Note) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((note: Note) => (
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
    </>
  );

  // Return JSX
  return (
    <>
      <Button
        size={isDesktop ? 'sm' : 'icon'}
        variant={isDesktop ? 'outline' : 'ghost'}
        onClick={() => setOpen(true)}
        className="sm:px-2"
      >
        {isDesktop ? '⌘J' : <Menu size={18} className="text-gray-800 dark:text-gray-600" />}
      </Button>

      {      
        isDesktop ? (
          <CommandDialog 
            open={open} 
            onOpenChange={setOpen}
          >
            <CommandContent />
          </CommandDialog>
        ) : (
          <CommandDrawer
            open={open}
            onOpenChange={setOpen}
          >
            <CommandContent />
          </CommandDrawer>
        )
      }
    </>
  );
};