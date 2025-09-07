import { vi } from 'vitest';

// Mock React.act for React 19 compatibility
// React Testing Library expects React.act to exist, but it's not available in React 19
// We need to provide a mock implementation
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    act: (callback: () => void) => {
      // In React 19, act is not needed in the same way
      // We can just execute the callback directly
      callback();
    },
  };
});

// Mock ReactDOM.act as well
vi.mock('react-dom', async () => {
  const actual = await vi.importActual('react-dom');
  return {
    ...actual,
    act: (callback: () => void) => {
      callback();
    },
  };
});
