# @gabfon/ai API Reference

## Installation

```bash
npm install @gabfon/ai
```

## Environment Setup

Create environment variables for Google AI access:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key
```

## Exports

### Main Package
```typescript
// Re-exports all functionality from Vercel AI SDK
export * from 'ai';
```

### Components
```typescript
export { Message } from './components/message';
export { Thread } from './components/thread';
```

### Models
```typescript
export { models } from './lib/models';
```

### Keys
```typescript
export { keys } from './keys';
```

## Components

### Message

Renders an individual chat message with appropriate styling and markdown support.

#### Props

```typescript
interface MessageProps {
  data: CoreMessage;
  markdown?: ComponentProps<typeof Streamdown>;
}
```

#### Usage

```typescript
import { Message } from '@gabfon/ai/components';

function ChatMessage({ message }: { message: CoreMessage }) {
  return <Message data={message} />;
}
```

#### Features

- **Role-based styling**: Different styles for user vs assistant messages
- **Markdown rendering**: Automatic markdown parsing and rendering
- **Streaming support**: Handles streaming markdown content
- **Responsive design**: Adapts to different screen sizes

### Thread

Container component for chat message threads.

#### Props

```typescript
interface ThreadProps {
  children: ReactNode;
  className?: string;
}
```

#### Usage

```typescript
import { Thread, Message } from '@gabfon/ai/components';

function ChatInterface({ messages }: { messages: CoreMessage[] }) {
  return (
    <Thread>
      {messages.map((message, index) => (
        <Message key={index} data={message} />
      ))}
    </Thread>
  );
}
```

## Models

### Pre-configured Models

The package provides pre-configured Google AI models:

```typescript
import { models } from '@gabfon/ai/lib/models';

// Chat model for conversational AI
const chatModel = models.chat; // gemini-1.5-flash

// Embeddings model for text embeddings
const embeddingsModel = models.embeddings; // text-embedding-004
```

### Custom Model Configuration

```typescript
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { keys } from '@gabfon/ai/keys';

const google = createGoogleGenerativeAI({
  apiKey: keys().GOOGLE_GENERATIVE_AI_API_KEY,
});

const customModel = google('gemini-1.5-pro');
```

## Environment Variables

### Required Variables

| Variable | Description | Type | Required |
|----------|-------------|------|----------|
| `GOOGLE_GENERATIVE_AI_API_KEY` | Google AI API key | string | Yes |

### Environment Validation

```typescript
import { keys } from '@gabfon/ai/keys';

// Validates environment variables and returns typed object
const env = keys();
console.log(env.GOOGLE_GENERATIVE_AI_API_KEY);
```

## Usage Examples

### Basic Chat Interface

```typescript
import { useChat } from 'ai';
import { Thread, Message } from '@gabfon/ai/components';

function ChatApp() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
  });

  return (
    <div>
      <Thread>
        {messages.map((message) => (
          <Message key={message.id} data={message} />
        ))}
      </Thread>
      
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
```

### Streaming Chat API

```typescript
import { streamText } from 'ai';
import { models } from '@gabfon/ai/lib/models';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: models.chat,
    messages,
  });

  return result.toDataStreamResponse();
}
```

### Text Embeddings

```typescript
import { embed } from 'ai';
import { models } from '@gabfon/ai/lib/models';

async function getEmbeddings(text: string) {
  const { embedding } = await embed({
    model: models.embeddings,
    value: text,
  });

  return embedding;
}
```

## Types

### CoreMessage

```typescript
interface CoreMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string | Array<{
    type: 'text' | 'image';
    text?: string;
    image?: string;
  }>;
  createdAt?: Date;
}
```

### Model Configuration

```typescript
interface Models {
  chat: LanguageModel;
  embeddings: EmbeddingModel;
}
```

## Error Handling

### Environment Validation Errors

```typescript
import { keys } from '@gabfon/ai/keys';

try {
  const env = keys();
  // Use env variables
} catch (error) {
  console.error('Environment validation failed:', error);
  // Handle missing or invalid environment variables
}
```

### AI Model Errors

```typescript
import { streamText } from 'ai';
import { models } from '@gabfon/ai/lib/models';

try {
  const result = await streamText({
    model: models.chat,
    messages,
  });
} catch (error) {
  console.error('AI model error:', error);
  // Handle API errors, rate limits, etc.
}
```

## Best Practices

### 1. Environment Security
- Never expose API keys on the client side
- Use environment variables for all sensitive configuration
- Validate environment variables at startup

### 2. Error Handling
- Always wrap AI API calls in try-catch blocks
- Provide fallback UI for failed requests
- Implement retry logic for transient failures

### 3. Performance
- Use streaming for long responses
- Implement message pagination for long conversations
- Cache embeddings when possible

### 4. Accessibility
- Provide proper ARIA labels for chat interfaces
- Ensure keyboard navigation
- Add screen reader support for dynamic content

## Integration with Other Packages

### Analytics Integration

```typescript
import { AnalyticsProvider } from '@gabfon/analytics';
import { ChatApp } from './ChatApp';

function App() {
  return (
    <AnalyticsProvider>
      <ChatApp />
    </AnalyticsProvider>
  );
}
```

### Design System Integration

```typescript
import { Button, Input } from '@gabfon/design-system';
import { Thread, Message } from '@gabfon/ai/components';

function StyledChat() {
  return (
    <Thread>
      {/* Messages */}
      <div className="flex gap-2">
        <Input placeholder="Type a message..." />
        <Button>Send</Button>
      </div>
    </Thread>
  );
}
```

## Testing

### Component Testing

```typescript
import { render, screen } from '@testing-library/react';
import { Message } from '@gabfon/ai/components';

test('renders user message correctly', () => {
  const userMessage: CoreMessage = {
    id: '1',
    role: 'user',
    content: 'Hello, world!',
  };

  render(<Message data={userMessage} />);
  expect(screen.getByText('Hello, world!')).toBeInTheDocument();
});
```

### Model Testing

```typescript
import { models } from '@gabfon/ai/lib/models';

test('chat model is configured correctly', () => {
  expect(models.chat).toBeDefined();
  expect(models.embeddings).toBeDefined();
});
```
