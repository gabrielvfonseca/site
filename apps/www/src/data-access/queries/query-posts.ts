import { database } from '@gabfon/database';
import { PostQueryError } from '@/exceptions/errors';
import type {
  PostIncludeClause,
  PostOrderClause,
  PostQueryConfig,
  PostStatus,
  PostWhereClause,
} from '@/types';

/**
 * Builds the "where" clause for querying posts based on the provided config.
 */
const buildPostWhereClause = (config: PostQueryConfig): PostWhereClause => {
  const clause: PostWhereClause = {};

  if (config.status) {
    clause.status = config.status;
  }

  return clause;
};

/**
 * Builds the "include" clause for querying posts, e.g., whether to include tags.
 */
const buildPostIncludeClause = (config: PostQueryConfig): PostIncludeClause => {
  return {
    tags: config.includeTags ?? true,
  };
};

/**
 * Builds the "order by" clause for querying posts based on the provided config.
 */
const buildPostOrderClause = (config: PostQueryConfig): PostOrderClause => {
  const sortBy = config.sortBy ?? 'createdAt';
  const sortOrder = config.sortOrder ?? 'desc';

  return { [sortBy]: sortOrder } as PostOrderClause;
};

/**
 * Generic function to query posts from the database using the provided configuration.
 * Throws PostQueryError if the query fails.
 */
const queryPostsWithConfig = async (
  config: PostQueryConfig,
  errorMessage: string
) => {
  if (!database) {
    // Return empty array if database is not available
    return [];
  }

  const whereClause = buildPostWhereClause(config);
  const includeClause = buildPostIncludeClause(config);
  const orderClause = buildPostOrderClause(config);

  try {
    return await database.posts.findMany({
      where: whereClause,
      include: includeClause,
      orderBy: orderClause,
    });
  } catch (error) {
    throw new PostQueryError(errorMessage, error);
  }
};

/**
 * Fetches all published posts.
 */
export const queryAllPosts = async (
  config: Omit<PostQueryConfig, 'status'> = {}
) => {
  return await queryPostsWithConfig(
    { ...config, status: 'PUBLISHED' },
    'Failed to fetch published posts'
  );
};

/**
 * Fetches all draft posts.
 */
export const queryAllDraftPosts = async (
  config: Omit<PostQueryConfig, 'status'> = {}
) => {
  return await queryPostsWithConfig(
    { ...config, status: 'DRAFT' },
    'Failed to fetch drafted posts'
  );
};

/**
 * Fetches all archived posts.
 */
export const queryAllArchivedPosts = async (
  config: Omit<PostQueryConfig, 'status'> = {}
) => {
  return await queryPostsWithConfig(
    { ...config, status: 'ARCHIVED' },
    'Failed to fetch archived posts'
  );
};

/**
 * Fetches posts by a specific status.
 */
export const queryPostsByStatus = async (
  status: PostStatus,
  config: Omit<PostQueryConfig, 'status'> = {}
) => {
  const statusMessages: Record<PostStatus, string> = {
    PUBLISHED: 'Failed to fetch published posts',
    DRAFT: 'Failed to fetch drafted posts',
    ARCHIVED: 'Failed to fetch archived posts',
  };

  return await queryPostsWithConfig(
    { ...config, status },
    statusMessages[status]
  );
};
