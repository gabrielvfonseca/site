
// Resend
import resend from '@site/resend-config';

// Prisma client
import { prisma } from '@site/prisma-config';

// Email Template
import { Email } from '@emails/new-subscriber';

// Types
type State = 200 | 400 | 401 | 404 | 500;

export interface SubscriptionRequest {
    email: string;
};

export interface SubscriptionResponse {
    email?: string;
    code: State;
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
                code: 400,
                message: 'Email is required',
            };
        };

        // Check if the email exists in the database
        const exists = await prisma.subscriber.findUnique({
            where: { email: email },
        });

        // Check if the email is already subscribed
        const emails = await resend.contacts.list({
            audienceId: process.env.RESEND_AUDIENCE_ID!,
        });  

        // Check if the email is already subscribed
        if (emails.data?.data || exists) {
            return {
                email: email,
                code: 400,
                message: 'Email is already subscribed',
            };
        };

        // Create a new subscriber
        const subscriber = await prisma.subscriber.create({
            data: { email: email },
        });

        // Check if the subscriber was created
        if (!subscriber) {
            // Return an error message
            return { 
                code: 500,
                message: 'Error creating a new subscriber',
            };
        };

        // Create a new subscriber 
        const contact = await resend.contacts.create({
            email: email,
            unsubscribed: false,
            audienceId: process.env.RESEND_AUDIENCE_ID!,
        });
        
        // Check if the contact was created
        if (!contact) {
            // Return an error message
            return { 
                code: 500,
                message: 'Error creating a new contact',
            };
        };
          
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
            code: 200,
            message: 'Promise not to spam you',
        };

    } catch (error) {
        // Return any errors
        return {
            code: 500,
            message: 'Could not create a new subscriber',
        };
    };
};