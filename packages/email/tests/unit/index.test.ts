import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the keys module (resolved as ../../src/keys, matching src/index's
// `import { keys } from './keys'`) so no real env is required.
vi.mock('../../src/keys', () => ({
  keys: () => ({
    RESEND_TOKEN: 're_test123',
    RESEND_FROM: 'contact@gabfon.com',
  }),
}));

// Mock Resend with the surface used by the app (Resend SDK v6). A regular
// (non-arrow) function is used so `new Resend()` works as a constructor under
// vitest 4, while `vi.fn` keeps it a spy.
vi.mock('resend', () => ({
  Resend: vi.fn(function (this: Record<string, unknown>) {
    this.emails = { send: vi.fn(), get: vi.fn() };
    this.batch = { send: vi.fn() };
    this.domains = { create: vi.fn(), verify: vi.fn(), list: vi.fn() };
    this.apiKeys = { create: vi.fn(), list: vi.fn(), remove: vi.fn() };
    this.contacts = {
      create: vi.fn(),
      update: vi.fn(),
      remove: vi.fn(),
      get: vi.fn(),
      list: vi.fn(),
    };
  }),
}));

describe('email index', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates the Resend instance with the configured token', async () => {
    const { Resend } = await import('resend');
    const mockResend = vi.mocked(Resend);

    await import('../../src/index');

    expect(mockResend).toHaveBeenCalledWith('re_test123');
  });

  it('exports a resend instance with the expected API surface', async () => {
    const { resend } = await import('../../src/index');

    expect(resend).toBeDefined();
    expect(typeof resend.emails.send).toBe('function');
    expect(typeof resend.batch.send).toBe('function');
    expect(typeof resend.contacts.create).toBe('function');
    expect(typeof resend.contacts.list).toBe('function');
    expect(typeof resend.domains.create).toBe('function');
    expect(typeof resend.domains.list).toBe('function');
    expect(typeof resend.apiKeys.create).toBe('function');
    expect(typeof resend.apiKeys.remove).toBe('function');
  });
});
