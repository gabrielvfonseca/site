# Supabase local development

Local Supabase configuration and templates for gabfon.com.

## Setup

1. Install the Supabase CLI:

```bash
brew install supabase/tap/supabase
```

2. Start the local Supabase stack:

```bash
supabase start
```

3. Generate database types:

```bash
supabase gen types --lang=typescript --project-id $(supabase status --output json | jq -r '.project_id') --schema public > packages/supabase/src/types/db.ts
```

## Configuration

- `config.toml` — Supabase CLI configuration (ports, auth, storage, etc.)
- `templates/` — Email templates for auth flows
- `.temp/` — Generated artifacts (gitignored)
- `.branches/` — Supabase branch configurations

## Environment variables

The following are required for the app to connect to Supabase:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (e.g. `http://localhost:54321`) |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Public anon key |
| `SUPABASE_SECRET_KEY` | Service role key |
