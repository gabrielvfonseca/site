import { config } from '@/constants/config';
import Link from 'next/link';
import type { JSX } from 'react';

export function Header(): JSX.Element {
  return (
    <header className="flex w-full items-center justify-between tracking-tight">
      <div className="flex flex-col items-start">
        <Link
          href="/"
          aria-label={config.name}
          title={config.name}
          className="mb-px inline-block font-medium text-primary-foreground no-underline"
        >
          {config.name}
        </Link>
        <p className="font-medium text-quaternary-foreground leading-none">
          {config.title}
        </p>
      </div>
    </header>
  );
}
