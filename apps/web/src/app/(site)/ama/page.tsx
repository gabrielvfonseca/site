import { createMetadata } from '@gabfon/seo/metadata';
import type { Metadata } from 'next';
import { type JSX, Suspense } from 'react';
import { AmaList } from '@/components/ama-list';
import { AmaForm } from '@/components/forms/ama-form';
import { getPublishedQuestions } from '@/lib/ama';

/**
 * The metadata for the AMA page.
 * @returns The metadata for the AMA page.
 */
export const metadata: Metadata = createMetadata({
  title: 'AMA | Gabriel Fonseca',
  description:
    'Ask me anything about building products, engineering, startups, or life in Lisbon. Read past answers or submit your own question.',
});

/**
 * Loading placeholder for the answered-questions list while it streams in.
 * @returns The AMA answers skeleton.
 */
function AmaListSkeleton(): JSX.Element {
  return (
    <ul aria-hidden className="flex animate-pulse flex-col gap-6">
      {['a', 'b', 'c'].map((key) => (
        <li className="flex flex-col gap-1.5" key={key}>
          <div className="h-4 w-2/3 rounded bg-muted" />
          <div className="h-3 w-full rounded bg-muted" />
          <div className="h-3 w-4/5 rounded bg-muted" />
        </li>
      ))}
    </ul>
  );
}

/**
 * Fetches published AMA answers and renders them. Isolated in its own async
 * component so the surrounding page shell can render immediately while this
 * streams, keeping the data request-time dynamic (reflecting the live
 * database) instead of frozen into the build-time static output.
 * @returns The rendered list of published answers.
 */
async function AnsweredQuestions(): Promise<JSX.Element> {
  const questions = await getPublishedQuestions();
  return <AmaList items={questions} />;
}

/**
 * The AMA (Ask Me Anything) page: an intro, the list of published answers, and
 * a submission form. The answers stream in behind a Suspense boundary so the
 * page shell always loads instantly and degrades gracefully when no database is
 * configured.
 * @returns The AMA page for the site.
 */
export default function Page(): JSX.Element {
  return (
    <div className="flex flex-col gap-12">
      <section
        aria-labelledby="ama-intro-heading"
        className="flex scroll-mt-8 flex-col gap-4"
      >
        <h1 className="font-semibold text-lg" id="ama-intro-heading">
          Ask me anything
        </h1>
        <p className="text-muted-foreground">
          Curious about something like building products, engineering, startups,
          or life in Lisbon? Ask away. I answer the good ones publicly below.
        </p>
      </section>

      <section
        aria-labelledby="ama-answers-heading"
        className="flex scroll-mt-8 flex-col gap-4"
      >
        <h2 className="font-semibold text-lg" id="ama-answers-heading">
          Answered
        </h2>
        <Suspense fallback={<AmaListSkeleton />}>
          <AnsweredQuestions />
        </Suspense>
      </section>

      <section
        aria-labelledby="ama-ask-heading"
        className="flex scroll-mt-8 flex-col gap-4"
      >
        <h2 className="font-semibold text-lg" id="ama-ask-heading">
          Ask a question
        </h2>
        <AmaForm />
      </section>
    </div>
  );
}
