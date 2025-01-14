import { resend } from '@repo/email';

import { JSX } from 'react';

interface sendEmailProps {
    from: string;
    to: string;
    body: {
        subject: string;
        react: JSX.Element;
    };
};

export const sendEmail = async ({ from, to, body }: sendEmailProps) => {
    try {
        return await resend.emails.send({
            from: from,
            to: [to],
            subject: body.subject,
            react: body.react,
        });
    } catch (error) {
        return null;
    };
};