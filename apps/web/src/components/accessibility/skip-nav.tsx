'use client';

import { useState } from 'react';

/**
 * Skip navigation component for keyboard users
 * Allows users to skip directly to main content
 */
export function SkipNav() {
  const [isFocused, setIsFocused] = useState(false);
  const handleSkip = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // Find the main content element when skip is triggered
    const mainElement = document.getElementById('main-content');
    if (mainElement) {
      mainElement.focus();
      mainElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      className={`-translate-y-full absolute top-0 left-0 z-50 transform rounded-md bg-primary px-4 py-2 text-primary-foreground transition-transform duration-200 focus:translate-y-0 ${isFocused ? 'translate-y-0' : ''}`}
      onBlur={() => setIsFocused(false)}
      onClick={handleSkip}
      onFocus={() => setIsFocused(true)}
      type="button"
    >
      Skip to main content
    </button>
  );
}
