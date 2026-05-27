import { parseError } from '@gabfon/observability';
import { secure } from '@gabfon/security';
import { noseconeMiddleware, noseconeOptions } from '@gabfon/security/proxy';
import { type NextRequest, NextResponse } from 'next/server';
import { env } from '@/config/env';

const securityHeaders = noseconeMiddleware(noseconeOptions);

// Custom middleware for Arcjet security checks
const arcjetMiddleware = async (request: NextRequest) => {
  if (!env.ARCJET_KEY) {
    return;
  }

  try {
    await secure(
      [
        // See https://docs.arcjet.com/bot-protection/identifying-bots
        'CATEGORY:SEARCH_ENGINE', // Allow search engines
        'CATEGORY:PREVIEW', // Allow preview links to show OG images
        'CATEGORY:MONITOR', // Allow uptime monitoring services
      ],
      request
    );
  } catch (error) {
    const message = parseError(error);
    return NextResponse.json({ error: message }, { status: 403 });
  }
};

export default async function proxy(request: NextRequest) {
  // Run security headers first
  const headersResponse = securityHeaders();

  // Run Arcjet middleware
  const arcjetResponse = await arcjetMiddleware(request);
  if (arcjetResponse) {
    return arcjetResponse;
  }

  // Return headers response
  return headersResponse;
}

export const config = {
  // matcher tells Next.js which routes to run the middleware on. This runs the
  // middleware on all routes except for static assets and Posthog ingest
  matcher: ['/((?!_next/static|_next/image|ingest|favicon.ico).*)'],
};
