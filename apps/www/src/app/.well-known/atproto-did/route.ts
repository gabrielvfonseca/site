import { env } from '../../../env';

export const runtime = 'edge';

/**
 * The GET function for the route.
 * @returns The response for the route.
 */
export default function GET(): Response {
  return new Response(env.NEXT_PUBLIC_ATPROTO_DID);
}
