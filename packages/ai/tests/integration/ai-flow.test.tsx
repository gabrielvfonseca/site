import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Message } from '../../src/components/message';
import { Thread } from '../../src/components/thread';

// Mock AI SDK
vi.mock('ai', () => ({
  generateText: vi.fn(),
  streamText: vi.fn(),
}));

// Mock Streamdown
vi.mock('streamdown', () => ({
  Streamdown: ({ children, ...props }: any) => (
    <div data-testid="streamdown" {...props}>
      {children}
    </div>
  ),
}));

// Mock tailwind-merge
vi.mock('tailwind-merge', () => ({
  twMerge: (...classes: string[]) => classes.filter(Boolean).join(' '),
}));

describe('AI Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders complete conversation thread with multiple messages', async () => {
    const messages = [
      {
        role: 'user' as const,
        content: 'Hello, can you help me?',
      },
      {
        role: 'assistant' as const,
        content: 'Of course! How can I assist you today?',
      },
      {
        role: 'user' as const,
        content: 'I need help with testing',
      },
    ];

    render(
      <Thread data-testid="thread">
        {messages.map((message, index) => (
          <Message key={index} data={message} />
        ))}
      </Thread>
    );

    const thread = screen.getByTestId('thread');
    expect(thread).toBeInTheDocument();

    // Check all messages are rendered
    expect(screen.getByText('Hello, can you help me?')).toBeInTheDocument();
    expect(screen.getByText('Of course! How can I assist you today?')).toBeInTheDocument();
    expect(screen.getByText('I need help with testing')).toBeInTheDocument();
  });

  it('handles message with markdown content', async () => {
    const markdownMessage = {
      role: 'assistant' as const,
      content: '# Heading\n\nThis is **bold** text.',
    };

    const markdownProps = {
      className: 'markdown-content',
    };

    render(
      <Thread>
        <Message data={markdownMessage} markdown={markdownProps} />
      </Thread>
    );

    const streamdown = screen.getByTestId('streamdown');
    expect(streamdown).toHaveClass('markdown-content');
    expect(streamdown).toHaveTextContent('# Heading\n\nThis is **bold** text.');
  });

  it('applies correct styling based on message roles', async () => {
    const userMessage = {
      role: 'user' as const,
      content: 'User message',
    };

    const assistantMessage = {
      role: 'assistant' as const,
      content: 'Assistant message',
    };

    render(
      <Thread>
        <Message data={userMessage} />
        <Message data={assistantMessage} />
      </Thread>
    );

    const userContainer = screen.getByText('User message').parentElement;
    const assistantContainer = screen.getByText('Assistant message').parentElement;

    // User message should be aligned to the end (right)
    expect(userContainer).toHaveClass('self-end');

    // Assistant message should be aligned to the start (left)
    expect(assistantContainer).toHaveClass('self-start');
  });

  it('handles empty thread gracefully', () => {
    render(<Thread />);
    
    const thread = screen.getByRole('generic');
    expect(thread).toBeInTheDocument();
    expect(thread).toBeEmptyDOMElement();
  });

  it('handles complex message content structure', async () => {
    const complexMessage = {
      role: 'assistant' as const,
      content: JSON.stringify([
        { type: 'text', text: 'Here is some text' },
        { type: 'tool-call', toolCallId: '1' },
      ]),
    };

    render(
      <Thread>
        <Message data={complexMessage} />
      </Thread>
    );

    expect(screen.getByText(/Here is some text/)).toBeInTheDocument();
    expect(screen.getByText(/tool-call/)).toBeInTheDocument();
  });
});
