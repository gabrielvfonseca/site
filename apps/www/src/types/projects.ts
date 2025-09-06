import type { z } from 'zod';
import type { ProjectsSchema, StatusEnum } from '@/schemas/project-schema';

export type Project = z.infer<typeof ProjectsSchema>;
export type ProjectStatus = z.infer<typeof StatusEnum>;

export type ProjectSortBy = 'createdAt' | 'updatedAt' | 'priority';
export type ProjectSortOrder = 'asc' | 'desc';

export type ProjectQueryConfig = {
  featured?: boolean;
  prioritized?: boolean;
  all?: boolean;
  sortBy?: ProjectSortBy;
  sortOrder?: ProjectSortOrder;
};

export type ProjectWhereClause = {
  isFeatured?: boolean;
  priority?: { not: null };
};

export type ProjectOrderClause = {
  [K in ProjectSortBy]?: ProjectSortOrder;
};
