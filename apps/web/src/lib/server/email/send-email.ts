import { resend } from '@repo/email';

import { env } from '@repo/env';

import { JSX } from 'react';

interface sendEmailProps {
    email: string;
    body: {
        subject: string;
        react: JSX.Element;
    };
};

export const sendEmail = async ({ email, body }: sendEmailProps) => {
    try {
        return await resend.emails.send({
            from: env.RESEND_FROM,
            to: [email],
            subject: body.subject,
            react: body.react,
        });
    } catch (error) {
        return null;
    };
};