import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Message } from '../../../src/components/message';
import type { CoreMessage } from 'ai';

// Mock Streamdown component
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

describe('Message Component', () => {
  const userMessage: CoreMessage = {
    role: 'user',
    content: 'Hello, how are you?',
  };

  const assistantMessage: CoreMessage = {
    role: 'assistant',
    content: 'I am doing well, thank you!',
  };

  const systemMessage: CoreMessage = {
    role: 'system',
    content: 'You are a helpful assistant.',
  };

  const complexContentMessage: CoreMessage = {
    role: 'assistant',
    content: JSON.stringify([
      { type: 'text', text: 'Here is some text' },
      { type: 'tool-call', toolCallId: '1' },
    ]),
  };

  it('renders user message with correct styling', () => {
    render(<Message data={userMessage} />);
    
    const messageContainer = screen.getByText('Hello, how are you?').parentElement;
    expect(messageContainer).toHaveClass('flex', 'max-w-[80%]', 'flex-col', 'gap-2', 'rounded-xl', 'px-4', 'py-2', 'self-end', 'bg-foreground', 'text-background');
  });

  it('renders assistant message with correct styling', () => {
    render(<Message data={assistantMessage} />);
    
    const messageContainer = screen.getByText('I am doing well, thank you!').parentElement;
    expect(messageContainer).toHaveClass('flex', 'max-w-[80%]', 'flex-col', 'gap-2', 'rounded-xl', 'px-4', 'py-2', 'self-start', 'bg-muted');
  });

  it('renders system message with correct styling', () => {
    render(<Message data={systemMessage} />);
    
    const messageContainer = screen.getByText('You are a helpful assistant.').parentElement;
    expect(messageContainer).toHaveClass('flex', 'max-w-[80%]', 'flex-col', 'gap-2', 'rounded-xl', 'px-4', 'py-2', 'self-start', 'bg-muted');
  });

  it('handles complex content by stringifying it', () => {
    render(<Message data={complexContentMessage} />);
    
    expect(screen.getByText(/Here is some text/)).toBeInTheDocument();
    expect(screen.getByText(/tool_call/)).toBeInTheDocument();
  });

  it('passes markdown props to Streamdown component', () => {
    const markdownProps = {
      className: 'custom-markdown',
      style: { color: 'red' },
    };

    render(<Message data={assistantMessage} markdown={markdownProps} />);
    
    const streamdown = screen.getByTestId('streamdown');
    expect(streamdown).toHaveClass('custom-markdown');
    expect(streamdown).toHaveStyle({ color: 'red' });
  });

  it('renders empty message content', () => {
    const emptyMessage: CoreMessage = {
      role: 'user',
      content: '',
    };

    render(<Message data={emptyMessage} />);
    
    const streamdown = screen.getByTestId('streamdown');
    expect(streamdown).toBeInTheDocument();
    expect(streamdown).toHaveTextContent('');
  });

  it('handles null/undefined content gracefully', () => {
    const nullMessage: CoreMessage = {
      role: 'user',
      content: null as any,
    };

    render(<Message data={nullMessage} />);
    
    const streamdown = screen.getByTestId('streamdown');
    expect(streamdown).toBeInTheDocument();
  });

  it('applies additional className through twMerge', () => {
    render(<Message data={userMessage} />);
    
    const messageContainer = screen.getByText('Hello, how are you?').parentElement;
    expect(messageContainer).toHaveClass('self-end', 'bg-foreground', 'text-background');
  });
});
