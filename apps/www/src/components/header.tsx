import Link from 'next/link';
import type { JSX } from 'react';
import { config } from '@/constants/config';

/**
 * The Header for the site.
 * @returns The Header for the site.
 */
export function Header(): JSX.Element {
  return (
    <header className="flex w-full items-center justify-between tracking-tight">
      <div className="flex flex-col items-start">
        <Link
          aria-label={config.name}
          className="mb-px inline-block font-medium text-primary no-underline"
          href="/"
          title={config.name}
        >
          {config.name}
        </Link>
        <p className="font-medium text-quaternary leading-none">
          {config.title}
        </p>
      </div>
    </header>
  );
}
