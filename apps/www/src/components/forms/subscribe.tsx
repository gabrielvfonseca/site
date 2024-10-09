'use client';

import React, { useState, useRef } from 'react';

// Zod
import { z } from 'zod';

// UI Components
import { Input } from '@site/ui/input';
import { Button } from '@site/ui/button';

// Sonner
import { toast } from 'sonner';

// Create a new subscription
import Subscribe from '@/actions/subscribe';

// Confetti
import { ConfettiSideCannons } from '@/components/confetti';

// Define a schema for the form data
const schema = z.object({
    email: z.string().email('Invalid Email'),
});

// Form 
export default function SubscribeForm() {
    // Form ref
    const formRef = useRef<HTMLFormElement>(null);

    // State
    const [loading, setLoading] = useState<boolean>(false);

    // Define the form action
    async function action(formData: FormData) {
        // Validate the form data
        const validatedFields = schema.safeParse({
            email: formData.get('email'),
        });

        // Check if the form data is valid
        if (!validatedFields.success) {
            // Show error message
            console.error(validatedFields.error.errors);
            return;
        };

        // Create a new subscription using server actions
        const response = await Subscribe({
            email: validatedFields.data.email,
        });

        // Reset the form
        formRef.current?.reset();

        if (response.code !== 200 && response.code !== 401) {
            // Show error message
            toast.error(response.message);
        } else if (response.code === 401) {
            // Show error message related to subscription
            toast.error(response.message);
        } else {
            // Loading state
            setLoading(true);

            // Show success message
            const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 2000));

            // Remove loading state
            setLoading(false);

            // Show toast
            toast.promise(promise, {
                loading: 'Loading...',
                success: () => {
                    return response.message;
                },
                duration: 500,
                error: 'Error',
            });

            // Call the promisse to show the confetti only after the toast is at success state
            await promise();

            // Show confetti
            ConfettiSideCannons();
        };
    };

    // Render JSX form
    return (
        <form
            ref={formRef}
            action={action}
            className='relative'
        >
            <Input
                id='email'
                type='email'
                name='email'
                className='block'
                placeholder='Your email'
                required
            />
            <Button
                type='submit'
                size='small'
                shape='rounded'
                variant='default'
                className='absolute end-1 bottom-1 w-22'
                loading={loading}
            >
                Subscribe
            </Button>
        </form>
    );
};