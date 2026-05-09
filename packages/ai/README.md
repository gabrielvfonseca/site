# @gabfon/ai - Gemini AI Integration

AI package converted from OpenAI to Google Gemini using the AI SDK v3.

## Features

- **Text Generation**: Using Gemini 1.5 Flash model
- **Embeddings**: Using text-embedding-004 model  
- **Streaming**: Real-time text streaming support
- **TypeScript**: Full type safety and IntelliSense support
- **Testing**: Comprehensive test suite included

## Installation

```bash
bun install @gabfon/ai
```

## Environment Setup

Add your Google AI API key to your environment:

```bash
# .env.local
GOOGLE_GENERATIVE_AI_API_KEY=your-api-key-here
```

## Usage

### Text Generation

```typescript
import { generateText } from 'ai';
import { models } from '@gabfon/ai';

const { text, usage } = await generateText({
  model: models.chat,
  prompt: 'Write a hello world message',
});

console.log(text);
```

### Streaming

```typescript
import { streamText } from 'ai';
import { models } from '@gabfon/ai';

const { textStream } = await streamText({
  model: models.chat,
  prompt: 'Tell me a story',
});

for await (const chunk of textStream) {
  process.stdout.write(chunk);
}
```

### Embeddings

```typescript
import { embed } from 'ai';
import { models } from '@gabfon/ai';

const { embedding } = await embed({
  model: models.embeddings,
  value: 'Your text to embed',
});

console.log(embedding);
```

## Models

- `models.chat`: Gemini 1.5 Flash for text generation
- `models.embeddings`: text-embedding-004 for embeddings

## Components

### Message Component

```typescript
import { Message } from '@gabfon/ai/components';

<Message data={message} />
```

### Thread Component

```typescript
import { Thread } from '@gabfon/ai/components';

<Thread>
  <Message data={userMessage} />
  <Message data={assistantMessage} />
</Thread>
```

## Testing

```bash
# Run all tests
bun test

# Run with coverage
bun test:coverage

# Watch mode
bun test:watch
```

## Migration from OpenAI

This package was converted from OpenAI to Gemini. The main changes:

- **Provider**: Changed from `@ai-sdk/openai` to `@ai-sdk/google`
- **Models**: Now uses Gemini models instead of GPT
- **API Key**: Uses `GOOGLE_GENERATIVE_AI_API_KEY` instead of `OPENAI_API_KEY`
- **Compatibility**: Maintains the same AI SDK interface for easy migration

## License

Private package for internal use.