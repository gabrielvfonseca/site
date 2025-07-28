import { config } from '@/constants/config';
import { getCurrentYear } from '@/utils/date';
import type { JSX } from 'react';

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
            key={key}
            target="_blank"
            rel="noopener noreferrer"
            href={value.url}
            className="text-tertiary transition-colors duration-300 hover:text-secondary"
          >
            {value.alt}
          </a>
        ))}
      </nav>
    </footer>
  );
}
