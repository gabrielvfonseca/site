import { buttonVariants } from '@repo/design-system/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex h-full min-h-screen max-w-md flex-col items-center justify-center gap-4">
      <h2 className="font-semibold text-lg text-primary">Not Found</h2>
      <p className="text-center text-md">Could not find requested resource</p>
      <Link
        href="/"
        className={buttonVariants({ variant: 'default', shape: 'full' })}
      >
        Go home
      </Link>
    </div>
  );
}
