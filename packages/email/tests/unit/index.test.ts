import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the keys module
vi.mock('../keys', () => ({
  keys: () => ({
    RESEND_TOKEN: 're_test123',
  }),
}));

// Mock Resend
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation((token: string) => ({
    token,
    emails: {
      send: vi.fn(),
      sendBatch: vi.fn(),
    },
    domains: {
      create: vi.fn(),
      verify: vi.fn(),
      list: vi.fn(),
    },
    apiKeys: {
      create: vi.fn(),
      list: vi.fn(),
      revoke: vi.fn(),
    },
    contacts: {
      create: vi.fn(),
      update: vi.fn(),
      remove: vi.fn(),
      get: vi.fn(),
      list: vi.fn(),
    },
  })),
}));

describe('email index', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates Resend instance with correct token', async () => {
    const { Resend } = await import('resend');
    const mockResend = vi.mocked(Resend);

    await import('../../src/index');

    expect(mockResend).toHaveBeenCalledWith('re_test123');
  });

  it('exports resend instance', async () => {
    const { resend } = await import('../../src/index');

    expect(resend).toBeDefined();
    expect(typeof resend.emails.send).toBe('function');
    expect(typeof resend.emails.sendBatch).toBe('function');
    expect(typeof resend.contacts.create).toBe('function');
    expect(typeof resend.contacts.update).toBe('function');
    expect(typeof resend.contacts.remove).toBe('function');
    expect(typeof resend.contacts.get).toBe('function');
    expect(typeof resend.contacts.list).toBe('function');
    expect(typeof resend.domains.create).toBe('function');
    expect(typeof resend.domains.verify).toBe('function');
    expect(typeof resend.domains.list).toBe('function');
    expect(typeof resend.apiKeys.create).toBe('function');
    expect(typeof resend.apiKeys.list).toBe('function');
    expect(typeof resend.apiKeys.revoke).toBe('function');
  });

  it('resend instance has correct token', async () => {
    const { resend } = await import('../../src/index');

    expect(resend.token).toBe('re_test123');
  });
});
