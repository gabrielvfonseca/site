# @gabfon/wakatime Architecture

## Overview

`@gabfon/wakatime` is a thin, read-only client over the WakaTime API. It exposes a single high-level operation — "get the last-7-days coding summary" — behind a type-safe interface, and validates its configuration through `@t3-oss/env-nextjs`.

## Architectural Decisions

### 1. REST API Client Pattern

A small class (`WakaTimeClient`) wraps `fetch`. Basic authentication is built by base64-encoding the API key with `Buffer` (the client runs server-side).

### 2. Type-First Development

The raw API response (`WakaTimeApiStats`, `WakaTimeApiLanguage`) is typed separately from the normalised, display-ready `WakaTimeStats`. Callers only depend on the normalised shape.

### 3. Environment-Driven Configuration

Credentials are read exclusively through `keys()`. The API key is intentionally **optional** so the wider app boots without it; the client throws only at call time.

### 4. Normalisation at the Edge

The API returns snake_case fields; the client maps them once into a camelCase `WakaTimeStats`, so no snake_case leaks into consumers.

## Module Organization

```
src/
├── index.ts   # Public exports (client, keys, types)
├── client.ts  # WakaTimeClient class + wakatimeClient singleton
├── keys.ts    # Environment schema (@t3-oss/env-nextjs)
└── types.ts   # WakaTimeStats, WakaTimeLanguage, raw API types
```

## Data Flow

```
getLast7Days()
  → base64(apiKey)                             // Basic auth header
  → GET /users/current/stats/last_7_days
  → map data (snake_case) → WakaTimeStats       // normalise fields + languages
```

## Client Architecture

### WakaTime Client

- **Auth**: `Authorization: Basic <base64(apiKey)>`.
- **Base URL**: `https://wakatime.com/api/v1`.
- **Runtime**: server-only (uses Node `Buffer`).

### Environment Configuration

`keys()` builds a validated env object with a single optional `server` var (`WAKATIME_API_KEY`). Validation is skipped unless `SKIP_ENV_VALIDATION` is set, matching the other `@gabfon/*` packages.

## Type System

- **Raw types** mirror the API JSON (snake_case) and are suppressed from the naming-convention lint rule.
- **Normalised types** (`WakaTimeStats`, `WakaTimeLanguage`) are camelCase and are the only types callers should reference.

## Error Handling

`getLast7Days()` throws on a missing key and on non-2xx responses. All errors surface to the caller, which is expected to catch them and degrade gracefully.

## Performance Considerations

- One request per call; coding stats change slowly, so callers should cache aggressively (daily is reasonable).
- The free WakaTime plan retains ~14 days of history, so `last_7_days` is always available.

## Security Considerations

- The API key is server-only and never exposed to the client bundle.
- The client is strictly read-only.

## Testing Strategy

Unit tests (`tests/unit/keys.test.ts`) cover env validation: key resolution, the optional key, and skipped validation.

## Best Practices

- Depend on `WakaTimeStats`, not the raw API types.
- Always handle thrown errors.
- Cache responses and slice `languages` for compact UI.
