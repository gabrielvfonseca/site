# @gabfon/cache

Caching package providing Redis-based caching utilities and configuration.

## Overview

This package provides a centralized caching solution using Upstash Redis for distributed caching across the monorepo. It offers a simple, type-safe interface for caching operations with environment validation.

## Features

- **Redis Integration**: Upstash Redis client for distributed caching
- **Type Safety**: Full TypeScript support with environment validation
- **Environment Configuration**: Secure environment variable handling
- **Simple API**: Easy-to-use caching interface
- **Monorepo Support**: Shared caching across all packages

## Installation

```bash
pnpm add @gabfon/cache
```

## Usage

### Basic Caching

```typescript
import { redis } from '@gabfon/cache';

// Set a cache value
await redis.set('user:123', JSON.stringify({ name: 'John Doe' }));

// Get a cache value
const userData = await redis.get('user:123');
const user = userData ? JSON.parse(userData) : null;

// Set with expiration
await redis.setex('session:abc', 3600, 'session-data'); // 1 hour

// Delete a cache value
await redis.del('user:123');
```

### Advanced Caching Patterns

```typescript
import { redis } from '@gabfon/cache';

// Cache with TTL
const cacheKey = 'posts:recent';
const ttl = 300; // 5 minutes

// Check if cached
const cached = await redis.get(cacheKey);
if (cached) {
  return JSON.parse(cached);
}

// Fetch fresh data
const posts = await fetchPosts();

// Cache the result
await redis.setex(cacheKey, ttl, JSON.stringify(posts));

return posts;
```

### Hash Operations

```typescript
import { redis } from '@gabfon/cache';

// Set hash fields
await redis.hset('user:123', {
  name: 'John Doe',
  email: 'john@example.com',
  lastLogin: new Date().toISOString(),
});

// Get hash field
const name = await redis.hget('user:123', 'name');

// Get all hash fields
const user = await redis.hgetall('user:123');
```

### List Operations

```typescript
import { redis } from '@gabfon/cache';

// Add to list
await redis.lpush('recent:posts', 'post-1', 'post-2', 'post-3');

// Get list items
const recentPosts = await redis.lrange('recent:posts', 0, 9); // Last 10 items

// Trim list to keep only recent items
await redis.ltrim('recent:posts', 0, 99); // Keep last 100 items
```

### Set Operations

```typescript
import { redis } from '@gabfon/cache';

// Add to set
await redis.sadd('tags:post-1', 'react', 'typescript', 'nextjs');

// Check membership
const isMember = await redis.sismember('tags:post-1', 'react');

// Get all members
const tags = await redis.smembers('tags:post-1');
```

## Exports

- `./src/index.ts` - Main Redis client and utilities
- `./src/keys.ts` - Environment variable keys and validation

## Environment Variables

```env
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

## Caching Strategies

### Cache-Aside Pattern

```typescript
async function getPost(id: string) {
  const cacheKey = `post:${id}`;
  
  // Try cache first
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }
  
  // Fetch from database
  const post = await database.post.findUnique({ where: { id } });
  
  if (post) {
    // Cache for 1 hour
    await redis.setex(cacheKey, 3600, JSON.stringify(post));
  }
  
  return post;
}
```

### Write-Through Pattern

```typescript
async function createPost(data: PostData) {
  // Create in database
  const post = await database.post.create({ data });
  
  // Update cache
  const cacheKey = `post:${post.id}`;
  await redis.setex(cacheKey, 3600, JSON.stringify(post));
  
  return post;
}
```

### Cache Invalidation

```typescript
async function updatePost(id: string, data: Partial<PostData>) {
  // Update in database
  const post = await database.post.update({ where: { id }, data });
  
  // Invalidate cache
  await redis.del(`post:${id}`);
  
  // Optionally update cache with new data
  await redis.setex(`post:${id}`, 3600, JSON.stringify(post));
  
  return post;
}
```

## Dependencies

- `@upstash/redis` - Upstash Redis client
- `@t3-oss/env-nextjs` - Environment validation
- `zod` - Schema validation

## Development

```bash
# Type checking
pnpm typecheck

# Clean build artifacts
pnpm clean
```

## Best Practices

1. **Use Meaningful Keys**: Use descriptive, hierarchical cache keys
2. **Set Appropriate TTLs**: Set reasonable expiration times for different data types
3. **Handle Cache Misses**: Always handle cases where data is not in cache
4. **Serialize Data**: Properly serialize/deserialize complex objects
5. **Monitor Usage**: Monitor cache hit rates and memory usage
6. **Use Namespaces**: Use key prefixes to organize different data types

## Common Cache Key Patterns

```typescript
// User data
const userKey = (id: string) => `user:${id}`;

// Posts with pagination
const postsKey = (page: number, limit: number) => `posts:${page}:${limit}`;

// User sessions
const sessionKey = (token: string) => `session:${token}`;

// API responses
const apiKey = (endpoint: string, params: string) => `api:${endpoint}:${params}`;

// Computed data
const computedKey = (type: string, id: string) => `computed:${type}:${id}`;
```

## Error Handling

```typescript
import { redis } from '@gabfon/cache';

async function safeGet(key: string) {
  try {
    return await redis.get(key);
  } catch (error) {
    console.error('Cache get error:', error);
    return null; // Graceful degradation
  }
}

async function safeSet(key: string, value: string, ttl?: number) {
  try {
    if (ttl) {
      await redis.setex(key, ttl, value);
    } else {
      await redis.set(key, value);
    }
  } catch (error) {
    console.error('Cache set error:', error);
    // Don't throw - caching is not critical
  }
}
```