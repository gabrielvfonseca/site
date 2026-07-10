import { defineConfig } from 'drizzle-kit';

/**
 * Drizzle Kit configuration for the AMA Postgres schema. Migrations are written
 * to `./generated` (excluded from Biome in the repo root `biome.json`).
 */
export default defineConfig({
  dialect: 'postgresql',
  schema: './src/schema.ts',
  out: './generated',
  dbCredentials: {
    // biome-ignore lint/style/noNonNullAssertion: drizzle-kit CLI requires DATABASE_URL at runtime.
    url: process.env.DATABASE_URL!,
  },
});
