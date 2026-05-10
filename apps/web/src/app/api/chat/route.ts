import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { google } from '@ai-sdk/google';
import { convertToModelMessages, streamText, type UIMessage } from 'ai';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const dataPath = path.join(process.cwd(), 'src/app/api/chat/data.txt');
  const data = await readFile(dataPath, 'utf-8');

  const lastMessage = messages.at(-1);
  const lastUserText =
    lastMessage?.parts?.find((part) => part.type === 'text' && 'text' in part)
      ?.text || '';

  const result = streamText({
    model: google('gemini-1.5-flash'),
    system: `You are a helpful AI assistant that can answer questions about me based on the provided context.
    Here is the context:
    ---
    ${data}
    ---`,
    messages: await convertToModelMessages([
      ...messages.slice(0, -1),
      {
        role: 'user',
        parts: [
          {
            type: 'text',
            text: lastUserText,
          },
        ],
      },
    ]),
  });

  return result.toUIMessageStreamResponse();
}
