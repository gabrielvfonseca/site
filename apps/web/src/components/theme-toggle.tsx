'use client';

import { useTheme } from '@gabfon/design-system/providers/theme';
import { Monitor, Moon, Sun } from 'lucide-react';
import { type JSX, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const OPTIONS = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'system', label: 'System', icon: Monitor },
  { value: 'dark', label: 'Dark', icon: Moon },
] as const;

/**
 * A compact segmented control to switch between light, system and dark themes.
 * Renders a stable, unselected state until mounted to avoid hydration mismatch.
 * @returns The ThemeToggle component.
 */
export function ThemeToggle(): JSX.Element {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <fieldset className="inline-flex items-center gap-0.5 rounded-full border border-border p-0.5">
      <legend className="sr-only">Theme</legend>
      {OPTIONS.map(({ value, label, icon: Icon }) => {
        const active = mounted && theme === value;

        return (
          <button
            aria-label={label}
            aria-pressed={active}
            className={cn(
              'flex size-6 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              active && 'bg-accent text-foreground'
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
