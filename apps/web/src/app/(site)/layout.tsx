import type { JSX, ReactNode } from 'react';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';

/**
 * The LayoutProps for the site.
 */
interface LayoutProps {
  /**
   * The children for the site.
   */
  readonly children: ReactNode;
}

/**
 * The Layout for the site.
 * @param props - The LayoutProps.
 * @returns The Layout for the site.
 */
export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div className="container mx-auto max-w-lg px-4 py-14 sm:max-w-xl sm:py-28">
      <div className="min-h-screen">
        <Header />
        <main
          aria-label="Main content"
          className="mt-14 sm:mt-24"
          id="main-content"
        >
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
