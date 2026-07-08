'use server';

import { parseError } from '@gabfon/observability';
import { contactSchema } from '@/schemas/contact.schema';

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  errors?: Partial<Record<'name' | 'email' | 'message', string[]>>;
};

/**
 * Server action for the contact form, shaped for `useActionState`
 * (progressive-enhancement friendly: works without client JS).
 * @param _prevState - The previous form state (unused).
 * @param formData - The submitted form data.
 * @returns The next form state.
 */
export async function sendContactEmail(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Please fix the highlighted fields.',
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    // Imported lazily so the mail client is only constructed when a valid
    // submission is actually sent (keeps validation working without creds).
    const { resend } = await import('@gabfon/email');
    const { name, email, message } = parsed.data;

    await resend.emails.send({
      from: 'Contact Form <contact@gabfon.com>',
      to: 'gabriel@frontal.dev',
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email,
    });

    return {
      status: 'success',
      message: "Thanks for reaching out — I'll get back to you soon.",
    };
  } catch (error) {
    parseError(error);
    return {
      status: 'error',
      message:
        'Something went wrong sending your message. Please try again later.',
    };
  }
}
