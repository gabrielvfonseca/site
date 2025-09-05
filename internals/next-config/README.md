# @gabfon/next-config

Next.js configuration utilities and helpers for the monorepo.

## Overview

This package provides shared Next.js configuration utilities, including bundle analysis, environment validation, and Prisma integration helpers.

## Features

- **Bundle Analysis**: Integration with `@next/bundle-analyzer` for performance monitoring
- **Environment Validation**: T3 Env integration for type-safe environment variables
- **Prisma Integration**: Monorepo workaround plugin for Prisma
- **Type Safety**: Full TypeScript support with Zod validation

## Installation

```bash
pnpm add @gabfon/next-config
```

## Usage

```typescript
import { withAnalyzer } from '@gabfon/next-config';

const nextConfig = withAnalyzer({
  // your Next.js config
});
```

## Exports

- `./src/index.ts` - Main configuration utilities
- `./src/keys.ts` - Environment variable keys

## Dependencies

- `@next/bundle-analyzer` - Bundle analysis
- `@prisma/nextjs-monorepo-workaround-plugin` - Prisma monorepo support
- `@t3-oss/env-core` - Environment validation
- `@t3-oss/env-nextjs` - Next.js environment integration
- `zod` - Schema validation

## Development

```bash
# Type checking
pnpm typecheck

# Clean build artifacts
pnpm clean
```