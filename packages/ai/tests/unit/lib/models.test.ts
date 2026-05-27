import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the keys module
vi.mock('../keys', () => ({
  keys: () => ({
    GOOGLE_GENERATIVE_AI_API_KEY: 'test-api-key',
  }),
}));

// Mock the AI SDK
vi.mock('@ai-sdk/google', () => ({
  createGoogleGenerativeAI: vi.fn().mockImplementation((config: any) => {
    const mockFn = vi.fn((model: string) => ({
      model,
      provider: 'google',
      apiKey: config.apiKey,
    }));
    return mockFn;
  }),
}));

describe('models', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Ensure environment variables are set for keys validation
    process.env.GOOGLE_GENERATIVE_AI_API_KEY = 'test-api-key';
    process.env.SKIP_ENV_VALIDATION = 'true';
  });

  it('exports models object with chat model', async () => {
    const { createGoogleGenerativeAI } = await import('@ai-sdk/google');
    const mockCreate = vi.mocked(createGoogleGenerativeAI);
    
    // Import models to trigger creation
    await import('../../../src/lib/models');
    
    expect(mockCreate).toHaveBeenCalledWith({
      apiKey: 'test-api-key',
    });
  });

  it('exports models object with embeddings model', async () => {
    const { createGoogleGenerativeAI } = await import('@ai-sdk/google');
    const mockCreate = vi.mocked(createGoogleGenerativeAI);
    
    // Import models to trigger creation
    await import('../../../src/lib/models');
    
    expect(mockCreate).toHaveBeenCalledWith({
      apiKey: 'test-api-key',
    });
  });

  it('models object has expected structure', async () => {
    const { models } = await import('../../../src/lib/models');
    
    expect(models).toBeDefined();
    expect(typeof models.chat).toBe('object');
    expect(typeof models.embeddings).toBe('object');
  });
});
