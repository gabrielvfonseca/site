# @gabfon/x

A minimal, type-safe TypeScript client for the [X (Twitter) API v2](https://developer.x.com/en/docs/x-api). This package reads the latest original post for a handle using app-only (Bearer) authentication, normalised for display.

## Features

- **Type-safe API** — Full TypeScript types for posts and metrics
- **App-only auth** — Read-only access with a v2 Bearer token, no user OAuth flow
- **User-id memoisation** — Resolves the numeric user id once, then reuses it
- **Graceful by design** — The token is optional; the client throws only when called, so callers can degrade cleanly
- **Environment validation** — Secure environment variable handling with `@t3-oss/env-nextjs`

## Installation

```bash
npm install @gabfon/x
```

## Usage

### Environment Setup

Create environment variables for X API access:

```env
X_API_BEARER_TOKEN=your_x_api_v2_bearer_token
X_USERNAME=gabfon_
```

> The X API v2 requires at least the paid **Basic** tier to read a user's posts. The free tier cannot read the timeline.

### Basic Usage

```typescript
import { xClient } from '@gabfon/x';

// Get the latest original post (excludes retweets and replies)
const post = await xClient.getLatestPost();

if (post) {
  console.log(post.text, post.likes, post.url);
}
```

## API Reference

### Client Methods

- `getLatestPost()` — Fetch the most recent original post, or `null` if the timeline is empty

### Types

- `XPost` — A single post normalised for display (`id`, `text`, `createdAt`, `likes`, `reposts`, `replies`, `url`)
- `XApiTweet` — Raw tweet object (subset) returned by the X API v2
- `XPublicMetrics` — Raw `public_metrics` object returned by the X API v2

## Environment Variables

This package uses `@t3-oss/env-nextjs` for environment validation.

| Variable | Description | Required |
|----------|-------------|----------|
| `X_API_BEARER_TOKEN` | X API v2 app-only Bearer token | No (client throws at call time if absent) |
| `X_USERNAME` | X handle without the `@` (default `gabfon_`) | No |

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
