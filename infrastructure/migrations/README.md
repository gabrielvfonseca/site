# Migrations

Directory-based SQL migrations for the Postgres database.

## Structure

```
migrations/
├── schema/       DDL: extensions, types, tables, indexes
├── seed/         DML: development seed data (idempotent)
└── functions/    Views and stored procedures
```

Files follow a `{number}__{description}.sql` naming convention and run in
numeric order within each directory.

## How to run

```bash
# Apply schema
psql "$DATABASE_URL" -f migrations/schema/001__initial_schema.sql

# Seed dev data
psql "$DATABASE_URL" -f migrations/seed/001__ama_seed.sql
```

For Docker Compose, volume-mount the relevant directory to
`/docker-entrypoint-initdb.d/`.

## Convention

- **Idempotent**: every file uses `IF NOT EXISTS` / `CREATE OR REPLACE` so it
  can be safely re-run.
- **One concern per directory**: schema changes, then seed data, then
  functions.
- **No down migrations**: rollback by reverting the Git commit.
