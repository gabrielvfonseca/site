import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the external dependencies
vi.mock('@gabfon/analytics/keys', () => ({
  keys: () => ({}),
}));

vi.mock('@gabfon/next-config/keys', () => ({
  keys: () => ({}),
}));

vi.mock('@gabfon/observability/keys', () => ({
  keys: () => ({}),
}));

vi.mock('@gabfon/cache/keys', () => ({
  keys: () => ({}),
}));

vi.mock('@gabfon/security/keys', () => ({
  keys: () => ({}),
}));

vi.mock('@gabfon/database/keys', () => ({
  keys: () => ({}),
}));

vi.mock('@dotenvx/dotenvx', () => ({
  config: () => ({}),
}));

describe('env', () => {
  let env: any;

  beforeEach(async () => {
    // Reset environment variables
    vi.resetModules();
    // Clean up environment variables
    delete process.env.NEXT_PUBLIC_TWITTER_URL;
    delete process.env.NEXT_PUBLIC_LINKEDIN_URL;
    delete process.env.NEXT_PUBLIC_GITHUB_URL;
    delete process.env.NEXT_PUBLIC_SCHEDULE_URL;
    delete process.env.NEXT_PUBLIC_EMAIL;
    // Import env after mocking
    const envModule = await import('../src/env');
    env = envModule.env;
  });

  it('should have default values for public URLs', () => {
    expect(env.NEXT_PUBLIC_TWITTER_URL).toBe('https://x.com/gabfon_');
    expect(env.NEXT_PUBLIC_LINKEDIN_URL).toBe('https://www.linkedin.com/in/gabrielvfonseca/');
    expect(env.NEXT_PUBLIC_GITHUB_URL).toBe('https://github.com/gabrielvfonseca');
    expect(env.NEXT_PUBLIC_SCHEDULE_URL).toBe('https://calendar.notion.so/meet/gabfon/schedule');
    expect(env.NEXT_PUBLIC_EMAIL).toBe('hey@gabfon.com');
  });

  it('should validate URL format for public URLs', async () => {
    // Test with valid URLs
    const validUrls = [
      'https://example.com',
      'https://subdomain.example.com/path',
      'https://example.com:8080/path?query=value',
    ];

    for (const url of validUrls) {
      process.env.NEXT_PUBLIC_TWITTER_URL = url;
      vi.resetModules();
      const envModule = await import('../src/env');
      expect(envModule.env.NEXT_PUBLIC_TWITTER_URL).toBe(url);
    }
  });

  it('should validate email format', async () => {
    // Test with valid emails
    const validEmails = [
      'test@example.com',
      'user.name@domain.co.uk',
      'user+tag@example.org',
    ];

    for (const email of validEmails) {
      process.env.NEXT_PUBLIC_EMAIL = email;
      vi.resetModules();
      const envModule = await import('../src/env');
      expect(envModule.env.NEXT_PUBLIC_EMAIL).toBe(email);
    }
  });

  it('should throw error for invalid email format', async () => {
    const invalidEmails = [
      'not-an-email',
      '@example.com',
      'user@',
      'user@.com',
    ];

    for (const email of invalidEmails) {
      process.env.NEXT_PUBLIC_EMAIL = email;
      vi.resetModules();
      await expect(async () => {
        await import('../src/env');
      }).rejects.toThrow();
    }
  });

  it('should handle optional environment variables', async () => {
    // Test that all public variables are optional and have defaults
    delete process.env.NEXT_PUBLIC_TWITTER_URL;
    delete process.env.NEXT_PUBLIC_LINKEDIN_URL;
    delete process.env.NEXT_PUBLIC_GITHUB_URL;
    delete process.env.NEXT_PUBLIC_SCHEDULE_URL;
    delete process.env.NEXT_PUBLIC_EMAIL;

    vi.resetModules();
    const envModule = await import('../src/env');
    expect(envModule.env).toBeDefined();
    expect(envModule.env.NEXT_PUBLIC_TWITTER_URL).toBe('https://x.com/gabfon_');
    expect(envModule.env.NEXT_PUBLIC_EMAIL).toBe('hey@gabfon.com');
  });

  it('should have env export', async () => {
    const envModule = await import('../src/env');
    expect(envModule.env).toBeDefined();
  });
});