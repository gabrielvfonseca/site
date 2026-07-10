# @gabfon/x API Reference

Complete API reference for the `@gabfon/x` package.

## Installation

```bash
npm install @gabfon/x
```

## Environment Setup

```env
X_API_BEARER_TOKEN=your_x_api_v2_bearer_token
X_USERNAME=gabfon_
```

`X_API_BEARER_TOKEN` is an app-only Bearer token from the [X developer portal](https://developer.x.com/en/portal/dashboard). Reading a user's timeline requires at least the paid **Basic** tier.

## Exports

```typescript
// Client
export { XClient, xClient } from './client';

// Environment
export { keys } from './keys';

// Types
export type { XApiTweet, XPost, XPublicMetrics } from './types';
```

| Export | Kind | Description |
|--------|------|-------------|
| `XClient` | class | The client class |
| `xClient` | instance | Shared singleton client |
| `keys` | function | `@t3-oss/env-nextjs` factory for this package's env |
| `XPost` | type | Normalised post shape |
| `XApiTweet` | type | Raw tweet subset |
| `XPublicMetrics` | type | Raw metrics object |

## Client

### `xClient`

A ready-to-use singleton. Construct your own `XClient` only if you need isolated state.

```typescript
import { xClient, XClient } from '@gabfon/x';

const client = xClient; // shared singleton
const own = new XClient(); // independent instance
```

### `getLatestPost(): Promise<XPost | null>`

Fetches the most recent original post for the configured handle, excluding retweets and replies. Resolves (and memoises) the numeric user id on first call.

```typescript
const post = await xClient.getLatestPost();
```

Returns `null` when the timeline has no eligible posts. Throws when `X_API_BEARER_TOKEN` is not configured, when the handle cannot be resolved, or on a non-2xx API response.

## Types

### `XPost`

```typescript
interface XPost {
  id: string; // tweet id
  text: string; // post body
  createdAt: string; // ISO 8601
  likes: number;
  reposts: number; // retweets
  replies: number;
  url: string; // https://x.com/{username}/status/{id}
}
```

### `XPublicMetrics`

```typescript
interface XPublicMetrics {
  retweet_count: number;
  reply_count: number;
  like_count: number;
  quote_count?: number;
}
```

### `XApiTweet`

```typescript
interface XApiTweet {
  id: string;
  text: string;
  created_at?: string;
  public_metrics?: XPublicMetrics;
}
```

## Environment Variables

| Variable | Type | Default | Required |
|----------|------|---------|----------|
| `X_API_BEARER_TOKEN` | `string` | — | No |
| `X_USERNAME` | `string` | `gabfon_` | No |

Access the validated values via `keys()`:

```typescript
import { keys } from '@gabfon/x/keys';

const env = keys();
env.X_USERNAME; // "gabfon_"
```

## Usage Examples

### Rendering the latest post

```typescript
import { xClient } from '@gabfon/x';

const post = await xClient.getLatestPost();
if (post) {
  render(`<a href="${post.url}">${post.text}</a>`);
}
```

### Serving from an API route (graceful degradation)

```typescript
async function loadX() {
  try {
    const { xClient } = await import('@gabfon/x');
    return await xClient.getLatestPost();
  } catch {
    return null; // missing token or API error → omit the widget
  }
}
```

## Error Handling

The client throws `Error` in these cases:

- **Missing token** — `X_API_BEARER_TOKEN is not configured`
- **Unresolved handle** — `X user not found: {username}`
- **HTTP error** — `X API error: {status} {statusText}` (e.g. `401`, `429`)

Wrap calls in `try/catch` (or the dynamic-import pattern above) so a failure degrades to an omitted widget rather than a broken page.

## Best Practices

- Treat `X_API_BEARER_TOKEN` as optional and always handle `null`/thrown errors — the free tier cannot read the timeline.
- Cache responses (e.g. a 5-minute `Cache-Control`) to stay within the Basic tier's read limits.
- Reuse the `xClient` singleton so the resolved user id is memoised across calls in the same runtime.

## Integration Examples

`@gabfon/x` powers the "Latest post" widget on the `/now` page via the `apps/web/src/app/api/now/route.ts` aggregator, which fetches all `/now` sources in parallel and degrades each source independently.
