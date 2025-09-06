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
  // Only initialize in production or when explicitly enabled
  if (process.env.NODE_ENV === 'production' && keys().NEXT_PUBLIC_SENTRY_DSN) {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
      init(opts);
    }

    if (process.env.NEXT_RUNTIME === 'edge') {
      init(opts);
    }
  }
};
