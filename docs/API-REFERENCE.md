# api reference

This document provides comprehensive API documentation for all packages and services in the project.

## Table of Contents

- [@gabfon/mdx](#@gabfonmdx) - MDX processing and collections
- [@gabfon/ui](#@gabfondesign-system) - UI components and utilities
- [@gabfon/analytics](#@gabfonanalytics) - Analytics integration
- [@gabfon/next-config](#@gabfonnext-config) - Next.js configuration
- [@gabfon/typescript-config](#@gabfontypescript-config) - TypeScript configuration
- [@gabfon/ai](#@gabfonai) - AI integration utilities
- [@gabfon/database](#@gabfondatabase) - Database utilities
- [@gabfon/rate-limit](#@gabfonrate-limit) - Rate limiting
- [@gabfon/cache](#@gabfoncache) - Caching solutions
- [@gabfon/security](#@gabfonsecurity) - Security utilities
- [@gabfon/seo](#@gabfonseo) - SEO utilities
- [@gabfon/email](#@gabfonemail) - Email templates

---

## @gabfon/mdx

MDX content processing with Fumadocs integration.

### Installation

```bash
pnpm add @gabfon/mdx
```

### Usage

```typescript
import { docs, blog } from '@gabfon/mdx';
import { useMDXComponents } from '@gabfon/mdx';

// Access collections
const allDocs = await docs.getPages();
const allBlog = await blog.getPages();

// Use MDX components
const { components } = useMDXComponents();
```

### API

#### `docs`

Collection for documentation content.

```typescript
interface DocsCollection {
  getPages(): Promise<DocPage[]>;
  getPage(slug: string): Promise<DocPage | null>;
  search(query: string): Promise<DocPage[]>;
}
```

#### `blog`

Collection for blog content.

```typescript
interface BlogCollection {
  getPosts(): Promise<BlogPost[]>;
  getPost(slug: string): Promise<BlogPost | null>;
  getPostsByTag(tag: string): Promise<BlogPost[]>;
}
```

#### `useMDXComponents()`

Hook for accessing MDX components.

```typescript
const useMDXComponents: () => {
  components: MDXComponents;
};
```

---

## @gabfon/ui

Reusable UI components built with React and Tailwind CSS.

### Installation

```bash
pnpm add @gabfon/ui
```

### Usage

```typescript
import { Button, Card, Input } from '@gabfon/ui';

export const MyComponent = () => {
  return (
    <Card className="p-4">
      <Input placeholder="Enter email" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
};
```

### Components

#### Button

```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
}
```

#### Card

```typescript
interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}
```

#### Input

```typescript
interface InputProps {
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
}
```

### Utilities

#### `cn()`

Utility for conditional class names.

```typescript
const cn = (...classes: (string | undefined | null | false)[]): string;
```

---

## @gabfon/analytics

Analytics integration for Vercel Analytics and PostHog.

### Installation

```bash
pnpm add @gabfon/analytics
```

### Usage

```typescript
import { trackEvent, trackPageView } from '@gabfon/analytics';

// Track events
trackEvent('button_clicked', { 
  button_type: 'primary',
  page: 'homepage' 
});

// Track page views
trackPageView('/docs/getting-started');
```

### API

#### `trackEvent()`

Track custom events.

```typescript
const trackEvent = (
  eventName: string,
  properties?: Record<string, any>
): void;
```

#### `trackPageView()`

Track page views.

```typescript
const trackPageView = (path: string): void;
```

---

### API

#### `logger`

Structured logging utility.

```typescript
interface Logger {
  info(message: string, context?: Record<string, any>): void;
  warn(message: string, context?: Record<string, any>): void;
  error(message: string, context?: Record<string, any>): void;
  debug(message: string, context?: Record<string, any>): void;
}
```

#### `captureException()`

Capture exceptions for monitoring.

```typescript
const captureException = (error: Error | string, context?: Record<string, any>): void;
```

---

## @gabfon/next-config

Shared Next.js configuration utilities.

### Installation

```bash
pnpm add @gabfon/next-config
```

### Usage

```typescript
import { config as baseConfig, withAnalyzer } from '@gabfon/next-config';

// Use base configuration
const nextConfig = {
  ...baseConfig,
  // your custom config
};

// Use analyzer
const configWithAnalyzer = withAnalyzer(nextConfig);
```

### Exports

#### `config`

Base Next.js configuration object.

#### `withAnalyzer()`

Adds bundle analysis to configuration.

```typescript
const withAnalyzer = (config: NextConfig): NextConfig;
```

---

## @gabfon/typescript-config

Shared TypeScript configuration.

### Installation

```bash
pnpm add @gabfon/typescript-config
```

### Usage

```json
// tsconfig.json
{
  "extends": "@gabfon/typescript-config/nextjs.json",
  "compilerOptions": {
    // your custom options
  }
}
```

---

## @gabfon/ai

AI integration utilities for various AI services.

### Installation

```bash
pnpm add @gabfon/ai
```

### Usage

```typescript
import { generateText, generateImage } from '@gabfon/ai';

// Text generation
const response = await generateText({
  prompt: 'Write a blog post about React',
  model: 'gpt-4'
});

// Image generation
const imageUrl = await generateImage({
  prompt: 'A futuristic city skyline',
  model: 'dall-e-3'
});
```

### API

#### `generateText()`

Generate text using AI models.

```typescript
const generateText = (options: {
  prompt: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}): Promise<string>;
```

#### `generateImage()`

Generate images using AI models.

```typescript
const generateImage = (options: {
  prompt: string;
  model?: string;
  size?: '256x256' | '512x512' | '1024x1024';
}): Promise<string>;
```

---

## @gabfon/database

Database utilities and connection management.

### Installation

```bash
pnpm add @gabfon/database
```

### Usage

```typescript
import { db, connect, migrate } from '@gabfon/database';

// Database operations
const users = await db.user.findMany();
const user = await db.user.findUnique({ where: { id: '123' } });

// Connection management
await connect();
await migrate();
```

### API

#### `db`

Database client instance.

#### `connect()`

Establish database connection.

```typescript
const connect = (): Promise<void>;
```

#### `migrate()`

Run database migrations.

```typescript
const migrate = (): Promise<void>;
```

---

## @gabfon/rate-limit

Rate limiting utilities for API protection.

### Installation

```bash
pnpm add @gabfon/rate-limit
```

### Usage

```typescript
import { createRateLimiter } from '@gabfon/rate-limit';

// Create rate limiter
const limiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100
});

// Check rate limit
const result = await limiter.check('user_123');
if (result.allowed) {
  // Process request
} else {
  // Rate limited
}
```

### API

#### `createRateLimiter()`

Create a new rate limiter instance.

```typescript
const createRateLimiter = (options: {
  windowMs: number;
  maxRequests: number;
  keyGenerator?: (identifier: string) => string;
}): RateLimiter;
```

---

## @gabfon/cache

Caching solutions for performance optimization.

### Installation

```bash
pnpm add @gabfon/cache
```

### Usage

```typescript
import { createCache } from '@gabfon/cache';

// Create cache instance
const cache = createCache({
  ttl: 60 * 1000, // 1 minute
  maxSize: 1000
});

// Use cache
await cache.set('key', data);
const data = await cache.get('key');
```

### API

#### `createCache()`

Create a new cache instance.

```typescript
const createCache = (options: {
  ttl?: number;
  maxSize?: number;
  storage?: 'memory' | 'redis';
}): Cache;
```

---

## @gabfon/security

Security utilities and helpers.

### Installation

```bash
pnpm add @gabfon/security
```

### Usage

```typescript
import { hashPassword, verifyPassword, sanitizeInput } from '@gabfon/security';

// Password handling
const hashedPassword = await hashPassword('password123');
const isValid = await verifyPassword('password123', hashedPassword);

// Input sanitization
const cleanInput = sanitizeInput(userInput);
```

### API

#### `hashPassword()`

Hash passwords securely.

```typescript
const hashPassword = (password: string): Promise<string>;
```

#### `verifyPassword()`

Verify password against hash.

```typescript
const verifyPassword = (password: string, hash: string): Promise<boolean>;
```

#### `sanitizeInput()`

Sanitize user input.

```typescript
const sanitizeInput = (input: string): string;
```

---

## @gabfon/seo

SEO utilities and meta tag management.

### Installation

```bash
pnpm add @gabfon/seo
```

### Usage

```typescript
import { generateMetaTags, generateStructuredData } from '@gabfon/seo';

// Meta tags
const meta = generateMetaTags({
  title: 'My Page',
  description: 'Page description',
  image: '/og-image.jpg'
});

// Structured data
const structuredData = generateStructuredData({
  type: 'Article',
  title: 'My Article',
  author: 'John Doe'
});
```

### API

#### `generateMetaTags()`

Generate meta tags for pages.

```typescript
const generateMetaTags = (metadata: {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}): MetaTags;
```

#### `generateStructuredData()`

Generate structured data for SEO.

```typescript
const generateStructuredData = (data: {
  type: string;
  title: string;
  author?: string;
  datePublished?: string;
  image?: string;
}): StructuredData;
```

---

## @gabfon/email

Email templates and sending utilities.

### Installation

```bash
pnpm add @gabfon/email
```

### Usage

```typescript
import { sendEmail, renderTemplate } from '@gabfon/email';

// Send email
await sendEmail({
  to: 'user@example.com',
  subject: 'Welcome!',
  template: 'welcome',
  data: { name: 'John' }
});

// Render template
const html = renderTemplate('welcome', { name: 'John' });
```

### API

#### `sendEmail()`

Send email using configured provider.

```typescript
const sendEmail = (options: {
  to: string | string[];
  subject: string;
  template?: string;
  html?: string;
  data?: Record<string, any>;
}): Promise<EmailResult>;
```

#### `renderTemplate()`

Render email template with data.

```typescript
const renderTemplate = (
  templateName: string,
  data: Record<string, any>
): string;
```

---

*This API reference is automatically generated from package exports. Last updated: 2025-03-23*
