import type { JSX } from 'react';
import { config } from '@/constants/config';
import { getCurrentYear } from '@/utils/date';

/**
 * The Footer for the site.
 * @returns The Footer for the site.
 */
export function Footer(): JSX.Element {
  // Get the current year
  const currentYear = getCurrentYear();

  return (
    <footer className="mt-14 flex w-full items-center justify-between tracking-tight sm:mt-24">
      <span className="text-tertiary text-xs leading-none tracking-normal">
        &copy; {currentYear}. All rights reserved.
      </span>
      <nav className="flex flex-row gap-x-2 text-xs leading-none tracking-normal">
        {Object.entries(config.social).map(([key, value]) => (
          <a
            className="cursor-pointer text-tertiary transition-colors duration-300 hover:text-secondary"
            href={value}
            key={key}
            rel="noopener noreferrer"
            target="_blank"
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </a>
        ))}
      </nav>
    </footer>
  );
}
