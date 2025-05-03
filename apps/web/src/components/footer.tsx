import { config } from '@/constants/config';

export function Footer() {
  return (
    <footer className="mt-14 flex w-full items-center justify-between tracking-tight sm:mt-24">
      <span className="font-medium text-quaternary-foreground/70 text-xs leading-none tracking-normal">
        &copy; {new Date().getFullYear()}. All rights reserved.
      </span>
      <nav className="flex flex-row gap-x-2 font-medium text-xs leading-none tracking-normal">
        {Object.entries(config.social).map(([key, value]) => (
          <a
            key={key}
            target="_blank"
            rel="noopener noreferrer"
            href={value.url}
            className="text-quaternary-foreground/70 transition-colors duration-300 hover:text-quaternary-foreground"
          >
            {value.alt}
          </a>
        ))}
      </nav>
    </footer>
  );
}
