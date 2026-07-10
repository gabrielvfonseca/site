import { type NextRequest, NextResponse } from 'next/server';
import { getPublishedQuestions, submitQuestion } from '@/lib/ama';
import { checkRateLimit, rateLimitHeaders } from '@/lib/rate-limit';
import { amaSchema } from '@/schemas/ama.schema';

/**
 * GET /api/ama
 *
 * Returns published AMA question/answer pairs (newest first). Degrades to an
 * empty list when no database is configured, so the endpoint always responds.
 */
export async function GET(request: NextRequest) {
  const limit = await checkRateLimit(request, {
    prefix: 'gabfon:ama',
    requests: 60,
    window: '60 s',
  });
  if (limit && !limit.success) {
    return NextResponse.json(
      { error: 'Too many requests.' },
      { status: 429, headers: rateLimitHeaders(limit) }
    );
  }

  const questions = await getPublishedQuestions();

  return NextResponse.json(
    { questions },
    { headers: { 'Cache-Control': 'public, max-age=300, s-maxage=300' } }
  );
}

/**
 * POST /api/ama
 *
 * Accepts a question submission as JSON (`{ question, name?, email? }`),
 * persists it as pending, and notifies the owner. Rate-limited more tightly
 * than reads to deter spam.
 */
export async function POST(request: NextRequest) {
  const limit = await checkRateLimit(request, {
    prefix: 'gabfon:ama:submit',
    requests: 5,
    window: '60 s',
  });
  if (limit && !limit.success) {
    return NextResponse.json(
      { error: 'Too many requests.' },
      { status: 429, headers: rateLimitHeaders(limit) }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const parsed = amaSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Validation failed.',
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  await submitQuestion(parsed.data);

  return NextResponse.json({ ok: true }, { status: 201 });
}
