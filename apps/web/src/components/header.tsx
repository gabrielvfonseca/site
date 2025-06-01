import { config } from '@/constants/config';
import Link from 'next/link';

export function Header() {
  return (
    <header className="flex w-full items-center justify-between tracking-tight">
      <div className="flex flex-col items-start">
        <Link
          href="/"
          aria-label={config.name.alt}
          title={config.name.alt}
          className="mb-px inline-block font-medium text-primary-foreground no-underline"
        >
          {config.name.value}
        </Link>
        <p className="font-medium text-quaternary-foreground leading-none">
          {config.title.value}
        </p>
      </div>
    </header>
  );
}
