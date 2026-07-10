'use client';

import { QueryClient } from '@tanstack/react-query';

/** Default query stale time: 5 minutes (in milliseconds). */
const STALE_TIME_MS = 300_000;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME_MS,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
