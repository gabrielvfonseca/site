# @gabfon/github

A TypeScript client library for interacting with the GitHub API. This package provides a clean, type-safe interface for fetching GitHub user data, repositories, events, and contribution statistics.

## Features

- **Type-safe API** - Full TypeScript support with Zod validation
- **GitHub API Integration** - Access user profiles, repositories, events, and contributions
- **Contribution Analytics** - Fetch detailed contribution calendars and statistics
- **React Hooks** - Built-in React hooks for seamless integration
- **Environment Validation** - Secure environment variable handling with `@t3-oss/env-nextjs`

## Installation

```bash
npm install @gabfon/github
```

## Usage

### Environment Setup

Create environment variables for GitHub API access:

```env
GITHUB_TOKEN=your_github_personal_access_token
```

### Basic Usage

```typescript
import { githubClient } from '@gabfon/github';

// Get user information
const user = await githubClient.getUser('username');

// Get user repositories
const repos = await githubClient.getUserRepos('username');

// Get user events
const events = await githubClient.getUserEvents('username');

// Get contribution calendar
const contributions = await githubClient.getContributions('username');
```

### React Integration

```typescript
import { useGitHubUser, useGitHubRepos } from '@gabfon/github/hooks';

function UserProfile({ username }: { username: string }) {
  const { data: user, isLoading, error } = useGitHubUser(username);
  const { data: repos } = useGitHubRepos(username);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.bio}</p>
      <h2>Repositories ({repos?.length})</h2>
      <ul>
        {repos?.map(repo => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

## API Reference

### Client Methods

- `getUser(username: string)` - Fetch user profile information
- `getUserRepos(username: string)` - Fetch user's public repositories
- `getUserEvents(username: string)` - Fetch user's recent activity events
- `getContributions(username: string)` - Fetch user's contribution calendar

### Types

- `GitHubUser` - User profile information
- `GitHubRepo` - Repository information
- `GitHubEvent` - User activity events
- `GitHubContributionCalendar` - Contribution calendar data
- `GitHubApiResponse<T>` - Generic API response wrapper

## Environment Variables

This package uses `@t3-oss/env-nextjs` for environment validation. Required variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `GITHUB_TOKEN` | GitHub Personal Access Token | Yes |

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Type checking
npm run typecheck

# Build
npm run build
```

## Testing

The package includes comprehensive tests using Vitest:

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:unit
npm run test:integration
npm run test:e2e

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## Dependencies

- `@gabfon/analytics` - Analytics integration
- `@gabfon/testing` - Shared testing utilities
- `@t3-oss/env-nextjs` - Environment validation
- `react` - React integration
- `zod` - Runtime type validation
