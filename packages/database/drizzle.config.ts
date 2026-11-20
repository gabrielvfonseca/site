import { defineConfig } from "drizzle-kit";

/**
 * Drizzle Kit configuration for the AMA Cloudflare D1 schema. Migrations are
 * generated as plain SQL files under `./generated` and applied with
 * `bunx wrangler d1 migrations apply site-db --local/--remote` or the
 * drizzle-orm D1 migrator. `generate` is purely offline (schema diff only);
 * `push`/`migrate` need either a local `wrangler dev` D1 binding (`driver:
 * "d1"`) or a `d1-http` connection to the remote database.
 */
export default defineConfig({
  dialect: "sqlite",
  schema: "./src/schema.ts",
  out: "./generated",
  // Local development: run `bunx wrangler dev` in the web app (or point this
  // at any process exposing the D1 binding) so drizzle-kit can talk to a live
  // binding. Omit dbCredentials to only run `drizzle-kit generate`.
});
