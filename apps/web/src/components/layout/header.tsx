import Link from 'next/link';
import type { JSX } from 'react';
import { CONFIG } from '@/constants/config';

/**
 * The Header for the site.
 * @returns The Header for the site.
 */
export function Header(): JSX.Element {
  return (
    <header className="flex w-full items-center justify-between tracking-tight">
      <nav aria-label="Main navigation" className="flex flex-col items-start">
        <Link
          aria-label={`${CONFIG.name} - Home`}
          className="mb-px inline-block rounded font-medium text-foreground no-underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          href="/"
          title={CONFIG.name}
        >
          {CONFIG.name}
        </Link>
        <p className="font-medium text-muted-foreground/75 leading-none">
          {CONFIG.title}
        </p>
      </nav>
    </header>
  );
}
