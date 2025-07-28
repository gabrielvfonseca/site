import type { PostSchema, StatusEnum } from '@/schemas/post-schema';
import type { z } from 'zod';

export type Post = z.infer<typeof PostSchema>;

export type Status = z.infer<typeof StatusEnum>;

export type PostQueryConfig = {
  status?: Status;
  includeTags?: boolean;
  sortBy?: 'createdAt' | 'updatedAt' | 'publishedAt';
  sortOrder?: 'asc' | 'desc';
};

export type PostWhereClause = {
  status?: Status;
};

export type PostIncludeClause = {
  tags?: boolean;
};

export type PostOrderClause = {
  createdAt?: 'asc' | 'desc';
  updatedAt?: 'asc' | 'desc';
  publishedAt?: 'asc' | 'desc';
};
