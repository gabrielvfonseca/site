"use client";

import { useTheme } from "@gabfon/design-system/providers/theme";
import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const OPTIONS = [
  { value: "light", label: "Light", icon: Sun },
  { value: "system", label: "System", icon: Monitor },
  { value: "dark", label: "Dark", icon: Moon },
] as const;

/**
 * A compact segmented control to switch between light, system and dark themes.
 * Renders a stable, unselected state until mounted to avoid hydration mismatch.
 * @returns The ThemeToggle component.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect -- standard mounted flag: tracks the external system "browser available" so the first client paint can differ from the server output without a hydration mismatch.
    setMounted(true);
  }, []);

  return (
    <fieldset className="border-border inline-flex items-center gap-0.5 rounded-full border p-0.5">
      <legend className="sr-only">Theme</legend>
      {OPTIONS.map(({ value, label, icon: Icon }) => {
        const active = mounted && theme === value;

        return (
          <button
            aria-label={label}
            aria-pressed={active}
            className={cn(
              "text-muted-foreground hover:text-foreground focus-visible:ring-ring flex size-6 items-center justify-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              active && "bg-accent text-foreground"
            )}
            key={value}
            onClick={() => setTheme(value)}
            title={label}
            type="button"
          >
            <Icon className="size-3.5" />
          </button>
        );
      })}
    </fieldset>
  );
}
