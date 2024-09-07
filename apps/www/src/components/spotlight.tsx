"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

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

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // UseEffect Hook for Pathname and Search Params change
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);


  // Return JSX
  return (
    <>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setOpen(true)}
      >
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-gray-400 dark:border-gray-900 px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          ⌘J
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