import { ProjectQueryError } from '@/exceptions/errors';
import type {
  ProjectOrderClause,
  ProjectQueryConfig,
  ProjectWhereClause,
} from '@/types';
import { database } from '@gabfon/database';

/**
 * Builds the "where" clause for querying projects based on the provided config.
 */
const buildWhereClause = (config: ProjectQueryConfig): ProjectWhereClause => {
  const clause: ProjectWhereClause = {};

  if (config.featured) {
    clause.isFeatured = true;
  }

  if (config.prioritized) {
    clause.priority = { not: null };
  }

  return clause;
};

/**
 * Builds the "order by" clause for querying projects based on the provided config.
 */
const buildOrderClause = (config: ProjectQueryConfig): ProjectOrderClause => {
  if (config.prioritized) {
    return { priority: 'asc' };
  }

  const sortBy = config.sortBy ?? 'createdAt';
  const sortOrder = config.sortOrder ?? 'desc';

  return { [sortBy]: sortOrder } as ProjectOrderClause;
};

/**
 * Queries projects from the database using the provided configuration.
 * Returns an array of projects, including their tags.
 * Throws ProjectQueryError if the query fails.
 */
export const queryAllProjects = async (config: ProjectQueryConfig = {}) => {
  const whereClause = buildWhereClause(config);
  const orderClause = buildOrderClause(config);

  try {
    const projects = await database.projects.findMany({
      where: config.all ? undefined : whereClause,
      orderBy: orderClause,
      include: {
        tags: true,
      },
    });

    return projects;
  } catch (error) {
    throw new ProjectQueryError('Failed to fetch projects', error);
  }
};
