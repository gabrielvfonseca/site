'use client';

import { Button } from '@gabfon/design-system/components/button';
import { FormField } from '@gabfon/design-system/components/form-field';
import { Input } from '@gabfon/design-system/components/input';
import { Textarea } from '@gabfon/design-system/components/textarea';
import { toast } from '@gabfon/design-system/components/toaster';
import { type JSX, useActionState, useEffect, useRef } from 'react';
import {
  type ContactState,
  sendContactEmail,
} from '@/app/actions/contact/actions';

const INITIAL_STATE: ContactState = { status: 'idle' };

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
      <FormField
        error={state.errors?.name?.[0]}
        id="name"
        label="Name"
        required
      >
        <Input
          aria-invalid={invalid('name')}
          autoComplete="name"
          disabled={isPending}
          name="name"
          placeholder="Your name"
          required
        />
      </FormField>

      <FormField
        error={state.errors?.email?.[0]}
        id="email"
        label="Email"
        required
      >
        <Input
          aria-invalid={invalid('email')}
          autoComplete="email"
          disabled={isPending}
          name="email"
          placeholder="you@example.com"
          required
          type="email"
        />
      </FormField>

      <FormField
        error={state.errors?.message?.[0]}
        id="message"
        label="Message"
        required
      >
        <Textarea
          aria-invalid={invalid('message')}
          disabled={isPending}
          name="message"
          placeholder="What's on your mind?"
          required
          rows={6}
        />
      </FormField>

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
