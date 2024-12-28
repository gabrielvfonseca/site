'use client';

import React, { useState } from 'react';

import { z } from 'zod';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormField,
  FormItem,
} from '@repo/design-system/components/ui/form';

import { Input } from '@repo/design-system/components/ui/input';

import { Button } from '@repo/design-system/components/ui/button';

import { createRecord } from '@/lib/server/create-record';

import { ConfettiSideCannons } from '@/components/animations/confetti';

import { signNewsletter } from '@/lib/schemas/newsletter-schema';

import { toast } from 'sonner';
import Spinner from '@repo/design-system/components/spinner';

export default function SignForm () {
    const form = useForm<z.infer<typeof signNewsletter>>({
        resolver: zodResolver(signNewsletter),
        defaultValues: {
          email: '',
        },
    });

    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = async (values: z.infer<typeof signNewsletter>) => {
        const record = await createRecord ({
            email: values.email,
        });

        if (record.code !== 200 && record.code !== 401) {
            toast.error(record.message);
        } else if (record.code === 401) {
            toast.error(record.message);
        } else {
            setLoading(true);

            const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 1000));

            setLoading(false);

            toast.promise(promise, {
                loading: 'Loading...',
                success: () => {
                    return record.message;
                },
                duration: 500,
                error: 'Error',
            });

            await promise();

            ConfettiSideCannons();
        };
    };

    return (
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className='relative'
            >
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <Input
                                type='email'
                                className='block'
                                placeholder='Your email'
                                required
                                {...field}
                            />
                        </FormItem>
                    )}
                />
                <Button 
                    type='submit'
                    variant='default'
                    size='sm'
                    className='absolute end-1 bottom-1 w-24'
                >
                    {loading ? <Spinner /> : 'Subscribe'}
                </Button>
            </form>
        </Form>
    );
};