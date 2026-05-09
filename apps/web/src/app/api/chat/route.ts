import {
  GoogleGenerativeAI,
} from '@google/generative-ai';
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from 'ai';
import { readFile } from 'fs/promises';
import path from 'path';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function POST(req: Request) {
  const { messages } = await req.json();

  const dataPath = path.join(process.cwd(), 'src/app/api/chat/data.txt');
  const data = await readFile(dataPath, 'utf-8');

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const chat = model.startChat({
    history: messages.slice(0, -1).map((message: Message) => ({
      role: message.role,
      parts: message.content,
    })),
  });

  const userMessage = messages[messages.length - 1].content;

  const result = await chat.sendMessageStream(
    `
    You are a helpful AI assistant that can answer questions about me based on the provided context.
    Here is the context:
    ---
    ${data}
    ---
    Now, here is the user's question:
    ${userMessage}
    `
  );

  const stream = GoogleGenerativeAIStream(result);

  return new StreamingTextResponse(stream);
}
