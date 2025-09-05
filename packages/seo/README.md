# @gabfon/seo

SEO package providing metadata management, structured data, and viewport configuration.

## Overview

This package provides comprehensive SEO utilities for Next.js applications, including metadata generation, JSON-LD structured data, and viewport configuration. It's designed to improve search engine optimization and social media sharing.

## Features

- **Metadata Management**: Dynamic metadata generation for pages
- **Structured Data**: JSON-LD schema markup for rich snippets
- **Viewport Configuration**: Responsive viewport settings
- **Social Media**: Open Graph and Twitter Card support
- **Type Safety**: Full TypeScript support with proper typing
- **Next.js Integration**: Optimized for Next.js App Router

## Installation

```bash
pnpm add @gabfon/seo
```

## Usage

### Basic Metadata

```typescript
import { createMetadata } from '@gabfon/seo/metadata';

export const metadata = createMetadata({
  title: 'My Page Title',
  description: 'Page description for SEO',
  keywords: ['keyword1', 'keyword2'],
});
```

### Advanced Metadata

```typescript
import { createMetadata } from '@gabfon/seo/metadata';

export const metadata = createMetadata({
  title: 'My Page Title',
  description: 'Page description for SEO',
  openGraph: {
    title: 'Social Media Title',
    description: 'Social Media Description',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Twitter Title',
    description: 'Twitter Description',
    images: ['/twitter-image.jpg'],
  },
});
```

### Structured Data (JSON-LD)

```typescript
import { JsonLd, Blog } from '@gabfon/seo/json-ld';

function BlogPost({ post }) {
  const blogSchema: Blog = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
  };

  return (
    <>
      <JsonLd data={blogSchema} />
      {/* Your blog post content */}
    </>
  );
}
```

### Viewport Configuration

```typescript
import { createViewport } from '@gabfon/seo/viewport';

export const viewport = createViewport({
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
});
```

## Exports

- `./src/metadata.ts` - Metadata generation utilities
- `./src/viewport.tsx` - Viewport configuration
- `./src/json-ld.tsx` - JSON-LD structured data components

## Metadata Features

### Basic Metadata
- **Title**: Page titles with fallbacks
- **Description**: Meta descriptions
- **Keywords**: Meta keywords
- **Canonical URLs**: Canonical link tags
- **Robots**: Robot directives

### Open Graph
- **Title**: OG title
- **Description**: OG description
- **Images**: OG images
- **Type**: Content type
- **URL**: Canonical URL
- **Site Name**: Site name

### Twitter Cards
- **Card Type**: Summary or large image
- **Title**: Twitter title
- **Description**: Twitter description
- **Images**: Twitter images
- **Creator**: Twitter creator

### Additional Features
- **Alternate Languages**: Hreflang tags
- **Manifest**: Web app manifest
- **Theme Color**: Browser theme color
- **Icons**: Favicon and app icons

## Structured Data Types

The package supports various JSON-LD schema types:

- **Blog**: Blog and blog post schemas
- **Article**: News and article schemas
- **Organization**: Organization and business schemas
- **Person**: Person and author schemas
- **Product**: Product and e-commerce schemas
- **Event**: Event and calendar schemas
- **FAQ**: FAQ page schemas
- **Breadcrumb**: Navigation breadcrumb schemas

## Usage Examples

### Blog Post Metadata

```typescript
export const metadata = createMetadata({
  title: post.title,
  description: post.excerpt,
  openGraph: {
    title: post.title,
    description: post.excerpt,
    images: [post.featuredImage],
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    authors: [post.author],
    tags: post.tags,
  },
  twitter: {
    card: 'summary_large_image',
    title: post.title,
    description: post.excerpt,
    images: [post.featuredImage],
  },
});
```

### E-commerce Product

```typescript
import { JsonLd, Product } from '@gabfon/seo/json-ld';

function ProductPage({ product }) {
  const productSchema: Product = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <JsonLd data={productSchema} />
      {/* Product content */}
    </>
  );
}
```

## Dependencies

- `lodash.merge` - Deep object merging
- `react` - React framework
- `schema-dts` - TypeScript definitions for JSON-LD schemas

## Development

```bash
# Type checking
pnpm typecheck

# Clean build artifacts
pnpm clean
```

## Best Practices

1. **Unique Titles**: Ensure each page has a unique, descriptive title
2. **Meta Descriptions**: Write compelling meta descriptions under 160 characters
3. **Structured Data**: Use appropriate schema markup for your content
4. **Image Optimization**: Optimize Open Graph and Twitter images
5. **Canonical URLs**: Set canonical URLs to prevent duplicate content issues
6. **Mobile Optimization**: Ensure viewport configuration is mobile-friendly

## Testing

Use Google's Rich Results Test and Facebook's Sharing Debugger to validate your SEO implementation:

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)