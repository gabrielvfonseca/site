import { resend } from '@repo/email';

import { env } from '@repo/env';

export const createContact = async ({ email }: { email: string }) => {
    try {
        return await resend.contacts.create({
            email: email,
            unsubscribed: false,
            audienceId: env.RESEND_AUDIENCE_ID,
        });
    } catch (error) {
        return null;
    };
};