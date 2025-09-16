import { vi } from 'vitest';
import { act as reactAct } from 'react';

// Global setup for React Testing Library with React 19
// Mock react-dom/test-utils to use React's act function
vi.mock('react-dom/test-utils', () => ({
  act: reactAct,
}));

// Also ensure that the act function is available globally
declare global {
  var act: typeof reactAct;
}

global.act = reactAct;
