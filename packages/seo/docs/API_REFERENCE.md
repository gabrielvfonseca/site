# @gabfon/seo API Reference

## Installation

```bash
npm install @gabfon/seo
```

## Exports

### Metadata Generation
```typescript
export { createMetadata } from './metadata';
```

### Components
```typescript
export { JsonLd } from './json-ld';
export { Viewport } from './viewport';
```

### Schema Types
```typescript
export * from 'schema-dts';
```

## Core Functions

### createMetadata

Factory function that generates comprehensive SEO metadata for Next.js pages.

#### Signature

```typescript
function createMetadata({
  title,
  description,
  image,
  ...properties
}: MetadataGenerator): Metadata
```

#### Parameters

- `title: string` - Page title
- `description: string` - Page description
- `image?: string` - Open Graph image URL
- `...properties: Omit<Metadata, 'description' | 'title'>` - Additional metadata properties

#### Returns

- `Metadata` - Next.js metadata object

#### Usage

```typescript
// app/about/page.tsx
import { createMetadata } from '@gabfon/seo/metadata';

export const metadata = createMetadata({
  title: 'About Gabriel Fonseca',
  description: 'Learn about Gabriel Fonseca and his work in web development.',
  image: '/images/about-og.jpg',
});

export default function AboutPage() {
  return <div>About content</div>;
}
```

#### Default Metadata Included

```typescript
{
  title, // Provided title
  description, // Provided description
  applicationName: 'Gabriel Fonseca',
  authors: [{ name: 'Gabriel Fonseca', url: 'https://gabfon.com/' }],
  creator: 'Gabriel Fonseca',
  formatDetection: { telephone: false },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title,
  },
  openGraph: {
    title,
    description,
    type: 'website',
    siteName: 'Gabriel Fonseca',
    locale: 'en_US',
  },
  publisher: 'Gabriel Fonseca',
  twitter: {
    card: 'summary_large_image',
    creator: '@gabfon_',
  },
}
```

## Components

### JsonLd

React component that renders JSON-LD structured data for Schema.org markup.

#### Props

```typescript
interface JsonLdProps {
  code: WithContext<Thing>;
}
```

#### Usage

```typescript
import { JsonLd } from '@gabfon/seo/json-ld';
import type { BlogPosting } from 'schema-dts';

export default function BlogPostPage() {
  const structuredData: BlogPosting = {
    '@type': 'BlogPosting',
    headline: 'Understanding Next.js SEO',
    description: 'A comprehensive guide to SEO in Next.js applications',
    author: {
      '@type': 'Person',
      name: 'Gabriel Fonseca',
      url: 'https://gabfon.com/',
    },
    datePublished: '2023-01-01',
    dateModified: '2023-01-02',
    image: 'https://example.com/blog-image.jpg',
    url: 'https://example.com/blog/nextjs-seo',
  };

  return (
    <>
      <JsonLd code={structuredData} />
      <article>Blog content</article>
    </>
  );
}
```

#### Schema Types

The component supports any Schema.org type:

```typescript
// Organization
const organizationData = {
  '@type': 'Organization',
  name: 'Gabriel Fonseca',
  url: 'https://gabfon.com/',
  logo: 'https://gabfon.com/logo.png',
};

// Person
const personData = {
  '@type': 'Person',
  name: 'Gabriel Fonseca',
  jobTitle: 'Web Developer',
  url: 'https://gabfon.com/',
};

// Product
const productData = {
  '@type': 'Product',
  name: 'SEO Package',
  description: 'Comprehensive SEO utilities for Next.js',
  brand: 'Gabriel Fonseca',
};
```

### Viewport

React component that renders viewport meta tag for mobile optimization.

#### Props

```typescript
interface ViewportProps {
  children?: React.ReactNode;
}
```

#### Usage

```typescript
// app/layout.tsx
import { Viewport } from '@gabfon/seo/viewport';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <Viewport />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

#### Viewport Configuration

```typescript
// Custom viewport settings
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#000000',
  colorScheme: 'dark light',
};
```

## Schema Types

### Available Types

The package re-exports all Schema.org types from `schema-dts`:

```typescript
// Common types
import type {
  Article,
  BlogPosting,
  NewsArticle,
  Organization,
  Person,
  Product,
  Recipe,
  Review,
  Event,
  LocalBusiness,
  WebSite,
  WebPage,
} from 'schema-dts';
```

### Type Safety

All schema types are fully typed with TypeScript:

```typescript
// Type-safe structured data creation
const article: Article = {
  '@type': 'Article',
  headline: 'Article Title',
  // TypeScript will validate required properties
  author: {
    '@type': 'Person',
    name: 'Author Name',
  },
  datePublished: '2023-01-01',
};
```

## Usage Examples

### Basic Page SEO

```typescript
// app/services/page.tsx
import { createMetadata } from '@gabfon/seo/metadata';

export const metadata = createMetadata({
  title: 'Web Development Services | Gabriel Fonseca',
  description: 'Professional web development services including React, Next.js, and Node.js development.',
  image: '/images/services-og.jpg',
});

export default function ServicesPage() {
  return <div>Services content</div>;
}
```

### Blog Post SEO

```typescript
// app/blog/[slug]/page.tsx
import { createMetadata } from '@gabfon/seo/metadata';
import { JsonLd } from '@gabfon/seo/json-ld';
import type { BlogPosting } from 'schema-dts';

interface BlogPostPageProps {
  params: { slug: string };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug);
  
  const structuredData: BlogPosting = {
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: 'Gabriel Fonseca',
      url: 'https://gabfon.com/',
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    image: post.coverImage,
    url: `https://gabfon.com/blog/${params.slug}`,
  };

  return (
    <>
      <JsonLd code={structuredData} />
      <article>
        <h1>{post.title}</h1>
        <div>{post.content}</div>
      </article>
    </>
  );
}

export const metadata = createMetadata({
  title: 'Blog Post Title | Gabriel Fonseca',
  description: 'Blog post description',
  image: '/images/blog-og.jpg',
});
```

### Product Page SEO

```typescript
// app/products/[id]/page.tsx
import { createMetadata } from '@gabfon/seo/metadata';
import { JsonLd } from '@gabfon/seo/json-ld';
import type { Product } from 'schema-dts';

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProduct(params.id);
  
  const structuredData: Product = {
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'Gabriel Fonseca',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    image: product.image,
  };

  return (
    <>
      <JsonLd code={structuredData} />
      <div>Product content</div>
    </>
  );
}
```

### Organization Schema

```typescript
// app/about/page.tsx
import { JsonLd } from '@gabfon/seo/json-ld';
import type { Organization } from 'schema-dts';

export default function AboutPage() {
  const organizationData: Organization = {
    '@type': 'Organization',
    name: 'Gabriel Fonseca',
    url: 'https://gabfon.com/',
    logo: 'https://gabfon.com/logo.png',
    description: 'Web development and consulting services',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-0123',
      contactType: 'customer service',
      availableLanguage: ['English'],
    },
    sameAs: [
      'https://x.com/gabfon_',
      'https://github.com/gabfon',
      'https://linkedin.com/in/gabfon',
    ],
  };

  return (
    <>
      <JsonLd code={organizationData} />
      <div>About content</div>
    </>
  );
}
```

### Event Schema

```typescript
// app/events/[id]/page.tsx
import { JsonLd } from '@gabfon/seo/json-ld';
import type { Event } from 'schema-dts';

export default function EventPage({ params }: { params: { id: string } }) {
  const event = getEvent(params.id);
  
  const eventData: Event = {
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    location: {
      '@type': 'Place',
      name: event.venue.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.venue.address,
        addressLocality: event.venue.city,
        addressRegion: event.venue.state,
        postalCode: event.venue.zipCode,
        addressCountry: event.venue.country,
      },
    },
    offers: {
      '@type': 'Offer',
      price: event.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: event.ticketSaleStart,
    },
  };

  return (
    <>
      <JsonLd code={eventData} />
      <div>Event content</div>
    </>
  );
}
```

### Custom Metadata

```typescript
// app/custom/page.tsx
import { createMetadata } from '@gabfon/seo/metadata';

export const metadata = createMetadata({
  title: 'Custom Page | Gabriel Fonseca',
  description: 'Custom page with additional metadata',
  image: '/images/custom-og.jpg',
  keywords: ['custom', 'seo', 'metadata'],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://gabfon.com/custom',
    languages: {
      'en-US': '/en/custom',
      'es-ES': '/es/custom',
    },
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
});

export default function CustomPage() {
  return <div>Custom content</div>;
}
```

## Advanced Usage

### Dynamic Metadata

```typescript
// app/posts/[category]/page.tsx
import { createMetadata } from '@gabfon/seo/metadata';

interface CategoryPageProps {
  params: { category: string };
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = await getCategory(params.category);
  
  return createMetadata({
    title: `${category.name} Posts | Gabriel Fonseca`,
    description: `Browse all posts in ${category.name} category`,
    image: category.image,
    keywords: category.tags,
  });
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const posts = getPostsByCategory(params.category);
  return <div>Category content</div>;
}
```

### Multiple Schema Objects

```typescript
// app/home/page.tsx
import { JsonLd } from '@gabfon/seo/json-ld';
import type { WebSite, Person } from 'schema-dts';

export default function HomePage() {
  const webSiteData: WebSite = {
    '@type': 'WebSite',
    name: 'Gabriel Fonseca',
    url: 'https://gabfon.com/',
    description: 'Web development and consulting',
  };

  const personData: Person = {
    '@type': 'Person',
    name: 'Gabriel Fonseca',
    url: 'https://gabfon.com/',
    jobTitle: 'Web Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Gabriel Fonseca',
    },
  };

  return (
    <>
      <JsonLd code={webSiteData} />
      <JsonLd code={personData} />
      <div>Home content</div>
    </>
  );
}
```

### Breadcrumb Schema

```typescript
// components/Breadcrumbs.tsx
import { JsonLd } from '@gabfon/seo/json-ld';
import type { BreadcrumbList } from 'schema-dts';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const breadcrumbData: BreadcrumbList = {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <>
      <JsonLd code={breadcrumbData} />
      <nav aria-label="Breadcrumb">
        {items.map((item, index) => (
          <span key={item.url}>
            <a href={item.url}>{item.name}</a>
            {index < items.length - 1 && ' > '}
          </span>
        ))}
      </nav>
    </>
  );
}
```

## Best Practices

### 1. Title Optimization

```typescript
// Good: Descriptive and keyword-rich
createMetadata({
  title: 'Next.js SEO Guide | Gabriel Fonseca',
  description: 'Complete guide to implementing SEO in Next.js applications',
});

// Bad: Generic and unhelpful
createMetadata({
  title: 'Home',
  description: 'Welcome to my website',
});
```

### 2. Image Optimization

```typescript
// Good: Properly sized and described
createMetadata({
  title: 'About Page',
  description: 'Learn about Gabriel Fonseca',
  image: '/images/about-og.jpg', // 1200x630 recommended
});

// Bad: Missing or poor quality images
createMetadata({
  title: 'About Page',
  description: 'Learn about Gabriel Fonseca',
  // No image specified
});
```

### 3. Structured Data

```typescript
// Good: Comprehensive and accurate
const structuredData: BlogPosting = {
  '@type': 'BlogPosting',
  headline: 'Complete Guide to Next.js SEO',
  description: 'Learn how to implement SEO best practices',
  author: {
    '@type': 'Person',
    name: 'Gabriel Fonseca',
  },
  datePublished: '2023-01-01',
  dateModified: '2023-01-02',
  image: 'https://example.com/image.jpg',
};

// Bad: Incomplete or inaccurate
const structuredData = {
  '@type': 'BlogPosting',
  headline: 'SEO Guide',
  // Missing required properties
};
```

### 4. Mobile Optimization

```typescript
// Good: Comprehensive viewport settings
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#000000',
};

// Bad: Minimal or no viewport settings
export const viewport = {
  width: 'device-width',
};
```

## Integration Examples

### With Analytics Package

```typescript
import { createMetadata } from '@gabfon/seo/metadata';
import { analytics } from '@gabfon/analytics/lib/server';

export async function generateMetadata({ params }) {
  const pageData = await getPageData(params);
  
  // Track page metadata generation
  analytics.capture('metadata_generated', {
    page: params.slug,
    title: pageData.title,
  });
  
  return createMetadata({
    title: pageData.title,
    description: pageData.description,
    image: pageData.image,
  });
}
```

### With Design System Package

```typescript
import { JsonLd } from '@gabfon/seo/json-ld';
import { Card } from '@gabfon/design-system';

export default function BlogPost({ post }) {
  const structuredData = {
    '@type': 'BlogPosting',
    headline: post.title,
    // ... other properties
  };

  return (
    <>
      <JsonLd code={structuredData} />
      <Card>
        <h1>{post.title}</h1>
        <p>{post.excerpt}</p>
      </Card>
    </>
  );
}
```

## Testing

### Metadata Testing

```typescript
// __tests__/metadata.test.ts
import { createMetadata } from '@gabfon/seo/metadata';

describe('createMetadata', () => {
  test('generates correct metadata structure', () => {
    const metadata = createMetadata({
      title: 'Test Title',
      description: 'Test Description',
      image: '/test-image.jpg',
    });

    expect(metadata.title).toBe('Test Title');
    expect(metadata.description).toBe('Test Description');
    expect(metadata.openGraph).toBeDefined();
    expect(metadata.twitter).toBeDefined();
  });

  test('includes Open Graph image', () => {
    const metadata = createMetadata({
      title: 'Test Title',
      description: 'Test Description',
      image: '/test-image.jpg',
    });

    expect(metadata.openGraph?.images).toHaveLength(1);
    expect(metadata.openGraph?.images[0].url).toBe('/test-image.jpg');
  });
});
```

### Component Testing

```typescript
// __tests__/JsonLd.test.tsx
import { render } from '@testing-library/react';
import { JsonLd } from '@gabfon/seo/json-ld';

describe('JsonLd', () => {
  test('renders JSON-LD script tag', () => {
    const structuredData = {
      '@type': 'Person',
      name: 'Test Person',
    };

    const { container } = render(<JsonLd code={structuredData} />);
    
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();
    
    const content = script?.textContent;
    expect(content).toContain('"@type": "Person"');
    expect(content).toContain('"name": "Test Person"');
  });
});
```
