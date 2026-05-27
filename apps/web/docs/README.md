# readme

## Getting Started

The `@apps/www` application is a modern, full-stack web application built with Next.js 15, React 19, and TypeScript. It serves as the primary user-facing application in the `@gabfon` monorepo ecosystem.

### Quick Start

```bash
# Clone the repository
git clone https://github.com/your-org/gabfon.git
cd gabfon

# Install dependencies
bun install

# Start development server
cd apps/www
bun run dev
```

The application will be available at `http://localhost:3000`.

## Prerequisites

- **Node.js** 18+ (recommended: use [nvm](https://github.com/nvm-sh/nvm))
- **Bun** 1.2+ (package manager)
- **Git** for version control

### Environment Setup

Create a `.env.local` file in the `apps/www` directory:

```bash
# Core Configuration
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
DATABASE_URL=sqlite:./dev.db
NEXTAUTH_SECRET=your-development-secret-key
NEXTAUTH_URL=http://localhost:3000

# Optional: External Services
NEXT_PUBLIC_GA_ID=your-google-analytics-id
RESEND_API_KEY=your-resend-api-key
```

## Development Workflow

### Available Scripts

```bash
# Development
bun run dev              # Start development server
bun run build            # Build for production
bun run start             # Start production server
bun run analyze           # Analyze bundle size

# Code Quality
bun run typecheck        # Run TypeScript checks
bun run lint             # Run ESLint
bun run format           # Format code with Prettier

# Testing
bun run test             # Run all tests
bun run test:watch       # Run tests in watch mode
bun run test:coverage    # Run tests with coverage
bun run test:e2e         # Run E2E tests
```

### Project Structure

```
apps/www/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Authentication routes
│   │   ├── (dashboard)/       # Dashboard routes
│   │   ├── api/               # API endpoints
│   │   ├── blog/              # Blog functionality
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/             # Reusable components
│   │   ├── providers/         # React context providers
│   │   ├── ui/               # UI components
│   │   └── [feature]/        # Feature-specific components
│   ├── data-access/           # Data layer
│   │   └── queries/          # Database queries
│   ├── dictionaries/          # i18n translation files
│   ├── lib/                  # Utilities and configurations
│   └── types/                # Type definitions
├── docs/                     # App-specific documentation
├── public/                   # Static assets
├── tests/                    # Test files
└── [config files]            # Next.js, TypeScript, etc.
```

## Key Features

### 🚀 Modern Web Development
- **Next.js 15** with App Router for optimal performance
- **React 19** with Server Components by default
- **TypeScript** for type-safe development
- **Tailwind CSS** for utility-first styling

### 🎨 Design System
- **@gabfon/ui** - 50+ accessible components
- **Consistent theming** with CSS variables
- **Dark mode** support
- **Responsive design** for all screen sizes

### 🌍 Internationalization
- **Multi-language support** (en, fr, es, de, ja)
- **Automatic locale detection**
- **Dynamic routing** with locale-based URLs
- **Translation management** with JSON dictionaries

### 📝 Content Management
- **MDX support** with Fumadocs integration
- **Blog system** with dynamic routing
- **SEO optimization** with structured data
- **Static content** with optimized loading

### 🔐 Security
- **JWT authentication** with secure sessions
- **Role-based authorization** system
- **Input validation** with Zod schemas
- **Security headers** and best practices

## Package Integration

The application seamlessly integrates all `@gabfon/*` packages:

### Core Infrastructure
```typescript
// Database operations
import { queryAllPosts } from '@/data-access/queries/query-posts';

// Caching
import { cache } from '@gabfon/cache';

// Security
import { authenticate, authorize } from '@gabfon/security';
```

### UI Components
```typescript
// Design system components
import { Button, Card, Input } from '@gabfon/ui';

// Icons
import { Search, User, Settings } from 'lucide-react';
```

### Internationalization
```typescript
// Translation hook
import { useI18n } from '@/lib/i18n';

const t = useI18n();
<h1>{t('welcome.title')}</h1>
```

## Development Guidelines

### Code Style
- **TypeScript** for all new code
- **ESLint** configuration enforced
- **Prettier** for consistent formatting
- **Conventional commits** for git messages

### Component Development
```typescript
// Example component structure
import { Button } from '@gabfon/ui';
import { useI18n } from '@/lib/i18n';

interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  const t = useI18n();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{t('description')}</p>
        <Button onClick={onAction}>
          {t('action')}
        </Button>
      </CardContent>
    </Card>
  );
}
```

### API Routes
```typescript
// Example API route
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createPost } from '@/data-access/queries/query-posts';

const createPostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(10),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createPostSchema.parse(body);
    
    const post = await createPost(validated);
    
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
```

## Testing

### Running Tests
```bash
# All tests
bun run test

# Watch mode
bun run test:watch

# Coverage
bun run test:coverage

# E2E tests
bun run test:e2e
```

### Test Structure
```
tests/
├── unit/              # Unit tests
├── integration/       # Integration tests
├── e2e/             # End-to-end tests
└── fixtures/         # Test data
```

### Example Test
```typescript
// Example unit test
import { render, screen } from '@testing-library/react';
import { Button } from '@gabfon/ui';
import { MyComponent } from '@/components/MyComponent';

describe('MyComponent', () => {
  it('renders title correctly', () => {
    render(<MyComponent title="Test Title" />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
  
  it('calls onAction when button is clicked', () => {
    const onAction = jest.fn();
    render(<MyComponent title="Test" onAction={onAction} />);
    
    screen.getByRole('button').click();
    
    expect(onAction).toHaveBeenCalled();
  });
});
```

## Deployment

### Environment Variables

Production environment variables:

```bash
# Required
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
DATABASE_URL=postgresql://user:pass@host:port/db
NEXTAUTH_SECRET=your-secure-secret-key
NEXTAUTH_URL=https://your-domain.com

# Optional
NEXT_PUBLIC_GA_ID=your-google-analytics-id
RESEND_API_KEY=your-resend-api-key
STRIPE_SECRET_KEY=your-stripe-secret-key
```

### Deployment Options

#### Vercel (Recommended)
```bash
# Install Vercel CLI
bun add -D vercel

# Deploy
bunx vercel --prod
```

#### Docker
```bash
# Build Docker image
docker build -t my-app .

# Run with Docker Compose
docker-compose up -d
```

#### Static Export
```bash
# Build static files
bun run build

# Deploy to Netlify
bunx netlify deploy --prod --dir=out
```

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear build cache
rm -rf .next

# Clear dependencies
rm -rf node_modules bun.lockb
bun install

# Check TypeScript errors
bun run typecheck
```

#### Development Issues
```bash
# Check port availability
lsof -i :3000

# Clear browser cache
# Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

# Restart development server
bun run dev
```

#### Database Issues
```bash
# Reset database (development only)
rm -f dev.db

# Check database connection
echo $DATABASE_URL
```

## Contributing

### Getting Help

- **Documentation**: Check `/docs` folder for detailed guides
- **Issues**: Report bugs on GitHub Issues
- **Discussions**: Ask questions in GitHub Discussions
- **Architecture**: See `docs/ARCHITECTURE.md` for system design

### Development Process

1. **Fork** the repository
2. **Create** feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'feat: add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** Pull Request

### Code Review Guidelines

- **TypeScript** types must be correct
- **Tests** should cover new functionality
- **Documentation** should be updated
- **Performance** impact should be considered
- **Accessibility** should be maintained

## Support

For additional help:

- **Email**: support@gabfon.com
- **Documentation**: `/docs` folder
- **API Reference**: `docs/api.md`
- **Architecture**: `docs/architecture.md`

---

Built with ❤️ using the `@gabfon` monorepo ecosystem.