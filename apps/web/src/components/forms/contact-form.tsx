'use client';

import { Button } from '@gabfon/design-system/components/button';
import { Input } from '@gabfon/design-system/components/input';
import { Label } from '@gabfon/design-system/components/label';
import { Textarea } from '@gabfon/design-system/components/textarea';
import { toast } from '@gabfon/design-system/components/toaster';
import { useTransition } from 'react';
import { sendContactEmail } from '@/actions/contact.actions';

export function ContactForm() {
  const [isPending, startTransition] = useTransition();

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
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          disabled={isPending}
          id="name"
          name="name"
          placeholder="John Doe"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          disabled={isPending}
          id="email"
          name="email"
          placeholder="john@example.com"
          required
          type="email"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          disabled={isPending}
          id="message"
          name="message"
          placeholder="What's on your mind?"
          required
          rows={6}
        />
      </div>

      <Button className="w-full sm:w-max" disabled={isPending} type="submit">
        {isPending ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
