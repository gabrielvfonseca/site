'use client';

import { DefaultChatTransport, useChat } from '@gabfon/ai/react';
import { useState } from 'react';
import {
  Message,
  MessageContent,
  MessageResponse,
} from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
} from '@/components/ai-elements/prompt-input';

export default function AI() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });

  return (
    <div className="flex h-full max-h-[calc(100vh-8rem)] w-full flex-col bg-background">
      {/* Header */}
      <div className="border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <h1 className="font-semibold text-lg">AI Assistant</h1>
          {status === 'streaming' && (
            <span className="text-muted-foreground text-sm">Typing...</span>
          )}
        </div>
        <p className="mt-1 text-muted-foreground text-sm">
          Ask me anything about Gabriel and his work
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center p-8 text-center">
            <div className="max-w-md space-y-4">
              <h2 className="font-bold text-2xl">Hello! 👋</h2>
              <p className="text-muted-foreground">
                I'm an AI assistant that can help you learn more about Gabriel
                and his work. Feel free to ask me anything!
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  'What do you do?',
                  'Tell me about your experience',
                  'What technologies do you use?',
                  'How can I contact you?',
                ].map((suggestion) => (
                  <button
                    className="rounded-full bg-secondary px-3 py-1 text-sm transition-colors hover:bg-secondary/80"
                    key={suggestion}
                    onClick={() => setInput(suggestion)}
                    type="button"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 p-4">
            {messages.map((m) => (
              <Message from={m.role} key={m.id}>
                <MessageContent>
                  <MessageResponse>
                    {m.parts
                      .map((part) => (part.type === 'text' ? part.text : ''))
                      .join('')}
                  </MessageResponse>
                </MessageContent>
              </Message>
            ))}
            {status === 'streaming' && (
              <Message from="assistant">
                <MessageContent>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="animate-pulse">Thinking</div>
                    <div className="flex gap-1">
                      <div
                        className="h-1 w-1 animate-bounce rounded-full bg-current"
                        style={{ animationDelay: '0ms' }}
                      />
                      <div
                        className="h-1 w-1 animate-bounce rounded-full bg-current"
                        style={{ animationDelay: '150ms' }}
                      />
                      <div
                        className="h-1 w-1 animate-bounce rounded-full bg-current"
                        style={{ animationDelay: '300ms' }}
                      />
                    </div>
                  </div>
                </MessageContent>
              </Message>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto max-w-4xl p-4">
          <PromptInput
            onSubmit={async (message) => {
              if (message.text.trim()) {
                await sendMessage({ text: message.text });
                setInput('');
              }
            }}
          >
            <PromptInputTextarea
              disabled={status === 'streaming'}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              value={input}
            />
            <PromptInputSubmit status={status} />
          </PromptInput>
        </div>
      </div>
    </div>
  );
}
