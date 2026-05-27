import { log as logtail } from '@logtail/next';

/**
 * The log for the observability.
 * @returns The log for the observability.
 */
export const log = process.env.NODE_ENV === 'production' ? logtail : console;
