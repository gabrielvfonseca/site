'use client';

import { Button } from '@gabfon/design-system/components/button';
import { FormField } from '@gabfon/design-system/components/form-field';
import { Input } from '@gabfon/design-system/components/input';
import { Textarea } from '@gabfon/design-system/components/textarea';
import { toast } from '@gabfon/design-system/components/toaster';
import { type JSX, useActionState, useEffect, useRef } from 'react';
import { type AmaState, askQuestion } from '@/app/actions/ama/actions';

const INITIAL_STATE: AmaState = { status: 'idle' };

/**
 * The AMA submission form. Progressive-enhancement friendly (`useActionState`
 * over a server action) with inline validation errors and a success toast.
 * @returns The AmaForm for the site.
 */
export function AmaForm(): JSX.Element {
  const [state, formAction, isPending] = useActionState(
    askQuestion,
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

  const invalid = (field: keyof NonNullable<AmaState['errors']>) =>
    Boolean(state.errors?.[field]);

  return (
    <form action={formAction} className="flex flex-col gap-5" ref={formRef}>
      <FormField
        error={state.errors?.question?.[0]}
        id="question"
        label="Your question"
        required
      >
        <Textarea
          aria-invalid={invalid('question')}
          disabled={isPending}
          name="question"
          placeholder="Ask me anything…"
          required
          rows={4}
        />
      </FormField>

      <div className="flex flex-col gap-5">
        <FormField
          error={state.errors?.name?.[0]}
          id="ama-name"
          label="Name (optional)"
        >
          <Input
            aria-invalid={invalid('name')}
            autoComplete="name"
            disabled={isPending}
            name="name"
            placeholder="Your name"
          />
        </FormField>

        <FormField
          error={state.errors?.email?.[0]}
          id="ama-email"
          label="Email (optional)"
        >
          <Input
            aria-invalid={invalid('email')}
            autoComplete="email"
            disabled={isPending}
            name="email"
            placeholder="you@example.com"
            type="email"
          />
        </FormField>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <Button className="w-full sm:w-auto" disabled={isPending} type="submit">
          {isPending ? 'Sending…' : 'Ask question'}
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
