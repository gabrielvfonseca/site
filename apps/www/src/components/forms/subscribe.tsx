'use client';

import React, { useState, useRef } from 'react';

// Zod
import { z } from 'zod';

// UI Components
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';

// Sonner
import { toast } from 'sonner';

// Create a new subscription
import Subscribe from '@actions/subscribe';

// Confetti
import { ConfettiSideCannons } from '@components/confetti';

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
    async function action(data: FormData) {
        // Validate the form data
        const validatedFields = schema.safeParse({
            email: data.get('email'),
        });

        // Check if the form data is valid
        if (!validatedFields.success) {
            // Show error message
            console.error(validatedFields.error.errors);
            return;
        };

        // Create a new subscription using server actions
        const response = await Subscribe(validatedFields.data.email);

        // Reset the form
        formRef.current?.reset();

        if (response === 'error') {
            // Show error message
            toast.error('An error occurred!');
        } else if (response === 'already_subscribed') {
            // Show error message related to subscription
            toast.error('You are already subscribed!');
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
                    return 'All set! I promise not to spam you.';
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
        <div className='relative'>
            <form
                ref={formRef}
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    action(formData);
                }}
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
                    id='submit'
                    type='submit'
                    size='sm'
                    radius='md'
                    variant='default'
                    className='absolute end-1 bottom-1 w-22'
                    loading={loading}
                    loadingWidth='w-[84px]'
                >
                    Subscribe
                </Button>
            </form>
        </div>
    );
};