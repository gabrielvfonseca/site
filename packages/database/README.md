# @gabfon/database

Database package providing Prisma client and Neon database integration.

## Overview

This package provides a unified database layer using Prisma ORM with Neon serverless PostgreSQL, offering type-safe database operations and connection management.

## Features

- **Prisma ORM**: Type-safe database operations with auto-generated client
- **Neon Integration**: Serverless PostgreSQL database with edge runtime support
- **Type Safety**: Full TypeScript support with generated types
- **Connection Pooling**: Optimized database connections for serverless environments
- **Environment Validation**: Type-safe environment variable handling

## Installation

```bash
pnpm add @gabfon/database
```

## Usage

### Basic Database Client

```typescript
import { database } from '@gabfon/database';

// Use the Prisma client
const users = await database.user.findMany();
```

### Environment Setup

```typescript
import { databaseKeys } from '@gabfon/database/keys';

// Access environment variables
const dbUrl = databaseKeys.DATABASE_URL;
```

## Exports

- `./src/index.ts` - Main database client and utilities
- `./src/keys.ts` - Environment variable keys

## Environment Variables

```env
DATABASE_URL=your_neon_database_url
DIRECT_URL=your_neon_direct_url
```

## Database Schema

The database schema is defined in `./prisma/schema.prisma` and includes:

- User management
- Content management
- Analytics tracking
- And more...

## Dependencies

- `@prisma/client` - Prisma ORM client
- `@neondatabase/serverless` - Neon serverless driver
- `@prisma/adapter-neon` - Prisma Neon adapter
- `@t3-oss/env-nextjs` - Environment validation
- `server-only` - Server-only utilities
- `undici` - HTTP client
- `ws` - WebSocket support
- `zod` - Schema validation

## Development

```bash
# Generate Prisma client
pnpm build

# Analyze schema
pnpm analyze

# Type checking
pnpm typecheck

# Clean build artifacts
pnpm clean
```

## Database Operations

```bash
# Generate Prisma client after schema changes
pnpm build

# View database in Prisma Studio
npx prisma studio
```