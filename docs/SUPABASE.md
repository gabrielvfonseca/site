# supabase

Local Supabase instance configured for database and storage only. Auth is disabled.

## Local development

Start the local Supabase stack:

```bash
supabase start
```

This boots Postgres, PostgREST, Storage, and Studio locally. The default local API URL is `http://localhost:54321`.

## Environment variables

| Variable | Scope | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | client | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | client | Anon/publishable key |

Auth-specific variables (`SUPABASE_SECRET_KEY`, etc.) are not used because auth is disabled.

## Generating types

When the Supabase schema changes, regenerate the TypeScript types:

```bash
cd packages/supabase
bun run db:generate
```

## Package structure

The `@gabfon/supabase` package provides database and storage utilities without auth:

| Export | Purpose |
|--------|---------|
| `@gabfon/supabase/server` | Server-side client (no cookies/session) |
| `@gabfon/supabase/client` | Browser client |
| `@gabfon/supabase/queries` | Database query helpers |
| `@gabfon/supabase/cached-queries` | React-cached server queries |
| `@gabfon/supabase/mutations` | Database mutation helpers |
| `@gabfon/supabase/storage` | Storage upload/remove/download helpers |
| `@gabfon/supabase/types` | Generated database types |
| `@gabfon/supabase/keys` | Environment variable validation |
