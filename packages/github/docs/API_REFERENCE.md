# @gabfon/github API Reference

## Installation

```bash
npm install @gabfon/github
```

## Environment Setup

Create environment variables for GitHub API access:

```env
GITHUB_TOKEN=ghp_your_github_personal_access_token
NEXT_PUBLIC_GITHUB_TOKEN=ghp_your_public_github_token
```

## Exports

### Main Client
```typescript
export { GitHubClient, githubClient } from './index';
```

### Types
```typescript
export * from './types';
```

### Hooks
```typescript
export * from './hooks';
```

### Environment Keys
```typescript
export { keys } from './keys';
```

## Client

### GitHubClient

Main GitHub API client class for interacting with GitHub's REST API.

#### Constructor

```typescript
class GitHubClient {
  constructor(options?: GitHubClientOptions)
}

interface GitHubClientOptions {
  token?: string;
  baseUrl?: string;
  userAgent?: string;
}
```

#### Usage

```typescript
import { GitHubClient } from '@gabfon/github';

const client = new GitHubClient({
  token: process.env.GITHUB_TOKEN,
  userAgent: 'MyApp/1.0',
});
```

#### Default Client

```typescript
import { githubClient } from '@gabfon/github';

// Pre-configured client with environment token
const user = await githubClient.getUser('gabfon');
```

### Methods

#### User Methods

##### getUser

Fetches a GitHub user's profile information.

```typescript
async getUser(username: string): Promise<GitHubUser>
```

**Parameters**
- `username: string` - GitHub username

**Returns**
- `Promise<GitHubUser>` - User profile information

**Example**
```typescript
const user = await client.getUser('gabfon');
console.log(user.name); // 'Gabriel Fonseca'
console.log(user.public_repos); // Number of public repositories
```

##### getUserRepos

Fetches all public repositories for a user.

```typescript
async getUserRepos(username: string): Promise<GitHubRepo[]>
```

**Parameters**
- `username: string` - GitHub username

**Returns**
- `Promise<GitHubRepo[]>` - Array of repositories

**Example**
```typescript
const repos = await client.getUserRepos('gabfon');
repos.forEach(repo => {
  console.log(repo.name, repo.stargazers_count);
});
```

#### Repository Methods

##### getRepo

Fetches detailed information about a specific repository.

```typescript
async getRepo(owner: string, repo: string): Promise<GitHubRepo>
```

**Parameters**
- `owner: string` - Repository owner username
- `repo: string` - Repository name

**Returns**
- `Promise<GitHubRepo>` - Repository information

**Example**
```typescript
const repo = await client.getRepo('gabfon', 'site-main');
console.log(repo.description);
console.log(repo.language);
```

##### getRepoEvents

Fetches events for a specific repository.

```typescript
async getRepoEvents(owner: string, repo: string): Promise<GitHubEvent[]>
```

**Parameters**
- `owner: string` - Repository owner username
- `repo: string` - Repository name

**Returns**
- `Promise<GitHubEvent[]>` - Array of repository events

**Example**
```typescript
const events = await client.getRepoEvents('gabfon', 'site-main');
events.forEach(event => {
  console.log(event.type, event.created_at);
});
```

#### Event Methods

##### getUserEvents

Fetches public events for a user.

```typescript
async getUserEvents(username: string): Promise<GitHubEvent[]>
```

**Parameters**
- `username: string` - GitHub username

**Returns**
- `Promise<GitHubEvent[]>` - Array of user events

**Example**
```typescript
const events = await client.getUserEvents('gabfon');
events.forEach(event => {
  console.log(`${event.type}: ${event.repo.name}`);
});
```

#### Contribution Methods

##### getUserContributions

Fetches contribution data for a user.

```typescript
async getUserContributions(username: string): Promise<GitHubContribution[]>
```

**Parameters**
- `username: string` - GitHub username

**Returns**
- `Promise<GitHubContribution[]>` - Array of contributions

**Example**
```typescript
const contributions = await client.getUserContributions('gabfon');
contributions.forEach(contribution => {
  console.log(contribution.date, contribution.count);
});
```

## Types

### GitHubUser

```typescript
interface GitHubUser {
  id: number;
  login: string;
  name: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  avatar_url: string;
  html_url: string;
  location: string | null;
  company: string | null;
  blog: string | null;
}
```

### GitHubRepo

```typescript
interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  private: boolean;
  owner: GitHubUser;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  language: string | null;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  html_url: string;
  clone_url: string;
  size: number;
  open_issues_count: number;
  topics: string[];
}
```

### GitHubEvent

```typescript
interface GitHubEvent {
  id: string;
  type: string;
  actor: GitHubUser;
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: Record<string, any>;
  public: boolean;
  created_at: string;
}
```

### GitHubContribution

```typescript
interface GitHubContribution {
  date: string;
  count: number;
  color: string;
  intensity: number;
}
```

## Hooks

### useGitHubUser

React hook for fetching GitHub user data.

#### Signature

```typescript
function useGitHubUser(username: string): {
  data: GitHubUser | null;
  loading: boolean;
  error: Error | null;
}
```

#### Usage

```typescript
import { useGitHubUser } from '@gabfon/github/hooks';

function UserProfile({ username }: { username: string }) {
  const { data: user, loading, error } = useGitHubUser(username);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
      <p>Followers: {user.followers}</p>
    </div>
  );
}
```

### useGitHubRepos

React hook for fetching user repositories.

#### Signature

```typescript
function useGitHubRepos(username: string): {
  data: GitHubRepo[] | null;
  loading: boolean;
  error: Error | null;
}
```

#### Usage

```typescript
import { useGitHubRepos } from '@gabfon/github/hooks';

function UserRepos({ username }: { username: string }) {
  const { data: repos, loading, error } = useGitHubRepos(username);

  if (loading) return <div>Loading repositories...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Repositories ({repos?.length})</h2>
      <ul>
        {repos?.map(repo => (
          <li key={repo.id}>
            <a href={repo.html_url}>{repo.name}</a>
            <span> {repo.stargazers_count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### useGitHubRepo

React hook for fetching repository information.

#### Signature

```typescript
function useGitHubRepo(owner: string, repo: string): {
  data: GitHubRepo | null;
  loading: boolean;
  error: Error | null;
}
```

#### Usage

```typescript
import { useGitHubRepo } from '@gabfon/github/hooks';

function RepoInfo({ owner, repo }: { owner: string; repo: string }) {
  const { data: repoData, loading, error } = useGitHubRepo(owner, repo);

  if (loading) return <div>Loading repository...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{repoData?.name}</h1>
      <p>{repoData?.description}</p>
      <p>Language: {repoData?.language}</p>
      <p> {repoData?.stargazers_count}</p>
    </div>
  );
}
```

## Environment Variables

### Required Variables

| Variable | Description | Type | Environment | Required |
|----------|-------------|------|-------------|----------|
| `GITHUB_TOKEN` | GitHub Personal Access Token | string | Server | Optional |
| `NEXT_PUBLIC_GITHUB_TOKEN` | Public GitHub token | string | Client | Optional |

### Environment Validation

```typescript
import { keys } from '@gabfon/github';

// Validates environment variables and returns typed object
const env = keys();
console.log(env.GITHUB_TOKEN);
console.log(env.NEXT_PUBLIC_GITHUB_TOKEN);
```

### Token Scopes

Recommended token scopes for different use cases:

- **Public Data**: No token required (rate limited)
- **User Data**: `user:read` scope
- **Repository Data**: `repo:read` scope
- **Full Access**: `repo`, `user:read`, `admin:org` (use with caution)

## Usage Examples

### Basic Client Usage

```typescript
import { GitHubClient } from '@gabfon/github';

const client = new GitHubClient({
  token: process.env.GITHUB_TOKEN,
});

async function getUserInfo(username: string) {
  try {
    const user = await client.getUser(username);
    const repos = await client.getUserRepos(username);
    
    return {
      user,
      repositories: repos,
      totalStars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}
```

### Server-Side API Route

```typescript
// app/api/github/[username]/route.ts
import { githubClient } from '@gabfon/github';

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const user = await githubClient.getUser(params.username);
    return Response.json(user);
  } catch (error) {
    if (error.message === 'Resource not found') {
      return Response.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### React Component with Hooks

```typescript
// components/GitHubProfile.tsx
import { useGitHubUser, useGitHubRepos } from '@gabfon/github/hooks';

interface GitHubProfileProps {
  username: string;
}

export function GitHubProfile({ username }: GitHubProfileProps) {
  const { data: user, loading: userLoading, error: userError } = useGitHubUser(username);
  const { data: repos, loading: reposLoading, error: reposError } = useGitHubRepos(username);

  if (userLoading || reposLoading) return <div>Loading...</div>;
  if (userError || reposError) return <div>Error loading profile</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="github-profile">
      <div className="user-info">
        <img src={user.avatar_url} alt={user.name || user.login} />
        <h1>{user.name || user.login}</h1>
        <p>{user.bio}</p>
        <div className="stats">
          <span>Followers: {user.followers}</span>
          <span>Following: {user.following}</span>
          <span>Repos: {user.public_repos}</span>
        </div>
      </div>
      
      <div className="repositories">
        <h2>Repositories</h2>
        <div className="repo-grid">
          {repos?.map(repo => (
            <div key={repo.id} className="repo-card">
              <h3>{repo.name}</h3>
              <p>{repo.description}</p>
              <div className="repo-stats">
                <span>Stars: {repo.stargazers_count}</span>
                <span>Forks: {repo.forks_count}</span>
                <span>Issues: {repo.open_issues_count}</span>
              </div>
              {repo.language && <span className="language">{repo.language}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### Error Handling

```typescript
import { GitHubClient } from '@gabfon/github';

const client = new GitHubClient();

async function safeGetUser(username: string) {
  try {
    const user = await client.getUser(username);
    return { success: true, data: user };
  } catch (error) {
    if (error.message === 'Resource not found') {
      return { success: false, error: 'User not found' };
    }
    
    if (error.message === 'Access forbidden - check token permissions') {
      return { success: false, error: 'Access denied - check token' };
    }
    
    if (error.message === 'Rate limit exceeded') {
      return { success: false, error: 'Rate limit exceeded' };
    }
    
    return { success: false, error: 'Unknown error occurred' };
  }
}
```

### Pagination Support

```typescript
import { GitHubClient } from '@gabfon/github';

const client = new GitHubClient();

async function getAllUserRepos(username: string) {
  let page = 1;
  let allRepos: GitHubRepo[] = [];
  let hasMore = true;

  while (hasMore) {
    try {
      const repos = await client.getUserRepos(username);
      
      if (repos.length === 0) {
        hasMore = false;
      } else {
        allRepos = allRepos.concat(repos);
        page++;
      }
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error);
      hasMore = false;
    }
  }

  return allRepos;
}
```

### Custom Client Configuration

```typescript
import { GitHubClient } from '@gabfon/github';

const customClient = new GitHubClient({
  token: process.env.GITHUB_TOKEN,
  baseUrl: 'https://api.github.com',
  userAgent: 'MyApp/1.0 (https://myapp.com)',
});

// Add custom headers
const clientWithHeaders = new GitHubClient({
  token: process.env.GITHUB_TOKEN,
});

// Custom request method
class CustomGitHubClient extends GitHubClient {
  async customRequest(endpoint: string, options?: RequestInit) {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'User-Agent': this.userAgent,
        'Accept': 'application/vnd.github.v3+json',
        ...options?.headers,
      },
    });
    
    return this.handleResponse(response);
  }
}
```

## Advanced Usage

### Caching Implementation

```typescript
// utils/githubCache.ts
import { GitHubClient } from '@gabfon/github';

class CachedGitHubClient extends GitHubClient {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes

  async getUser(username: string): Promise<GitHubUser> {
    const cacheKey = `user:${username}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    const user = await super.getUser(username);
    this.cache.set(cacheKey, { data: user, timestamp: Date.now() });
    
    return user;
  }
}
```

### Rate Limiting

```typescript
// utils/rateLimitedClient.ts
import { GitHubClient } from '@gabfon/github';

class RateLimitedGitHubClient extends GitHubClient {
  private lastRequest = 0;
  private minInterval = 1000; // 1 second between requests

  private async waitForRateLimit() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequest;
    
    if (timeSinceLastRequest < this.minInterval) {
      await new Promise(resolve => 
        setTimeout(resolve, this.minInterval - timeSinceLastRequest)
      );
    }
    
    this.lastRequest = Date.now();
  }

  async getUser(username: string): Promise<GitHubUser> {
    await this.waitForRateLimit();
    return super.getUser(username);
  }
}
```

### Retry Logic

```typescript
// utils/retryClient.ts
import { GitHubClient } from '@gabfon/github';

class RetryGitHubClient extends GitHubClient {
  async getUser(username: string, retries = 3): Promise<GitHubUser> {
    try {
      return await super.getUser(username);
    } catch (error) {
      if (retries > 0 && this.shouldRetry(error)) {
        await this.delay(1000); // Wait 1 second
        return this.getUser(username, retries - 1);
      }
      throw error;
    }
  }

  private shouldRetry(error: Error): boolean {
    return error.message.includes('Rate limit exceeded') ||
           error.message.includes('Network error');
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

## Error Handling

### Error Types

```typescript
// Custom error classes
class GitHubApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'GitHubApiError';
  }
}

class GitHubRateLimitError extends GitHubApiError {
  constructor(public resetTime?: number) {
    super('Rate limit exceeded');
    this.name = 'GitHubRateLimitError';
  }
}

class GitHubNotFoundError extends GitHubApiError {
  constructor(resource: string) {
    super(`${resource} not found`);
    this.name = 'GitHubNotFoundError';
    this.status = 404;
  }
}
```

### Error Handling Pattern

```typescript
async function handleGitHubRequest<T>(
  request: () => Promise<T>
): Promise<{ data?: T; error?: Error }> {
  try {
    const data = await request();
    return { data };
  } catch (error) {
    if (error instanceof GitHubRateLimitError) {
      console.log('Rate limited, retry after:', error.resetTime);
    } else if (error instanceof GitHubNotFoundError) {
      console.log('Resource not found');
    } else {
      console.error('GitHub API error:', error);
    }
    
    return { error: error as Error };
  }
}
```

## Best Practices

### 1. Token Management

```typescript
// Good: Use environment variables
const client = new GitHubClient({
  token: process.env.GITHUB_TOKEN,
});

// Bad: Hardcode tokens
const client = new GitHubClient({
  token: 'ghp_hardcoded_token',
});
```

### 2. Error Handling

```typescript
// Good: Comprehensive error handling
try {
  const user = await client.getUser(username);
  // Process user data
} catch (error) {
  if (error.message === 'Resource not found') {
    // Handle not found
  } else if (error.message === 'Rate limit exceeded') {
    // Handle rate limit
  } else {
    // Handle other errors
  }
}

// Bad: No error handling
const user = await client.getUser(username);
```

### 3. React Hooks

```typescript
// Good: Use provided hooks
const { data, loading, error } = useGitHubUser(username);

// Bad: Manual data fetching in components
const [user, setUser] = useState(null);
useEffect(() => {
  client.getUser(username).then(setUser);
}, [username]);
```

### 4. Type Safety

```typescript
// Good: Use TypeScript types
const user: GitHubUser = await client.getUser(username);

// Bad: Use any
const user: any = await client.getUser(username);
```

## Integration Examples

### With Analytics Package

```typescript
import { githubClient } from '@gabfon/github';
import { analytics } from '@gabfon/analytics/lib/server';

async function getUserWithTracking(username: string) {
  try {
    const user = await githubClient.getUser(username);
    
    analytics.capture('github_user_fetched', {
      username,
      followers: user.followers,
      repos: user.public_repos,
    });
    
    return user;
  } catch (error) {
    analytics.capture('github_api_error', {
      username,
      error: error.message,
    });
    
    throw error;
  }
}
```

### With Design System Package

```typescript
import { useGitHubUser } from '@gabfon/github/hooks';
import { Card, Avatar, Text, Badge } from '@gabfon/design-system';

function GitHubProfileCard({ username }: { username: string }) {
  const { data: user, loading, error } = useGitHubUser(username);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!user) return <div>User not found</div>;

  return (
    <Card>
      <div className="flex items-center space-x-4">
        <Avatar src={user.avatar_url} alt={user.name || user.login} />
        <div>
          <Text variant="h3">{user.name || user.login}</Text>
          <Text variant="muted">{user.bio}</Text>
          <div className="flex space-x-2 mt-2">
            <Badge>{user.followers} followers</Badge>
            <Badge>{user.public_repos} repos</Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}
```

### With Security Package

```typescript
import { githubClient } from '@gabfon/github';
import { secure } from '@gabfon/security';

export async function GET(request: Request) {
  // Protect against bots
  await secure(['CATEGORY:SEARCH_ENGINE'], request);
  
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  
  if (!username) {
    return Response.json({ error: 'Username required' }, { status: 400 });
  }
  
  try {
    const user = await githubClient.getUser(username);
    return Response.json(user);
  } catch (error) {
    return Response.json({ error: 'User not found' }, { status: 404 });
  }
}
```
