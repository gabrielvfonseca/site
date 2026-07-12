import { resolve } from 'node:path';
import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '@/keystatic.config';

export const { POST, GET } = makeRouteHandler({
  config,
  localBaseDirectory: resolve('../..'),
  clientId: process.env.KEYSTATIC_GITHUB_CLIENT_ID,
  clientSecret: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
  secret: process.env.KEYSTATIC_SECRET,
});
