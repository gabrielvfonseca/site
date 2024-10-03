
// Resend
import resend from '@site/resend-config';

// Prisma client
import { prisma } from '@site/prisma-config';

// Email Template
import { Email } from '@emails/new-subscriber';

// Types
type State = 'success' | 'already_subscribed' | 'error';

export interface SubscriptionRequest {
    email: string;
};

export interface SubscriptionResponse {
    email?: string;
    state: State;
    message?: string;
};

// Create a new subscription
export async function subscription ({ 
    email 
}: SubscriptionRequest): Promise<SubscriptionResponse> {
    try {
        // Checks if the email is empty
        if (!email) {
            // Return an error message
            return { 
                state: 'error',
                message: 'Email is required',
            };
        };

        // Check if the email exists in the database
        const existing = await prisma.subscriber.findUnique({
            where: { email: email },
        });

        // If the email does exist, create a new subscriber
        if (!existing) {
            // Create a new subscriber
            const subscriber = await prisma.subscriber.create({
                data: { email: email },
            });

            console.log(subscriber);

            // Check if the subscriber was created
            if (!subscriber) {
                // Return an error message
                return { 
                    state: 'error',
                    message: 'Could not create a new subscriber',
                };
            };
        };

        // Check if the email is already subscribed
        const emails = await resend.contacts.list({
            audienceId: process.env.RESEND_AUDIENCE_ID!,
        });        
        
        // Error handling
        if (emails.error) {
            // Return an error message
            return {
                state: 'error',
                message: 'Could not list subscribers',
            }
        };

        // Check if the email is already subscribed
        if (emails.data?.data) {
            const subscriber = emails.data?.data.find((subscriber: any) => subscriber.email === email);

            // Return already subscribed enum
            if (subscriber) {
                return {
                    email: email,
                    state: 'already_subscribed',
                    message: 'Email is already subscribed',
                };
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
        return {
            email: email,
            state: 'success',
            message: 'Promise not to spam you',
        };

    } catch (error) {
        // Return any errors
        return {
            state: 'error',
            message: 'Could not create a new subscriber',
        };
    };
};