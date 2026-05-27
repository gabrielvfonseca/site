'use client';

import { Button } from '@gabfon/design-system/components/button';
import { Input } from '@gabfon/design-system/components/input';
import { Label } from '@gabfon/design-system/components/label';
import { Textarea } from '@gabfon/design-system/components/textarea';
import { toast } from '@gabfon/design-system/components/toaster';
import { useRef, useTransition } from 'react';
import { sendContactEmail } from '@/actions/contact.actions';

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    startTransition(async () => {
      const result = await sendContactEmail(data);

      if (result.success) {
        toast.success("Thank you for reaching out. I'll get back to you soon.");
        (event.target as HTMLFormElement).reset();
      } else if (result.error) {
        const errorMessage =
          typeof result.error === 'string'
            ? result.error
            : 'Please check the form for errors.';
        toast.error(errorMessage);
      }
    });
  };

  return (
    <form
      aria-label="Contact form"
      className="flex flex-col gap-6"
      noValidate
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          aria-describedby="name-error"
          aria-required="true"
          disabled={isPending}
          id="name"
          name="name"
          placeholder="John Doe"
          required
        />
        <div className="sr-only" id="name-error" role="alert" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          aria-describedby="email-error"
          aria-required="true"
          disabled={isPending}
          id="email"
          name="email"
          placeholder="john@example.com"
          required
          type="email"
        />
        <div className="sr-only" id="email-error" role="alert" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          aria-describedby="message-error"
          aria-required="true"
          disabled={isPending}
          id="message"
          name="message"
          placeholder="What's on your mind?"
          required
          rows={6}
        />
        <div className="sr-only" id="message-error" role="alert" />
      </div>

      <Button
        aria-busy={isPending}
        className="w-full sm:w-max"
        disabled={isPending}
        type="submit"
      >
        {isPending ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
