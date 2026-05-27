'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import { env } from '@/config/env';
import { queryClient } from '@/lib/query-client';

// Lazy load React Query devtools in development only
const ReactQueryDevtools = dynamic(
  () =>
    import('@tanstack/react-query-devtools').then((m) => m.ReactQueryDevtools),
  {
    ssr: false,
    loading: () => null,
  }
);

/**
 * The QueryProviderProps for the QueryProvider.
 */
interface QueryProviderProps {
  /**
   * The children for the QueryProvider.
   */
  readonly children: ReactNode;
}

/**
 * The QueryProvider for the QueryProvider.
 * @param props - The QueryProviderProps.
 * @returns The QueryProvider for the QueryProvider.
 */
export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
