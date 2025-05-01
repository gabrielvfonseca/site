import Link from "next/link";

export function Header() {
  return (
    <header className='flex justify-between items-center tracking-tight w-full'>
      <div className='flex flex-col items-start'>
        <Link  
          href='/'
          className='mb-px inline-block font-medium no-underline'
        >
          Gabriel Fonseca
        </Link>
        <p className='leading-none font-medium text-quaternary-foreground'>
          Software Developer
        </p>
      </div>
    </header>
  );
}