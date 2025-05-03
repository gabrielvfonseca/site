import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

/**
 * Translates content to the specified target language using AI SDK
 */
export async function translateContent(
  content: string,
  targetLanguage: string
): Promise<string> {
  try {
    const { text } = await generateText({
      model: openai('gpt-4o'),
      prompt: `Translate the following text to ${targetLanguage}:\n\n${content}`,
      system:
        'You are a professional translator. Provide accurate translations while maintaining the original meaning and tone.',
    });

    return text;
  } catch (_error) {
    throw new Error('Failed to translate content');
  }
}
