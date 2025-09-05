import { init } from '@sentry/nextjs';
import { keys } from './keys';

/**
 * The opts for the observability.
 * @returns The opts for the observability.
 */
const opts = {
  dsn: keys().NEXT_PUBLIC_SENTRY_DSN,
};

/**
 * The initializeSentry function for the observability.
 * @returns The initializeSentry function.
 */
export const initializeSentry = () => {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    init(opts);
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    init(opts);
  }
};
