# readme

## Getting Started

The `site` application is a modern, full-stack web application built with Next.js 16, React 19, and TypeScript. It serves as the primary user-facing application in the `@gabfon` monorepo ecosystem.

### Quick Start

```bash
# Clone the repository
git clone https://github.com/your-org/gabfon.git
cd gabfon

# Install dependencies
bun install

# Start development server
cd apps/web
bun run dev
```

The application will be available at `http://localhost:3000`.

## Prerequisites

- **Node.js** 18+ (recommended: use [nvm](https://github.com/nvm-sh/nvm))
- **Bun** 1.2+ (package manager)
- **Git** for version control

### Environment Setup

Create a `.env.local` file in the `apps/web` directory:

```bash
# Core Configuration
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# AI Integration (Optional)
OPENAI_API_KEY=your-openai-api-key

# Music Service Integrations (Optional)
SPOTIFY_CLIENT_ID=your-spotify-client-id
SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
STRAVA_CLIENT_ID=your-strava-client-id
STRAVA_CLIENT_SECRET=your-strava-client-secret

# Security (Optional)
ARCJET_KEY=your-arcjet-key

# Optional: External Services
NEXT_PUBLIC_GA_ID=your-google-analytics-id
SENTRY_DSN=your-sentry-dsn
```

## Development Workflow

### Available Scripts

```bash
# Development
bun run dev              # Start development server
bun run build            # Build for production
bun run start             # Start production server
bun run analyze           # Analyze bundle size

# Code Quality (run from root directory)
bun run typecheck        # Run TypeScript checks
bun run lint             # Run Biome linting (via ultracite)
bun run format           # Format code with Biome (via ultracite)

# Testing
bun run test             # Run all tests
bun run test:watch       # Run tests in watch mode
bun run test:coverage    # Run tests with coverage
bun run test:e2e         # Run E2E tests

# Maintenance
bun run clean            # Clean build cache and dependencies
```

### Project Structure

```
apps/web/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (site)/            # Site routes group
│   │   ├── api/               # API endpoints
│   │   │   ├── chat/          # AI chat API
│   │   │   ├── github/        # GitHub integration
│   │   │   ├── spotify/       # Spotify integration
│   │   │   ├── strava/        # Strava integration
│   │   │   └── now/           # Now playing aggregation
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/             # Reusable components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utilities and configurations
│   ├── constants/             # Application constants
│   ├── styles/                # CSS files
│   └── types/                 # Type definitions
├── docs/                     # App-specific documentation
├── public/                   # Static assets
├── tests/                    # Test files
└── [config files]            # Next.js, TypeScript, etc.
```

## Key Features

### Modern Web Development
- **Next.js 16** with App Router for optimal performance
- **React 19** with Server Components by default
- **TypeScript** for type-safe development
- **Tailwind CSS 4** for utility-first styling

### Design System
- **@gabfon/design-system** - Comprehensive component library
- **Consistent theming** with CSS variables
- **Dark mode** support
- **Responsive design** for all screen sizes

### Content Management
- **MDX support** with Fumadocs integration
- **Content management** with Contentlayer
- **SEO optimization** with structured data
- **Syntax highlighting** with Shiki

### AI Integration
- **OpenAI API** integration for AI features
- **AI chat** functionality with streaming responses
- **Content generation** capabilities
- **Smart automation** features

### Security
- **Arcjet** integration for API protection
- **Rate limiting** and abuse prevention
- **Input validation** with Zod schemas
- **Security headers** and best practices

## Package Integration

The application seamlessly integrates all `@gabfon/*` packages:

### Core Infrastructure
```typescript
// AI integration
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

// Analytics
import { AnalyticsProvider } from '@gabfon/analytics';

// Security
import arcjet from '@arcjet/next';
```

### UI Components
```typescript
// Design system components
import { Button, Card, Input } from '@gabfon/design-system/components';

// Icons
import { Search, User, Settings } from 'lucide-react';
```

### API Integration
```typescript
// Spotify API
export async function GET() {
  const token = await getSpotifyToken();
  const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return NextResponse.json(await response.json());
}
```

## Development Guidelines

### Code Style
- **TypeScript** for all new code
- **Biome Configuration** - Code quality enforcement
- **Conventional commits** for git messages

### Component Development
```typescript
// Example component structure
import { Button } from '@gabfon/design-system/components';
import { useQueryState } from 'nuqs';

interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  const [search, setSearch] = useQueryState('q', {
    defaultValue: '',
  });
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Search: {search}</p>
        <Button onClick={onAction}>
          Action
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
import arcjet from '@arcjet/next';

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [shield()],
});

const chatSchema = z.object({
  message: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const decision = await aj.protect(request);
  
  if (decision.isDenied()) {
    return NextResponse.json({ error: 'Request denied' }, { status: 403 });
  }
  
  try {
    const body = await request.json();
    const validated = chatSchema.parse(body);
    
    // Process chat message
    const response = await processChatMessage(validated.message);
    
    return NextResponse.json({ response });
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

# AI Integration
OPENAI_API_KEY=your-openai-api-key

# Music Service Integrations
SPOTIFY_CLIENT_ID=your-spotify-client-id
SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
STRAVA_CLIENT_ID=your-strava-client-id
STRAVA_CLIENT_SECRET=your-strava-client-secret

# Security
ARCJET_KEY=your-arcjet-key

# Optional
NEXT_PUBLIC_GA_ID=your-google-analytics-id
SENTRY_DSN=your-sentry-dsn
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

# Clean all cache and dependencies
bun run clean
```

#### Development Issues
```bash
# Check port availability
lsof -i :3000

# Clear browser cache
# Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

# Restart development server
bun run dev

# Check environment variables
cat .env.local
```

#### Database Issues
```bash
# Reset API connections (development only)
# Remove any cached tokens or sessions

# Check API keys
echo "Checking environment variables..."
echo "OpenAI API Key: ${OPENAI_API_KEY:0:10}..."
echo "Spotify Client ID: ${SPOTIFY_CLIENT_ID}"
echo "Strava Client ID: ${STRAVA_CLIENT_ID}"

# Test API connections manually
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'
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
- **API security** should be considered

## Support

For additional help:

- **Email**: support@gabfon.com
- **Documentation**: `/docs` folder
- **API Reference**: `docs/api.md`
- **Architecture**: `docs/architecture.md`
- **Deployment**: `docs/deployment.md`
- **Testing**: `docs/testing.md`

---

Built with care using the `@gabfon` monorepo ecosystem.

---

## Additional Resources

### API Endpoints

The application provides several API endpoints:

- `/api/chat` - AI chat integration
- `/api/github/stars` - GitHub repository stars
- `/api/spotify/now-playing` - Current Spotify track
- `/api/spotify/top-tracks` - Top Spotify tracks
- `/api/strava/activities` - Recent Strava activities
- `/api/strava/stats` - Athlete statistics
- `/api/now` - Combined now playing data

### Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Yes | Site URL |
| `OPENAI_API_KEY` | Optional | OpenAI API key for AI features |
| `SPOTIFY_CLIENT_ID` | Optional | Spotify client ID |
| `SPOTIFY_CLIENT_SECRET` | Optional | Spotify client secret |
| `STRAVA_CLIENT_ID` | Optional | Strava client ID |
| `STRAVA_CLIENT_SECRET` | Optional | Strava client secret |
| `ARCJET_KEY` | Optional | Arcjet API key for security |
| `NEXT_PUBLIC_GA_ID` | Optional | Google Analytics ID |
| `SENTRY_DSN` | Optional | Sentry DSN for error tracking |