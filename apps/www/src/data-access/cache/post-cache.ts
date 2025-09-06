import { unstable_cache } from 'next/cache';
import { CACHE_DURATIONS, CACHE_TAGS } from '@/constants/cache';
import {
  queryAllArchivedPosts,
  queryAllDraftPosts,
  queryAllPosts,
  queryPostsByStatus,
} from '@/data-access/queries/query-posts';
import type { PostQueryConfig, PostStatus } from '@/types';

/*
 * Cached wrapper for queryAllPosts (published posts)
 */
export const getCachedPublishedPosts = unstable_cache(
  async (config: Omit<PostQueryConfig, 'status'> = {}) => {
    return await queryAllPosts(config);
  },
  ['published-posts'],
  {
    revalidate: CACHE_DURATIONS.PUBLISHED,
    tags: [CACHE_TAGS.POSTS, CACHE_TAGS.PUBLISHED_POSTS],
  }
);

/*
 * Cached wrapper for queryAllDraftPosts
 */
export const getCachedDraftPosts = unstable_cache(
  async (config: Omit<PostQueryConfig, 'status'> = {}) => {
    return await queryAllDraftPosts(config);
  },
  ['draft-posts'],
  {
    revalidate: CACHE_DURATIONS.DRAFT,
    tags: [CACHE_TAGS.POSTS, CACHE_TAGS.DRAFT_POSTS],
  }
);

/*
 * Cached wrapper for queryAllArchivedPosts
 */
export const getCachedArchivedPosts = unstable_cache(
  async (config: Omit<PostQueryConfig, 'status'> = {}) => {
    return await queryAllArchivedPosts(config);
  },
  ['archived-posts'],
  {
    revalidate: CACHE_DURATIONS.ARCHIVED,
    tags: [CACHE_TAGS.POSTS, CACHE_TAGS.ARCHIVED_POSTS],
  }
);

/**
 * Returns a cached query function for posts by status.
 * @param status - The post status ('PUBLISHED', 'DRAFT', 'ARCHIVED')
 */
export const getCachedPostsByStatus = (status: PostStatus) => {
  const cacheConfig = {
    PUBLISHED: {
      revalidate: CACHE_DURATIONS.PUBLISHED,
      tags: [CACHE_TAGS.POSTS, CACHE_TAGS.PUBLISHED_POSTS],
    },
    DRAFT: {
      revalidate: CACHE_DURATIONS.DRAFT,
      tags: [CACHE_TAGS.POSTS, CACHE_TAGS.DRAFT_POSTS],
    },
    ARCHIVED: {
      revalidate: CACHE_DURATIONS.ARCHIVED,
      tags: [CACHE_TAGS.POSTS, CACHE_TAGS.ARCHIVED_POSTS],
    },
  };

  return unstable_cache(
    async (config: Omit<PostQueryConfig, 'status'> = {}) => {
      return await queryPostsByStatus(status, config);
    },
    [`posts-${status.toLowerCase()}`],
    cacheConfig[status]
  );
};

/**
 * Generic cached query for posts by status and config.
 * Uses published duration and generic posts tag by default.
 */
export const getCachedPostsWithConfig = unstable_cache(
  async (status: PostStatus, config: Omit<PostQueryConfig, 'status'> = {}) => {
    return await queryPostsByStatus(status, config);
  },
  ['posts-with-config'],
  {
    revalidate: CACHE_DURATIONS.PUBLISHED, // Default to published duration
    tags: [CACHE_TAGS.POSTS],
  }
);

// Convenience aliases for original API compatibility
export const getAllPosts = getCachedPublishedPosts;
export const getAllDraftPosts = getCachedDraftPosts;
export const getAllArchivedPosts = getCachedArchivedPosts;

/**
 * Cache invalidation utilities for posts.
 * Returns arrays of cache tags to be used for invalidation.
 */
export const invalidatePostsCache = {
  all: () => [CACHE_TAGS.POSTS],
  published: () => [CACHE_TAGS.PUBLISHED_POSTS],
  drafts: () => [CACHE_TAGS.DRAFT_POSTS],
  archived: () => [CACHE_TAGS.ARCHIVED_POSTS],
  byStatus: (status: PostStatus) => {
    const tagMap: Record<PostStatus, string> = {
      PUBLISHED: CACHE_TAGS.PUBLISHED_POSTS,
      DRAFT: CACHE_TAGS.DRAFT_POSTS,
      ARCHIVED: CACHE_TAGS.ARCHIVED_POSTS,
    };
    return [tagMap[status]];
  },
};
