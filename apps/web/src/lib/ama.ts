import { parseError } from '@gabfon/observability';
import type { AmaFormData } from '@/schemas/ama.schema';

/** A published AMA question/answer pair shown on the `/ama` page. */
export interface PublicAmaEntry {
  id: string;
  slug: string | null;
  question: string;
  answer: string;
  pinned: boolean;
  answeredAt: string | null;
}

/** A single message within an AMA conversation thread. */
export interface AmaThreadMessage {
  id: string;
  role: 'asker' | 'owner';
  body: string;
  createdAt: string | null;
}

/** A full AMA thread: the head question/answer plus follow-up messages. */
export interface AmaThread extends PublicAmaEntry {
  askerName: string | null;
  messages: AmaThreadMessage[];
}

const SLUG_MAX_WORDS = 8;
const SLUG_RANDOM_SUFFIX_LENGTH = 6;
const SLUG_RADIX = 36;

const DIACRITICS_RE = /[̀-ͯ]/g;
const NON_SLUG_CHARS_RE = /[^a-z0-9\s-]/g;
const WHITESPACE_RE = /\s+/;
const DASH_COLLAPSE_RE = /-+/g;

/** Normalize an optional form field: empty/whitespace → `null`. */
function optional(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

/**
 * Build a URL-safe, reasonably unique slug from a question. Keeps the first few
 * words for readability and appends a short random suffix to avoid collisions.
 * @param question - The question text.
 * @returns The generated slug.
 */
export function slugifyQuestion(question: string): string {
  const base = question
    .toLowerCase()
    .normalize('NFKD')
    .replace(DIACRITICS_RE, '')
    .replace(NON_SLUG_CHARS_RE, '')
    .trim()
    .split(WHITESPACE_RE)
    .slice(0, SLUG_MAX_WORDS)
    .join('-')
    .replace(DASH_COLLAPSE_RE, '-');

  const suffix = Math.random()
    .toString(SLUG_RADIX)
    .slice(2, 2 + SLUG_RANDOM_SUFFIX_LENGTH);

  return base ? `${base}-${suffix}` : suffix;
}

/**
 * Fetch published AMA entries (answered + made public), pinned first then newest
 * first. Returns an empty array when the database is not configured or a query
 * fails, so the page always renders.
 * @returns The list of published AMA entries.
 */
export async function getPublishedQuestions(): Promise<PublicAmaEntry[]> {
  try {
    const { getPublishedAmaQuestions } = await import('@gabfon/database');
    const rows = await getPublishedAmaQuestions();
    return rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      question: row.question,
      answer: row.answer ?? '',
      pinned: row.pinned,
      answeredAt: row.answeredAt ? row.answeredAt.toISOString() : null,
    }));
  } catch (error) {
    parseError(error);
    return [];
  }
}

/**
 * Fetch a full published AMA thread by slug, including any follow-up messages.
 * Returns `null` when the thread does not exist or the database is unavailable.
 * @param slug - The thread slug from the URL.
 * @returns The thread, or `null`.
 */
export async function getThreadBySlug(slug: string): Promise<AmaThread | null> {
  try {
    const { getPublishedAmaQuestionBySlug, getAmaThreadMessages } =
      await import('@gabfon/database');
    const head = await getPublishedAmaQuestionBySlug(slug);
    if (!head) {
      return null;
    }
    const messages = await getAmaThreadMessages(head.id);
    return {
      id: head.id,
      slug: head.slug,
      question: head.question,
      answer: head.answer ?? '',
      pinned: head.pinned,
      askerName: head.askerName,
      answeredAt: head.answeredAt ? head.answeredAt.toISOString() : null,
      messages: messages.map((message) => ({
        id: message.id,
        role: message.role,
        body: message.body,
        createdAt: message.createdAt ? message.createdAt.toISOString() : null,
      })),
    };
  } catch (error) {
    parseError(error);
    return null;
  }
}

/**
 * Persist a submitted question (status `pending`) and notify the owner by
 * email. Persistence and notification are best-effort and independent: a
 * missing database still sends the email, and a failed email still persists.
 * @param data - The validated AMA form data.
 * @returns Whether the submission was handled without throwing.
 */
export async function submitQuestion(data: AmaFormData): Promise<boolean> {
  const question = data.question.trim();
  const askerName = optional(data.name);
  const askerEmail = optional(data.email);

  // Persist (best-effort, no-op without a configured database).
  try {
    const { insertAmaQuestion } = await import('@gabfon/database');
    await insertAmaQuestion({
      question,
      slug: slugifyQuestion(question),
      askerName,
      askerEmail,
      status: 'pending',
    });
  } catch (error) {
    parseError(error);
  }

  // Notify the owner (best-effort, mirrors the contact form).
  try {
    const { resend } = await import('@gabfon/email');
    await resend.emails.send({
      from: 'AMA <ama@gabfon.com>',
      to: 'gabriel@frontal.dev',
      subject: 'New AMA question',
      text: `From: ${askerName ?? 'Anonymous'}${
        askerEmail ? ` <${askerEmail}>` : ''
      }\n\nQuestion:\n${question}`,
      ...(askerEmail ? { replyTo: askerEmail } : {}),
    });
  } catch (error) {
    parseError(error);
  }

  return true;
}
