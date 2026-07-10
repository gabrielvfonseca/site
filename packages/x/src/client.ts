import { keys } from './keys';
import type { XApiTweet, XPost } from './types';

/** Base URL for the X (Twitter) API v2. */
const API_BASE = 'https://api.twitter.com/2';
/** How many recent tweets to request before picking the newest original. */
const FETCH_COUNT = 5;

/**
 * Minimal X (Twitter) API v2 client. App-only (Bearer) auth, read-only.
 * Resolves and caches the numeric user id, then reads the latest original
 * post (no retweets or replies).
 */
// biome-ignore lint/style/useNamingConvention: "X" is a single-letter brand name
export class XClient {
  private readonly token: string | undefined;
  private readonly username: string;
  private cachedUserId: string | null = null;

  constructor() {
    const env = keys();
    this.token = env.X_API_BEARER_TOKEN;
    this.username = env.X_USERNAME;
  }

  /** Authenticated GET against the X API, returning parsed JSON. */
  private async get<T>(path: string): Promise<T> {
    if (!this.token) {
      throw new Error('X_API_BEARER_TOKEN is not configured');
    }

    const response = await fetch(`${API_BASE}${path}`, {
      headers: { authorization: `Bearer ${this.token}` },
    });

    if (!response.ok) {
      throw new Error(`X API error: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as T;
  }

  /** Resolve (and memoise) the numeric user id for the configured handle. */
  private async getUserId(): Promise<string> {
    if (this.cachedUserId) {
      return this.cachedUserId;
    }

    const body = await this.get<{ data?: { id: string } }>(
      `/users/by/username/${this.username}`
    );

    if (!body.data?.id) {
      throw new Error(`X user not found: ${this.username}`);
    }

    this.cachedUserId = body.data.id;
    return this.cachedUserId;
  }

  /**
   * Fetch the most recent original post (excluding retweets and replies).
   * @returns The latest {@link XPost}, or `null` if the timeline is empty.
   */
  async getLatestPost(): Promise<XPost | null> {
    const userId = await this.getUserId();
    const body = await this.get<{ data?: XApiTweet[] }>(
      `/users/${userId}/tweets?max_results=${FETCH_COUNT}&exclude=retweets,replies&tweet.fields=created_at,public_metrics`
    );

    const tweet = body.data?.[0];
    if (!tweet) {
      return null;
    }

    return {
      id: tweet.id,
      text: tweet.text,
      createdAt: tweet.created_at ?? '',
      likes: tweet.public_metrics?.like_count ?? 0,
      reposts: tweet.public_metrics?.retweet_count ?? 0,
      replies: tweet.public_metrics?.reply_count ?? 0,
      url: `https://x.com/${this.username}/status/${tweet.id}`,
    };
  }
}

/** Shared singleton X client. */
export const xClient = new XClient();
