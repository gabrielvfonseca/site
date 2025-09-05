# @gabfon/mdx

MDX processing package for rendering Markdown with React components.

## Overview

This package provides MDX processing capabilities for the monorepo, allowing you to write Markdown with embedded React components. It includes syntax highlighting, custom components, and remote MDX support.

## Features

- **MDX Processing**: Render Markdown with React components
- **Syntax Highlighting**: Code syntax highlighting with Sugar High
- **Custom Components**: Pre-configured MDX components
- **Remote MDX**: Support for remote MDX content
- **Type Safety**: Full TypeScript support
- **Next.js Integration**: Optimized for Next.js applications

## Installation

```bash
pnpm add @gabfon/mdx
```

## Usage

### Basic MDX Processing

```typescript
import { serialize } from '@gabfon/mdx/serialize';
import { MdxRemote } from '@gabfon/mdx/remote';

// Serialize MDX content
const mdxSource = await serialize(markdownContent);

// Render remote MDX
<MdxRemote source={mdxSource} />
```

### Using Custom Components

```typescript
import { components } from '@gabfon/mdx/components';

// Use in your MDX
<MdxRemote source={mdxSource} components={components} />
```

### Next.js Integration

```typescript
// next.config.js
import { withMdx } from '@gabfon/mdx';

const nextConfig = withMdx({
  // your Next.js config
});
```

## Exports

- `./src/index.ts` - Main MDX utilities
- `./src/remote.ts` - Remote MDX processing
- `./src/serialize.ts` - MDX serialization
- `./src/components.tsx` - Pre-configured MDX components

## MDX Components

The package includes pre-configured components for common MDX elements:

- **Code Blocks**: Syntax highlighted code with copy functionality
- **Headings**: Styled heading components
- **Links**: Enhanced link components
- **Images**: Optimized image components
- **Tables**: Styled table components
- **Lists**: Enhanced list components

## Usage Examples

### Server-side Rendering

```typescript
import { serialize } from '@gabfon/mdx/serialize';

export async function getStaticProps() {
  const mdxSource = await serialize(markdownContent);
  
  return {
    props: {
      mdxSource,
    },
  };
}
```

### Client-side Rendering

```typescript
import { MdxRemote } from '@gabfon/mdx/remote';

function BlogPost({ mdxSource }) {
  return <MdxRemote source={mdxSource} />;
}
```

### Custom Components in MDX

```mdx
# My Blog Post

Here's some content with a custom component:

<CustomComponent prop="value" />

And some code:

```typescript
const example = "Hello World";
```
```

## Dependencies

- `@mdx-js/loader` - MDX webpack loader
- `@mdx-js/react` - React MDX integration
- `@next/mdx` - Next.js MDX support
- `next-mdx-remote` - Remote MDX processing
- `sugar-high` - Syntax highlighting
- `@gabfon/design-system` - UI components
- `@t3-oss/env-nextjs` - Environment validation
- `react` - React framework
- `zod` - Schema validation

## Development

```bash
# Type checking
pnpm typecheck

# Clean build artifacts
pnpm clean
```

## Configuration

### Environment Variables

```env
# Optional: Custom MDX configuration
MDX_COMPONENTS_PATH=./src/components
```

### Custom Components

You can extend the default components by providing your own:

```typescript
import { components } from '@gabfon/mdx/components';

const customComponents = {
  ...components,
  CustomComponent: MyCustomComponent,
};
```