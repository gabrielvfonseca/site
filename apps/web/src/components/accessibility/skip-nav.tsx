"use client";

import { useState } from "react";

/** Handle the skip trigger, focusing the main content element. */
function handleSkip(event: React.MouseEvent<HTMLButtonElement>) {
  event.preventDefault();

  // Find the main content element when skip is triggered
  const mainElement = document.querySelector<HTMLElement>("#main-content");
  if (mainElement) {
    mainElement.focus();
    mainElement.scrollIntoView({ behavior: "smooth" });
  }
}

/**
 * Skip navigation component for keyboard users
 * Allows users to skip directly to main content
 */
export function SkipNav() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <button
      className={`bg-primary text-primary-foreground absolute top-0 left-0 z-50 -translate-y-full transform rounded-md px-4 py-2 transition-transform duration-200 focus:translate-y-0 ${isFocused ? "translate-y-0" : ""}`}
      onBlur={() => setIsFocused(false)}
      onClick={handleSkip}
      onFocus={() => setIsFocused(true)}
      type="button"
    >
      Skip to main content
    </button>
  );
}
