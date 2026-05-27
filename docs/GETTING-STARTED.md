# getting started

This guide will help you get the project up and running on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20+ (recommended: use [nvm](https://github.com/nvm-sh/nvm) to manage versions)
- **pnpm** 8+ (package manager)
- **Git** for version control

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd site
```

### 2. Install Dependencies

```bash
pnpm install
```

This will install all dependencies for the monorepo, including:
- Core dependencies for all packages
- Development dependencies
- Tool dependencies (TypeScript, Biome, etc.)

### 3. Environment Setup

Copy the environment example file:

```bash
cp apps/www/.env.example apps/www/.env.local
```

Configure the necessary environment variables:
- Database connection
- API keys
- Third-party service credentials

### 4. Start Development

```bash
# Start all services (recommended for full development)
pnpm dev

# Or start specific packages
pnpm dev --filter=site  # Just the web app
pnpm dev --filter=@gabfon/mdx  # Just MDX package
```

## Development Workflow

### Package Structure

```
site/
├── apps/                    # Applications
│   └── www/               # Main Next.js application
├── packages/                # Shared packages
│   ├── mdx/               # MDX processing package
│   ├── design-system/      # UI components
│   ├── analytics/          # Analytics utilities
│   └── ...               # Other packages
├── content/                # MDX content
│   ├── docs/              # Documentation
│   └── blog/              # Blog posts
└── docs/                  # Project documentation
```

### Common Commands

```bash
# Build all packages
pnpm build

# Run tests
pnpm test

# Type checking
pnpm typecheck

# Linting and formatting
pnpm lint
pnpm format

# Clean all packages
pnpm clean
```

### Development Tools

- **Turbo**: Monorepo task runner and caching
- **Biome**: Linting and code formatting
- **TypeScript**: Static type checking
- **Fumadocs MDX**: Content processing and collections

## Content Management

This project uses **Fumadocs MDX** for content management:

### Adding Documentation

1. Create MDX files in `content/docs/`
2. Frontmatter is automatically processed
3. Content is available through the collections API

### Adding Blog Posts

1. Create MDX files in `content/blog/`
2. Use frontmatter for metadata
3. Posts are automatically listed and paginated

### Content Structure Example

```mdx
---
title: "Your Title"
description: "Content description"
published: true
---

# Your Content

Write your content here using MDX syntax.
```

## Troubleshooting

### Common Issues

**Dependency Installation Issues**
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**TypeScript Errors**
```bash
# Rebuild all packages
pnpm build
```

**Development Server Issues**
```bash
# Clear Next.js cache
rm -rf .next
pnpm dev
```

### Getting Help

- Check the [Architecture Guide](./architecture.md) for understanding the project structure
- Review the [Development Guide](./development.md) for coding standards
- Open an issue on GitHub for specific problems

## Next Steps

Once you have the project running:

1. Explore the application at `http://localhost:3000`
2. Read the [Architecture Guide](./architecture.md) to understand the codebase
3. Follow the [Development Guide](./development.md) for contributing
4. Check the [API Reference](./api.md) for package documentation

---

*Need help? Check our [FAQ](./faq.md) or open an issue.*
