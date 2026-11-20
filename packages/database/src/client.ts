import type { D1Database } from "@cloudflare/workers-types";
import { drizzle } from "drizzle-orm/d1";

import * as schema from "./schema";

/** The Drizzle client type backed by Cloudflare D1. */
export type Database = ReturnType<typeof drizzle<typeof schema>>;

let cached: Database | null = null;

/**
 * Lazily construct the Drizzle/D1 client from a D1 binding. Returns `null` when
 * no binding is injected so that importing this package never throws — callers
 * degrade gracefully in environments without a database (e.g. local `next dev`
 * or the worker before the D1 binding is attached), mirroring the rate-limit
 * package's optional behavior.
 *
 * The binding is injected by the runtime: on Workers, `env.DB` (declared in the
 * root `cloudflare.config.ts`); in tests, a D1 stub or miniflare instance.
 * @param d1 - The D1 namespace binding, or `undefined` when unavailable.
 * @returns The Drizzle client, or `null` when no binding was injected.
 */
export function getDatabase(d1?: D1Database | null): Database | null {
  if (!d1) {
    return null;
  }
  if (!cached) {
    cached = drizzle(d1, { schema });
  }
  return cached;
}
