
// Resend
import resend from '@site/resend-config';

// Dotenv
import * as dotenv from 'dotenv';

// Import node-fetch
dotenv.config();

// Email Template
import { Email } from '@emails/new-subscriber';

// Create a new subscription
export async function subscription (email: string) {
    try {
        // Check if the email is already subscribed
        const emails = await resend.contacts.list({
            audienceId: process.env.RESEND_AUDIENCE_ID!,
        });        
        
        // Error handling
        if (emails.error) {
            // Return an error message
            return 'error';
        };

        // Check if the email is already subscribed
        if (emails.data?.data) {
            const subscriber = emails.data?.data.find((subscriber: any) => subscriber.email === email);

            // Return already subscribed enum
            if (subscriber) {
                return 'already_subscribed';
            };
        };

        // Create a new subscriber 
        await resend.contacts.create({
            email: email,
            unsubscribed: false,
            audienceId: process.env.RESEND_AUDIENCE_ID!,
        });

        // Create audience
        await resend.audiences.create({ name: 'Registered Users' });
          
        // Send a confirmation email using the resend api
        await resend.emails.send({
            from: process.env.RESEND_ORIGIN_EMAIL!,
            to: [email],
            subject: 'Hello world',
            
            react: Email(email),
            text: 'Hello world', // Add the text property
        });

        // Return the new subscriber message
        return 'success';

    } catch (error) {
        // Return any errors
        return error;
    };
};