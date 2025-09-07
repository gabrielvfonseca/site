import { vi } from 'vitest';

// Global setup for React Testing Library with React 19
// Mock react-dom/test-utils to provide a working act function
vi.mock('react-dom/test-utils', () => ({
  act: (callback: () => void) => {
    // In React 19, we can just execute the callback directly
    // as act is not needed in the same way
    callback();
  },
}));
