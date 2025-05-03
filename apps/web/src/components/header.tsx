import { config } from '@/constants/config';
import Link from 'next/link';
export function Header() {
  return (
    <header className="flex w-full items-center justify-between tracking-tight">
      <div className="flex flex-col items-start">
        <Link
          href="/"
          className="mb-px inline-block font-medium text-primary-foreground no-underline"
        >
          Gabriel Fonseca
        </Link>
        <p className="font-medium text-quaternary-foreground leading-none">
          Software Developer
        </p>
      </div>
      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded px-1.5 font-medium font-mono text-[12px] text-tertiary-foreground opacity-100">
        <span className="text-xs">{config.modal.command.shortcutModifier}</span>
        {config.modal.command.shortcutKey}
      </kbd>
    </header>
  );
}
