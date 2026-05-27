import { parseError } from '@gabfon/observability';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { readFile } from 'fs/promises';
import { type NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { z } from 'zod';
import { checkRateLimit } from '@/lib/rate-limit';

// Validate API key on initialization
const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  throw new Error('GOOGLE_API_KEY environment variable is required');
}

const genAi = new GoogleGenerativeAI(apiKey);

// Validation schema for chat request
const ChatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z
    .string()
    .min(1, 'Message cannot be empty')
    .max(10_000, 'Message exceeds 10,000 character limit'),
});

const ChatRequestSchema = z.object({
  messages: z
    .array(ChatMessageSchema)
    .min(1, 'At least one message is required')
    .max(50, 'Message history exceeds 50 messages'),
});

export async function POST(req: NextRequest) {
  try {
    // Check rate limit
    const rateLimitCheck = await checkRateLimit(req, 'chat');
    if (!rateLimitCheck.success && rateLimitCheck.response) {
      return rateLimitCheck.response;
    }

    const body = await req.json();

    // Validate input
    const validationResult = ChatRequestSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid request',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { messages } = validationResult.data;

    const dataPath = path.join(process.cwd(), 'src/app/api/chat/data.txt');
    const data = await readFile(dataPath, 'utf-8');

    const model = genAi.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const chat = model.startChat({
      history: messages.slice(0, -1).map((msg) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      })),
    });

    const userMessage = messages[messages.length - 1].content;

    const result = await chat.sendMessageStream(
      `You are a helpful AI assistant that can answer questions based on the provided context.
Here is the context:
---
${data}
---
Now, here is the user's question:
${userMessage}`
    );

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) {
            controller.enqueue(encoder.encode(text));
          }
        }
        controller.close();
      },
    });

    return new NextResponse(readable, {
      headers: { 'Content-Type': 'text/event-stream' },
    });
  } catch (error) {
    const parsedError = parseError(error);
    return NextResponse.json(
      { error: 'Failed to process chat request', details: parsedError },
      { status: 500 }
    );
  }
}
