import type { ProjectSchema, StatusEnum } from '@/schemas/project-schema';
import type { z } from 'zod';

export type Project = z.infer<typeof ProjectSchema>;
export type Status = z.infer<typeof StatusEnum>;

export type SortBy = 'createdAt' | 'updatedAt' | 'priority';
export type SortOrder = 'asc' | 'desc';

export type ProjectQueryConfig = {
  featured?: boolean;
  prioritized?: boolean;
  all?: boolean;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
};

export type ProjectWhereClause = {
  isFeatured?: boolean;
  priority?: { not: null };
};

export type ProjectOrderClause = {
  [K in SortBy]?: SortOrder;
};
