import { init } from '@sentry/nextjs';
import { keys } from './keys';

/**
 * The opts for the observability.
 * @returns The opts for the observability.
 */
const opts = {
  dsn: keys().NEXT_PUBLIC_SENTRY_DSN,
  // Suppress OpenTelemetry warnings
  integrations: [],
  // Disable automatic instrumentation to avoid warnings
  autoInstrumentRemix: false,
  autoInstrumentNextjs: false,
  autoInstrumentServerFunctions: false,
  autoInstrumentMiddleware: false,
  autoInstrumentAppDirectory: false,
};

/**
 * The initializeSentry function for the observability.
 * @returns The initializeSentry function.
 */
export const initializeSentry = () => {
  const sentriyDsn = keys().NEXT_PUBLIC_SENTRY_DSN;

  // Only initialize in production or when explicitly enabled
  if (process.env.NODE_ENV === 'production' && sentriyDsn) {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
      init(opts);
      console.log('[Observability] Sentry initialized for Node.js runtime');
    }

    if (process.env.NEXT_RUNTIME === 'edge') {
      init(opts);
      console.log('[Observability] Sentry initialized for Edge runtime');
    }
  } else if (process.env.NODE_ENV === 'production' && !sentriyDsn) {
    console.warn(
      '[Observability] Sentry DSN not configured in production - error tracking disabled'
    );
  }
};
