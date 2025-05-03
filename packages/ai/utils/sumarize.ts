import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

/**
 * Summarizes content using AI SDK
 */
export async function summarizeContent(content: string): Promise<string> {
  try {
    const { text } = await generateText({
      model: openai('gpt-4o'),
      prompt: `Summarize the following text concisely:\n\n${content}`,
      system:
        'You are a professional summarizer. Create concise, accurate summaries that capture the key points while maintaining clarity.',
    });

    return text;
  } catch (_error) {
    throw new Error('Failed to summarize content');
  }
}
