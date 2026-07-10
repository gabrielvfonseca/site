# @gabfon/x Architecture

## Overview

`@gabfon/x` is a thin, read-only client over the X (Twitter) API v2. It exposes a single high-level operation — "get the latest original post for a handle" — behind a type-safe interface, and validates its configuration through `@t3-oss/env-nextjs`.

## Architectural Decisions

### 1. REST API Client Pattern

A small class (`XClient`) wraps `fetch` with a private authenticated `get()` helper, keeping transport concerns (auth header, error mapping) in one place.

### 2. Type-First Development

Raw API shapes (`XApiTweet`, `XPublicMetrics`) are typed separately from the normalised, display-ready `XPost`. Callers only depend on `XPost`; the raw shapes are an implementation detail.

### 3. Environment-Driven Configuration

Credentials are read exclusively through `keys()`. The Bearer token is intentionally **optional** so the wider app boots without it; the client throws only at call time.

### 4. Singleton with Memoised Identity

A shared `xClient` singleton memoises the resolved numeric user id, so only the first call pays the `users/by/username` lookup.

## Module Organization

```
src/
├── index.ts   # Public exports (client, keys, types)
├── client.ts  # XClient class + xClient singleton
├── keys.ts    # Environment schema (@t3-oss/env-nextjs)
└── types.ts   # XPost, XApiTweet, XPublicMetrics
```

## Data Flow

```
getLatestPost()
  → getUserId()                    // GET /2/users/by/username/{username} (memoised)
  → GET /2/users/{id}/tweets       // max_results=5, exclude=retweets,replies
  → pick first tweet
  → map to XPost                   // normalise metrics + build canonical url
```

## Client Architecture

### X Client

- **Auth**: `Authorization: Bearer <token>` on every request.
- **Base URL**: `https://api.twitter.com/2`.
- **Memoisation**: `cachedUserId` holds the resolved id for the process lifetime.
- **Filtering**: requests exclude retweets and replies, then take the newest remaining tweet.

### Environment Configuration

`keys()` builds a validated env object with `server` vars only (`X_API_BEARER_TOKEN` optional, `X_USERNAME` defaulted). Validation is skipped unless `SKIP_ENV_VALIDATION` is set, matching the other `@gabfon/*` packages.

## Type System

- **Raw types** mirror the API JSON (snake_case) and are suppressed from the naming-convention lint rule.
- **Normalised types** (`XPost`) are camelCase and are the only types callers should reference.

## Error Handling

`get()` throws on missing token and on non-2xx responses; `getUserId()` throws when the handle cannot be resolved. All errors surface to the caller, which is expected to catch them and degrade gracefully.

## Performance Considerations

- One extra request (id resolution) on the first call only, then memoised.
- Responses are small; callers should add HTTP caching at the route layer.

## Security Considerations

- The Bearer token is server-only and never exposed to the client bundle.
- No user tokens or write scopes are used; the client is strictly read-only.

## Testing Strategy

Unit tests (`tests/unit/keys.test.ts`) cover env validation: token/username resolution, the optional token, the default handle, and skipped validation.

## Best Practices

- Depend on `XPost`, not the raw API types.
- Always handle `null` and thrown errors.
- Reuse the singleton to benefit from id memoisation.
