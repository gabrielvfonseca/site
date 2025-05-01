"use client";

import { useTheme } from "next-themes";
import { Button } from "@repo/design-system/components/ui/button";
import { Monitor, Moon, Sun } from "lucide-react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center rounded-full border border-border p-0.5">
      <Button
        variant="ghost"
        size="sm"
        className={`h-6 w-6 rounded-full p-0 ${theme === "light" ? "bg-muted" : ""}`}
        onClick={() => setTheme("light")}
        title="Light mode"
      >
        <Sun className="h-3 w-3" />
        <span className="sr-only">Light mode</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={`h-6 w-6 rounded-full p-0 ${theme === "dark" ? "bg-muted" : ""}`}
        onClick={() => setTheme("dark")}
        title="Dark mode"
      >
        <Moon className="h-3 w-3" />
        <span className="sr-only">Dark mode</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={`h-6 w-6 rounded-full p-0 ${theme === "system" ? "bg-muted" : ""}`}
        onClick={() => setTheme("system")}
        title="System mode"
      >
        <Monitor className="h-3 w-3" />
        <span className="sr-only">System mode</span>
      </Button>
    </div>
  )
}
