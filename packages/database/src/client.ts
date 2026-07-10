import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

/** The Drizzle client type backed by Neon's HTTP driver. */
export type Database = ReturnType<typeof drizzle<typeof schema>>;

let cached: Database | null = null;

/**
 * Point the Neon HTTP driver at a local proxy when `DATABASE_HTTP_ENDPOINT` is
 * set (e.g. `local-neon-http-proxy` in Docker Compose). This lets the same
 * serverless driver run against a plain Postgres container in development while
 * production continues to hit Neon's managed endpoint unchanged.
 */
function configureLocalNeonProxy(): void {
  const endpoint = process.env.DATABASE_HTTP_ENDPOINT;
  if (!endpoint) {
    return;
  }
  neonConfig.fetchEndpoint = endpoint;
  neonConfig.useSecureWebSocket = false;
  neonConfig.poolQueryViaFetch = true;
}

/**
 * Lazily construct the Drizzle/Neon client. Returns `null` when `DATABASE_URL`
 * is not configured so that importing this package never throws — callers
 * degrade gracefully in environments without a database, mirroring the
 * rate-limit package's optional behavior.
 * @returns The Drizzle client, or `null` when no database is configured.
 */
export function getDatabase(): Database | null {
  const url = process.env.DATABASE_URL;
  if (!url) {
    return null;
  }
  if (!cached) {
    configureLocalNeonProxy();
    cached = drizzle(neon(url), { schema });
  }
  return cached;
}
