'use server';

import { parseError } from '@gabfon/observability';
import { submitQuestion } from '@/lib/ama';
import { amaSchema } from '@/schemas/ama.schema';

export type AmaState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  errors?: Partial<Record<'question' | 'name' | 'email', string[]>>;
};

/**
 * Server action for the AMA form, shaped for `useActionState`
 * (progressive-enhancement friendly: works without client JS).
 * @param _prevState - The previous form state (unused).
 * @param formData - The submitted form data.
 * @returns The next form state.
 */
export async function askQuestion(
  _prevState: AmaState,
  formData: FormData
): Promise<AmaState> {
  const parsed = amaSchema.safeParse({
    question: formData.get('question'),
    name: formData.get('name') ?? '',
    email: formData.get('email') ?? '',
  });

  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Please fix the highlighted fields.',
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await submitQuestion(parsed.data);
    return {
      status: 'success',
      message: "Thanks. Your question is in. I'll answer it soon.",
    };
  } catch (error) {
    parseError(error);
    return {
      status: 'error',
      message:
        'Something went wrong submitting your question. Please try again later.',
    };
  }
}
