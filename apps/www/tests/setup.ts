import { vi } from 'vitest';
import { act } from 'react';

// Global setup for React Testing Library with React 19
// React Testing Library expects React.act to be available globally
// In React 19, we need to make sure act is available for testing
global.React = {
  ...global.React,
  act,
};

// Mock react-dom/test-utils to use React.act instead of ReactDOMTestUtils.act
vi.mock('react-dom/test-utils', () => ({
  act: (callback: () => void) => {
    return act(callback);
  },
}));
