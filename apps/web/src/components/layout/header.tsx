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
      <div className="flex flex-col items-start">
        <Link
          aria-label={CONFIG.name}
          className="mb-px inline-block font-medium text-foreground no-underline"
          href="/"
          title={CONFIG.name}
        >
          {CONFIG.name}
        </Link>
        <p className="font-medium text-muted-foreground/75 leading-none">
          {CONFIG.title}
        </p>
      </div>
    </header>
  );
}
