import { z } from 'zod';

export const signNewsletter = z.object({
    email: z.string().email('Invalid Email'),
});