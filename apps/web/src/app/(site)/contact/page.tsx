import type { JSX } from 'react';
import { ContactForm } from '@/components/forms/contact-form';

export default function ContactPage(): JSX.Element {
  return (
    <section aria-labelledby="contact-heading" className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="sr-only" id="contact-heading">
          Contact Form
        </h2>
        <p className="text-muted-foreground">
          Have a question or want to work together? Drop me a message below.
        </p>
      </div>

      <ContactForm />
    </section>
  );
}
