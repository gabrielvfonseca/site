'use server';

import { resend } from '@gabfon/email';
import { parseError } from '@gabfon/observability';
import type { ContactFormData } from '@/schemas/contact.schema';
import { contactSchema } from '@/schemas/contact.schema';

export async function sendContactEmail(data: ContactFormData) {
  const result = contactSchema.safeParse(data);

  if (!result.success) {
    return { error: result.error.flatten().fieldErrors };
  }

  try {
    const { name, email, message } = result.data;

    await resend.emails.send({
      from: 'Contact Form <contact@gabfon.com>',
      to: 'gabriel@frontal.dev',
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email,
    });

    return { success: true };
  } catch (error) {
    parseError(error);
    return { error: 'Failed to send email. Please try again later.' };
  }
}
