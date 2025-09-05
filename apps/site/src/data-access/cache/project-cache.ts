import { unstable_cache } from 'next/cache';
import { CACHE_DURATIONS, CACHE_TAGS } from '@/constants/cache';
import { queryAllProjects } from '@/data-access/queries/query-projects';
import type { ProjectQueryConfig } from '@/types';

/*
 * Cached wrapper for queryAllProjects with featured filter
 */
export const getCachedFeaturedProjects = unstable_cache(
  async (config: Omit<ProjectQueryConfig, 'featured'> = {}) => {
    return await queryAllProjects({ ...config, featured: true });
  },
  ['featured-projects'],
  {
    revalidate: CACHE_DURATIONS.FEATURED,
    tags: [CACHE_TAGS.PROJECTS, CACHE_TAGS.FEATURED_PROJECTS],
  }
);

/*
 * Cached wrapper for queryAllProjects with prioritized filter
 */
export const getCachedPrioritizedProjects = unstable_cache(
  async (config: Omit<ProjectQueryConfig, 'prioritized'> = {}) => {
    return await queryAllProjects({ ...config, prioritized: true });
  },
  ['prioritized-projects'],
  {
    revalidate: CACHE_DURATIONS.PRIORITIZED,
    tags: [CACHE_TAGS.PROJECTS, CACHE_TAGS.PRIORITIZED_PROJECTS],
  }
);

/*
 * Cached wrapper for queryAllProjects (all projects)
 */
export const getCachedAllProjects = unstable_cache(
  async (config: Omit<ProjectQueryConfig, 'all'> = {}) => {
    return await queryAllProjects({ ...config, all: true });
  },
  ['all-projects'],
  {
    revalidate: CACHE_DURATIONS.ALL_PROJECTS,
    tags: [CACHE_TAGS.PROJECTS, CACHE_TAGS.ALL_PROJECTS],
  }
);

/*
 * Generic cached wrapper for queryAllProjects with full configuration
 */
export const getCachedProjectsWithConfig = unstable_cache(
  async (config: ProjectQueryConfig = {}) => {
    return await queryAllProjects(config);
  },
  ['projects-with-config'],
  {
    revalidate: CACHE_DURATIONS.PROJECTS, // Default project duration
    tags: [CACHE_TAGS.PROJECTS],
  }
);

/*
 * Dynamic cached wrapper based on filter type
 */
export const getCachedProjectsByFilter = (
  filterType: 'featured' | 'prioritized' | 'all'
) => {
  const cacheConfig = {
    featured: {
      revalidate: CACHE_DURATIONS.FEATURED,
      tags: [CACHE_TAGS.PROJECTS, CACHE_TAGS.FEATURED_PROJECTS],
    },
    prioritized: {
      revalidate: CACHE_DURATIONS.PRIORITIZED,
      tags: [CACHE_TAGS.PROJECTS, CACHE_TAGS.PRIORITIZED_PROJECTS],
    },
    all: {
      revalidate: CACHE_DURATIONS.ALL_PROJECTS,
      tags: [CACHE_TAGS.PROJECTS, CACHE_TAGS.ALL_PROJECTS],
    },
  };

  return unstable_cache(
    async (config: Partial<ProjectQueryConfig> = {}) => {
      const filterConfig = {
        ...config,
        [filterType]: true,
      };
      return await queryAllProjects(filterConfig);
    },
    [`projects-${filterType}`],
    cacheConfig[filterType]
  );
};

/*
 * Cached wrapper for projects sorted by specific criteria
 */
export const getCachedProjectsSortedBy = (
  sortBy: 'createdAt' | 'updatedAt' | 'priority',
  sortOrder: 'asc' | 'desc' = 'desc'
) => {
  return unstable_cache(
    async (config: Omit<ProjectQueryConfig, 'sortBy' | 'sortOrder'> = {}) => {
      return await queryAllProjects({ ...config, sortBy, sortOrder });
    },
    [`projects-sorted-${sortBy}-${sortOrder}`],
    {
      revalidate: CACHE_DURATIONS.PROJECTS,
      tags: [CACHE_TAGS.PROJECTS],
    }
  );
};

// Convenience functions that maintain clean API with caching
export const getFeaturedProjects = getCachedFeaturedProjects;
export const getPrioritizedProjects = getCachedPrioritizedProjects;
export const getAllProjects = getCachedAllProjects;
export const getProjectsWithConfig = getCachedProjectsWithConfig;

// Specialized convenience functions
export const getRecentProjects = getCachedProjectsSortedBy('createdAt', 'desc');
export const getRecentlyUpdatedProjects = getCachedProjectsSortedBy(
  'updatedAt',
  'desc'
);
export const getProjectsByPriority = getCachedProjectsSortedBy(
  'priority',
  'asc'
);

// Cache invalidation utilities
export const invalidateProjectsCache = {
  all: () => [CACHE_TAGS.PROJECTS],
  featured: () => [CACHE_TAGS.FEATURED_PROJECTS],
  prioritized: () => [CACHE_TAGS.PRIORITIZED_PROJECTS],
  allProjects: () => [CACHE_TAGS.ALL_PROJECTS],
  byFilter: (filterType: 'featured' | 'prioritized' | 'all') => {
    const tagMap = {
      featured: CACHE_TAGS.FEATURED_PROJECTS,
      prioritized: CACHE_TAGS.PRIORITIZED_PROJECTS,
      all: CACHE_TAGS.ALL_PROJECTS,
    };
    return [tagMap[filterType]];
  },
  bySort: (sortBy: string, sortOrder: string) => {
    return [`projects-sorted-${sortBy}-${sortOrder}`];
  },
};
