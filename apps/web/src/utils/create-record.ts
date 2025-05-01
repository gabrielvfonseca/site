'use server';

import { resend } from '@repo/email';

import { SubscriberTemplate } from '@repo/email/templates/subscriber';

import { createContact } from '@/lib/server/email/contacts/create-contact';

import { sendEmail } from '@/lib/server/email/send-email';

import { env } from '@repo/env';

export const createRecord = async ({ email }: {
    email: string;
}): Promise<{
    email?: string;
    code: 200 | 400 | 401 | 404 | 500;
    message?: string;
}> => {
    try {
        if (!email) {
            return Promise.resolve({ 
                code: 400,
                message: 'Email is required',
            });
        };

        const emails = await resend.contacts.list({
            audienceId: env.RESEND_AUDIENCE_ID!,
        });  

        if (emails.data?.data) {
            return {
                email: email,
                code: 400,
                message: 'Email is already subscribed',
            };
        };

        const contact = await createContact({ email: email });
        
        if (!contact) {
            return { 
                code: 500,
                message: 'Error creating a new contact',
            };
        };

        sendEmail({
            from: `Gabriel <${env.RESEND_FROM}>`,
            to: email,
            body: {
                subject: 'Welcome to my newsletter!',
                react: SubscriberTemplate(),
            }
        });

        return {
            email: email,
            code: 200,
            message: 'Promise not to spam you',
        };

    } catch (error) {
        return {
            code: 500,
            message: 'Could not create a new subscriber',
        };
    };
};