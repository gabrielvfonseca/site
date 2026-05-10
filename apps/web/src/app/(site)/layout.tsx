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
const Layout = ({ children }: LayoutProps): JSX.Element => (
  <div className="container mx-auto max-w-xl px-4 py-14 sm:px-6 sm:py-28 md:max-w-2xl lg:px-8">
    <Header />
    <main
      aria-label="Main content"
      className="mt-14 focus:outline-none sm:mt-24"
      id="main-content"
      tabIndex={-1}
    >
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;
