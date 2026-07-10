# @gabfon/wakatime

A minimal, type-safe TypeScript client for the [WakaTime API](https://wakatime.com/developers). This package reads the authenticated user's coding-time summary for the last seven days, normalised for display.

## Features

- **Type-safe API** — Full TypeScript types for coding-time stats and languages
- **Basic auth** — Read-only access with a base64-encoded API key
- **Normalised output** — Camel-cased, display-ready shape (totals, daily average, language shares)
- **Graceful by design** — The API key is optional; the client throws only when called, so callers can degrade cleanly
- **Environment validation** — Secure environment variable handling with `@t3-oss/env-nextjs`

## Installation

```bash
npm install @gabfon/wakatime
```

## Usage

### Environment Setup

Create environment variables for WakaTime API access:

```env
WAKATIME_API_KEY=your_wakatime_api_key
```

> Get your API key from [wakatime.com/settings/api-key](https://wakatime.com/settings/api-key). The free plan retains ~14 days of data, so the last-7-days summary is always available.

### Basic Usage

```typescript
import { wakatimeClient } from '@gabfon/wakatime';

// Get the last 7 days of coding time
const stats = await wakatimeClient.getLast7Days();

console.log(stats.humanReadableTotal); // e.g. "18 hrs 30 mins"
for (const language of stats.languages) {
  console.log(language.name, `${language.percent}%`);
}
```

## API Reference

### Client Methods

- `getLast7Days()` — Fetch the last-7-days coding-time summary as `WakaTimeStats`

### Types

- `WakaTimeStats` — Normalised summary (`totalSeconds`, `humanReadableTotal`, `dailyAverageSeconds`, `humanReadableDailyAverage`, `languages`, `range`)
- `WakaTimeLanguage` — A language's share of coding time (`name`, `percent`, `text`)
- `WakaTimeApiStats` — Raw `data` object returned by the WakaTime stats API
- `WakaTimeApiLanguage` — Raw language entry returned by the WakaTime stats API

## Environment Variables

This package uses `@t3-oss/env-nextjs` for environment validation.

| Variable | Description | Required |
|----------|-------------|----------|
| `WAKATIME_API_KEY` | WakaTime API key | No (client throws at call time if absent) |

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Type checking
npm run typecheck

# Build
npm run build
```

## Testing

The package includes tests using Vitest:

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:unit

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## Dependencies

- `@t3-oss/env-nextjs` — Environment validation
- `zod` — Runtime type validation

## See also

- [`docs/API_REFERENCE.md`](./docs/API_REFERENCE.md)
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)
