import { createMetadata } from '@gabfon/seo/metadata';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { JSX } from 'react';
import { ContactForm } from '@/components/forms/contact-form';
import { CONFIG } from '@/constants/config';

/**
 * The metadata for the contact page.
 * @returns The metadata for the contact page.
 */
export const metadata: Metadata = createMetadata({
  title: 'Contact | Gabriel Fonseca',
  description:
    'Get in touch with Gabriel Fonseca - Software Developer, Founder, and Computer Engineering student.',
});

const LINK_CLASS =
  'rounded text-foreground underline decoration-[0.5px] decoration-muted-foreground/30 underline-offset-4 transition-colors duration-200 hover:decoration-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';

const Page = (): JSX.Element => {
  return (
    <section aria-labelledby="contact-heading" className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h1
          className="font-semibold text-2xl tracking-tight"
          id="contact-heading"
        >
          Get in touch
        </h1>
        <p className="max-w-prose text-muted-foreground">
          Have a question, a project in mind, or just want to say hi? Send a
          message below and I&apos;ll get back to you.
        </p>
      </div>

      <ContactForm />

      <p className="border-border border-t pt-6 text-muted-foreground/75 text-sm">
        Prefer another way?{' '}
        <Link
          className={LINK_CLASS}
          href={CONFIG.email}
          rel="noopener noreferrer"
          target="_blank"
        >
          Email me directly
        </Link>{' '}
        or{' '}
        <Link
          className={LINK_CLASS}
          href={CONFIG.schedule}
          rel="noopener noreferrer"
          target="_blank"
        >
          schedule a call
        </Link>
        .
      </p>
    </section>
  );
};

export default Page;
