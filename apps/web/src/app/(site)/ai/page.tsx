'use client';

import { useChat } from 'ai/react';

import {
  PromptInput,
  PromptInputTextarea,
} from '~/app/components/prompt-kit';

export default function AI() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex h-full max-h-[calc(100vh-8rem)] w-full flex-col">
      <div className="flex-1 overflow-y-auto">
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            {m.role === 'user' ? 'User: ' : 'AI: '}
            {m.content}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <form onSubmit={handleSubmit}>
          <PromptInput>
            <PromptInputTextarea
              value={input}
              onChange={handleInputChange}
              placeholder="Ask me anything..."
            />
          </PromptInput>
        </form>
      </div>
    </div>
  );
}
