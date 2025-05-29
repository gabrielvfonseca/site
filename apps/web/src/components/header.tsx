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
    </header>
  );
}
