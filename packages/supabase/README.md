# @gabfon/supabase

This package provides a Supabase client and environment validation for the gabfon.com monorepo.

## Usage

```ts
import { createClient } from '@gabfon/supabase';

// For browser/client-side
const client = createClient();

// For server-side
const serverClient = await createClient();
```

## Environment Variables

The package validates the following environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`: The Supabase project URL (client-side)
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: The Supabase anon key (client-side)

These variables are validated using `@t3-oss/env-core` and `zod`.

## API

### `createClient()`

Returns a Supabase client instance configured with the validated environment variables.
This function is synchronous and can be used in both client and server components.

### `keys()`

Returns the validated environment variables object. This is useful if you need to access the environment variables directly.

## Types

This package also exports the Supabase database types and other internal types.