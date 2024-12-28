import { resend } from '@repo/email';

import { env } from '@repo/env';

export const deleteContact = async ({ email }: { email: string }) => {
    try {        
        return await resend.contacts.remove({
            email: email,
            audienceId: env.RESEND_AUDIENCE_ID,
        });
    } catch (error) {
        return null;
    };
};