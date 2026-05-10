import { env } from '../../../config/env';

/**
 * The GET function for the route.
 * @returns The response for the route.
 */
export function GET(): Response {
  return new Response(env.NEXT_PUBLIC_ATPROTO_DID);
}
