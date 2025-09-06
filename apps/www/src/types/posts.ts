import type { z } from 'zod';
import type { PostSchema, StatusEnum } from '@/schemas/post-schema';

export type Post = z.infer<typeof PostSchema>;

export type PostStatus = z.infer<typeof StatusEnum>;

export type PostQueryConfig = {
  status?: PostStatus;
  includeTags?: boolean;
  sortBy?: 'createdAt' | 'updatedAt' | 'publishedAt';
  sortOrder?: 'asc' | 'desc';
};

export type PostWhereClause = {
  status?: PostStatus;
};

export type PostIncludeClause = {
  tags?: boolean;
};

export type PostOrderClause = {
  createdAt?: 'asc' | 'desc';
  updatedAt?: 'asc' | 'desc';
  publishedAt?: 'asc' | 'desc';
};
