# @gabfon/supabase

Shared Supabase client factories, queries, mutations, and utilities for gabfon.com. Auth is not included.

## Environment variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Public anon key |

## Usage

### Server client (Server Components)

```ts
import { createServerClient } from "@gabfon/supabase/server";

const supabase = await createServerClient();
const { data } = await supabase.from("teams").select("*");
```

### Browser client (Client Components)

```ts
"use client";

import { createBrowserClient } from "@gabfon/supabase/client";

const supabase = createBrowserClient();
```

### Queries

```ts
import { getUserQuery, getTeamByIdQuery } from "@gabfon/supabase/queries";

const user = await getUserQuery(supabase, userId);
const team = await getTeamByIdQuery(supabase, teamId);
```

### Cached queries

```ts
import { getSession } from "@gabfon/supabase/cached-queries";

const { data } = await getSession();
```

### Mutations

```ts
import { updateTeamPlan, deleteBankConnection } from "@gabfon/supabase/mutations";

await updateTeamPlan(supabase, { id: teamId, plan: "pro" });
await deleteBankConnection(supabase, { id: connectionId });
```

### Storage

```ts
import { upload, remove, signedUrl } from "@gabfon/supabase/storage";

const url = await upload(supabase, { file, path: ["docs", "file.pdf"], bucket: "uploads" });
await remove(supabase, { path: ["docs", "file.pdf"], bucket: "uploads" });
const signed = await signedUrl(supabase, { path: "file.pdf", bucket: "uploads", expireIn: 3600 });
```

## Database types

Generated types from the Supabase schema are available at `src/types/db.ts`.

Regenerate with:

```bash
bun run db:generate
```
