import 'server-only'; // Ensure this is server-side only

import { PrismaClient } from '../generated/client';
import { keys } from './keys';

const globalForPrisma = global as unknown as { prisma: PrismaClient | null };

// Use standard Prisma client with Neon connection string
// The Neon connection string works with standard Prisma client
export const database =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: keys().DATABASE_URL,
      },
    },
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production' && database) {
  globalForPrisma.prisma = database;
}

export * from '../generated/client';
