# @gabfon/wakatime API Reference

Complete API reference for the `@gabfon/wakatime` package.

## Installation

```bash
npm install @gabfon/wakatime
```

## Environment Setup

```env
WAKATIME_API_KEY=your_wakatime_api_key
```

Get your API key from [wakatime.com/settings/api-key](https://wakatime.com/settings/api-key).

## Exports

```typescript
// Client
export { WakaTimeClient, wakatimeClient } from './client';

// Environment
export { keys } from './keys';

// Types
export type {
  WakaTimeApiLanguage,
  WakaTimeApiStats,
  WakaTimeLanguage,
  WakaTimeStats,
} from './types';
```

| Export | Kind | Description |
|--------|------|-------------|
| `WakaTimeClient` | class | The client class |
| `wakatimeClient` | instance | Shared singleton client |
| `keys` | function | `@t3-oss/env-nextjs` factory for this package's env |
| `WakaTimeStats` | type | Normalised summary shape |
| `WakaTimeLanguage` | type | Normalised language share |
| `WakaTimeApiStats` | type | Raw stats `data` object |
| `WakaTimeApiLanguage` | type | Raw language entry |

## Client

### `wakatimeClient`

A ready-to-use singleton. Construct your own `WakaTimeClient` only if you need isolated state.

```typescript
import { wakatimeClient, WakaTimeClient } from '@gabfon/wakatime';

const client = wakatimeClient; // shared singleton
const own = new WakaTimeClient(); // independent instance
```

### `getLast7Days(): Promise<WakaTimeStats>`

Fetches the authenticated user's coding-time summary for the last seven days from `GET /users/current/stats/last_7_days`, using Basic auth (base64-encoded API key).

```typescript
const stats = await wakatimeClient.getLast7Days();
```

Throws when `WAKATIME_API_KEY` is not configured or on a non-2xx API response.

## Types

### `WakaTimeStats`

```typescript
interface WakaTimeStats {
  totalSeconds: number;
  humanReadableTotal: string; // e.g. "18 hrs 30 mins"
  dailyAverageSeconds: number;
  humanReadableDailyAverage: string;
  languages: readonly WakaTimeLanguage[];
  range: { start: string; end: string }; // ISO dates
}
```

### `WakaTimeLanguage`

```typescript
interface WakaTimeLanguage {
  name: string; // e.g. "TypeScript"
  percent: number; // 0–100
  text: string; // e.g. "4 hrs 12 mins"
}
```

### `WakaTimeApiStats` / `WakaTimeApiLanguage`

Raw shapes returned by the WakaTime API (snake_case), used internally before normalisation.

```typescript
interface WakaTimeApiStats {
  total_seconds: number;
  human_readable_total: string;
  daily_average: number;
  human_readable_daily_average: string;
  languages: readonly WakaTimeApiLanguage[];
  start: string;
  end: string;
}
```

## Environment Variables

| Variable | Type | Default | Required |
|----------|------|---------|----------|
| `WAKATIME_API_KEY` | `string` | — | No |

Access the validated value via `keys()`:

```typescript
import { keys } from '@gabfon/wakatime/keys';

const env = keys();
env.WAKATIME_API_KEY;
```

## Usage Examples

### Rendering a coding-time summary

```typescript
import { wakatimeClient } from '@gabfon/wakatime';

const stats = await wakatimeClient.getLast7Days();
render(`${stats.humanReadableTotal} in the last 7 days`);
```

### Serving from an API route (graceful degradation)

```typescript
async function loadWakatime() {
  try {
    const { wakatimeClient } = await import('@gabfon/wakatime');
    return await wakatimeClient.getLast7Days();
  } catch {
    return null; // missing key or API error → omit the widget
  }
}
```

## Error Handling

The client throws `Error` in these cases:

- **Missing key** — `WAKATIME_API_KEY is not configured`
- **HTTP error** — `WakaTime API error: {status} {statusText}`

Wrap calls in `try/catch` (or the dynamic-import pattern above) so a failure degrades to an omitted widget rather than a broken page.

## Best Practices

- Treat `WAKATIME_API_KEY` as optional and always handle thrown errors.
- Cache responses (e.g. a daily `Cache-Control`) since coding stats change slowly.
- Slice `languages` to the top few for compact UI.

## Integration Examples

`@gabfon/wakatime` powers the coding-hours figure and language bar on the `/now` page via the `apps/web/src/app/api/now/route.ts` aggregator.
