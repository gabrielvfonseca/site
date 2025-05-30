import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import type React from 'react';

type AppLayoutProps = {
  readonly children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="container mx-auto max-w-lg px-4 py-14 sm:max-w-xl sm:py-28">
      <Header />
      <main className="mt-14 sm:mt-24">{children}</main>
      <Footer />
    </div>
  );
}
