import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { keys } from '../keys';

const google = createGoogleGenerativeAI({
  apiKey: keys().GOOGLE_GENERATIVE_AI_API_KEY,
});

export const models: any = {
  chat: google('gemini-1.5-flash'),
  embeddings: google('text-embedding-004'),
};
