'use client';

import { Button } from '@gabfon/design-system/components/button';
import { Input } from '@gabfon/design-system/components/input';
import { Label } from '@gabfon/design-system/components/label';
import { Textarea } from '@gabfon/design-system/components/textarea';
import { toast } from '@gabfon/design-system/components/toaster';
import { type JSX, useActionState, useEffect, useRef } from 'react';
import {
  type ContactState,
  sendContactEmail,
} from '@/app/actions/contact/actions';

const INITIAL_STATE: ContactState = { status: 'idle' };

function FieldError({
  id,
  error,
}: {
  id: string;
  error?: string[];
}): JSX.Element | null {
  if (!error?.length) {
    return null;
  }
  return (
    <p className="text-destructive text-xs" id={id} role="alert">
      {error[0]}
    </p>
  );
}

export function ContactForm(): JSX.Element {
  const [state, formAction, isPending] = useActionState(
    sendContactEmail,
    INITIAL_STATE
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset();
      toast.success(state.message);
    } else if (state.status === 'error' && !state.errors) {
      toast.error(state.message);
    }
  }, [state]);

  const invalid = (field: keyof NonNullable<ContactState['errors']>) =>
    Boolean(state.errors?.[field]);

  return (
    <form action={formAction} className="flex flex-col gap-5" ref={formRef}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          aria-describedby={invalid('name') ? 'name-error' : undefined}
          aria-invalid={invalid('name')}
          autoComplete="name"
          disabled={isPending}
          id="name"
          name="name"
          placeholder="Your name"
          required
        />
        <FieldError error={state.errors?.name} id="name-error" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          aria-describedby={invalid('email') ? 'email-error' : undefined}
          aria-invalid={invalid('email')}
          autoComplete="email"
          disabled={isPending}
          id="email"
          name="email"
          placeholder="you@example.com"
          required
          type="email"
        />
        <FieldError error={state.errors?.email} id="email-error" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          aria-describedby={invalid('message') ? 'message-error' : undefined}
          aria-invalid={invalid('message')}
          disabled={isPending}
          id="message"
          name="message"
          placeholder="What's on your mind?"
          required
          rows={6}
        />
        <FieldError error={state.errors?.message} id="message-error" />
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <Button className="w-full sm:w-auto" disabled={isPending} type="submit">
          {isPending ? 'Sending…' : 'Send message'}
        </Button>
        {state.status === 'success' && (
          <output className="text-muted-foreground text-sm">
            {state.message}
          </output>
        )}
        {state.status === 'error' && !state.errors && (
          <p className="text-destructive text-sm" role="alert">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
