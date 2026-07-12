import { keys } from './keys';
import {
  type GitHubApiResponse,
  GitHubApiResponseSchema,
  type GitHubContributionCalendar,
  GitHubContributionCalendarSchema,
  type GitHubEvent,
  type GitHubRepo,
  type GitHubUser,
} from './types';

/** Guards the "GitHub credentials not configured" warning to once per process. */
let warnedMissingCreds = false;

/** Thrown when the client is used without a configured token (e.g. local dev). */
export class GitHubNotConfiguredError extends Error {
  constructor() {
    super('GitHub credentials not configured (GITHUB_TOKEN is unset)');
    this.name = 'GitHubNotConfiguredError';
  }
}

/**
 * Base GitHub API client with error handling
 */
export class GitHubClient {
  private readonly baseUrl = 'https://api.github.com';
  private readonly token: string;
  private readonly username: string;

  constructor() {
    const env = keys();
    this.token = env.GITHUB_TOKEN;
    this.username = env.GITHUB_USERNAME;
  }

  /**
   * Ensure a token is configured before making a request. When it is absent
   * (common in local dev without credentials), warn once instead of letting
   * every call fail with a noisy 401, and skip the doomed network round-trip.
   * @throws {GitHubNotConfiguredError} When no token is configured.
   */
  private assertConfigured(): void {
    if (!this.token) {
      if (!warnedMissingCreds) {
        warnedMissingCreds = true;
        // biome-ignore lint/suspicious/noConsole: One-time setup warning
        console.warn(
          'GitHub client: GITHUB_TOKEN is not set — GitHub-backed widgets will be skipped.'
        );
      }
      throw new GitHubNotConfiguredError();
    }
  }

  /**
   * Make authenticated request to GitHub API
   */
  private async makeRequest(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<GitHubApiResponse> {
    this.assertConfigured();
    const url = `${this.baseUrl}${endpoint}`;

    const headers = {
      authorization: `Bearer ${this.token}`,
      accept: 'application/vnd.github.v3+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'user-agent': `${this.username}-portfolio`,
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(
          `GitHub API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      const result = GitHubApiResponseSchema.parse({
        data,
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
      }) as GitHubApiResponse;

      return result;
    } catch (error) {
      // Missing-creds is already warned once by assertConfigured; don't spam.
      if (!(error instanceof GitHubNotConfiguredError)) {
        // biome-ignore lint/suspicious/noConsole: Logging API failure is necessary
        console.error(`GitHub API request failed for ${endpoint}:`, error);
      }
      throw error;
    }
  }

  /**
   * Get user information
   */
  async getUser(): Promise<GitHubUser> {
    const response = await this.makeRequest('/user');
    return response.data as GitHubUser;
  }

  /**
   * Get user's public events
   */
  async getUserEvents(perPage = 30): Promise<GitHubEvent[]> {
    const response = await this.makeRequest(
      `/users/${this.username}/events/public?per_page=${perPage}`
    );
    return response.data as GitHubEvent[];
  }

  /**
   * Get user's repositories
   */
  async getUserRepos(perPage = 10, sort = 'updated'): Promise<GitHubRepo[]> {
    const response = await this.makeRequest(
      `/users/${this.username}/repos?per_page=${perPage}&sort=${sort}&type=owner`
    );
    return response.data as GitHubRepo[];
  }

  /**
   * Get repository details
   */
  async getRepo(owner: string, repo: string): Promise<GitHubRepo> {
    const response = await this.makeRequest(`/repos/${owner}/${repo}`);
    return response.data as GitHubRepo;
  }

  /**
   * Get contribution calendar (parsed from GraphQL)
   */
  async getContributionCalendar(): Promise<GitHubContributionCalendar> {
    this.assertConfigured();
    const query = `
      query {
        user(login: "${this.username}") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                firstDay
                days: contributionDays {
                  date
                  contributionCount
                  color
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch(`${this.baseUrl}/graphql`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${this.token}`,
        'content-type': 'application/json',
        'user-agent': `${this.username}-portfolio`,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(
        `GitHub GraphQL error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    // GraphQL returns HTTP 200 even for query errors; surface them clearly
    // instead of letting an undefined access throw a cryptic TypeError.
    if (Array.isArray(data?.errors) && data.errors.length > 0) {
      throw new Error(
        `GitHub GraphQL error: ${data.errors.map((e: { message: string }) => e.message).join('; ')}`
      );
    }

    const calendar =
      data?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) {
      throw new Error(
        `GitHub GraphQL error: no contribution calendar for user "${this.username}"`
      );
    }

    return GitHubContributionCalendarSchema.parse(calendar);
  }

  /**
   * Search repositories
   */
  async searchRepos(query: string, perPage = 10): Promise<GitHubRepo[]> {
    const response = await this.makeRequest(
      `/search/repositories?q=${encodeURIComponent(query)}+user:${this.username}&per_page=${perPage}`
    );
    const searchResult = response.data as { items: GitHubRepo[] };
    return searchResult.items;
  }
}

// Export singleton instance
export const githubClient = new GitHubClient();
