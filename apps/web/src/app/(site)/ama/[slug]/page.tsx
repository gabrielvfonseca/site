import { LINK_MUTED_CLASS } from '@gabfon/design-system/lib/constants';
import { createMetadata } from '@gabfon/seo/metadata';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { JSX } from 'react';
import { AmaThread } from '@/components/ama-thread';
import { getThreadBySlug } from '@/lib/ama';

/** Props for the AMA thread page (Next 16 async params). */
interface ThreadPageProps {
  readonly params: Promise<{ slug: string }>;
}

const DESCRIPTION_MAX = 160;

/**
 * Per-thread metadata derived from the question and answer.
 * @param props - The page props.
 * @returns The metadata for the thread page.
 */
export async function generateMetadata({
  params,
}: ThreadPageProps): Promise<Metadata> {
  const { slug } = await params;
  const thread = await getThreadBySlug(slug);

  if (!thread) {
    return createMetadata({
      title: 'AMA | Gabriel Fonseca',
      description: 'Ask me anything.',
    });
  }

  return createMetadata({
    title: `${thread.question} | AMA`,
    description:
      thread.answer.slice(0, DESCRIPTION_MAX) ||
      'Ask me anything. Read the full thread.',
  });
}

/**
 * The AMA thread page (`/ama/[slug]`): explore a single Ask-Me-Anything
 * conversation as a chat thread. Returns a proper 404 when the thread does not
 * exist (or no database is configured).
 * @param props - The page props.
 * @returns The AMA thread page.
 */
export default async function Page({
  params,
}: ThreadPageProps): Promise<JSX.Element> {
  const { slug } = await params;
  const thread = await getThreadBySlug(slug);

  if (!thread) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <Link className={LINK_MUTED_CLASS} href="/ama">
        ← Back to AMA
      </Link>

      <section
        aria-label="AMA conversation"
        className="flex scroll-mt-8 flex-col gap-6"
      >
        <AmaThread thread={thread} />
      </section>
    </div>
  );
}
