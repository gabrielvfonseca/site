// biome-ignore-all lint/style/useNamingConvention: types mirror the X API JSON shape and the single-letter "X" brand name

/**
 * A single X (Twitter) post, normalised for display.
 */
export interface XPost {
  /** Tweet id. */
  readonly id: string;
  /** Post body text. */
  readonly text: string;
  /** ISO 8601 creation timestamp. */
  readonly createdAt: string;
  /** Like count. */
  readonly likes: number;
  /** Repost (retweet) count. */
  readonly reposts: number;
  /** Reply count. */
  readonly replies: number;
  /** Canonical `x.com` URL for the post. */
  readonly url: string;
}

/** Raw `public_metrics` object returned by the X API v2. */
export interface XPublicMetrics {
  readonly retweet_count: number;
  readonly reply_count: number;
  readonly like_count: number;
  readonly quote_count?: number;
}

/** Raw tweet object (subset) returned by the X API v2. */
export interface XApiTweet {
  readonly id: string;
  readonly text: string;
  readonly created_at?: string;
  readonly public_metrics?: XPublicMetrics;
}
