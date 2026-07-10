import { z } from 'zod';

const QUESTION_MIN = 10;
const QUESTION_MAX = 1000;
const NAME_MIN = 2;
const NAME_MAX = 80;

/**
 * Validation for an AMA (Ask Me Anything) question submission. Name and email
 * are optional so questions can be asked anonymously, but must be well-formed
 * when provided.
 */
export const amaSchema = z.object({
  question: z
    .string()
    .min(QUESTION_MIN, { message: 'Question must be at least 10 characters' })
    .max(QUESTION_MAX, { message: 'Question must be at most 1000 characters' }),
  name: z
    .string()
    .min(NAME_MIN, { message: 'Name must be at least 2 characters' })
    .max(NAME_MAX, { message: 'Name must be at most 80 characters' })
    .optional()
    .or(z.literal('')),
  email: z
    .email({ message: 'Invalid email address' })
    .optional()
    .or(z.literal('')),
});

export type AmaFormData = z.infer<typeof amaSchema>;
