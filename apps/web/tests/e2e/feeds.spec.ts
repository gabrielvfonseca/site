import { expect, test } from '@playwright/test';

const ENDPOINTS = [
  { path: '/rss.xml', type: 'xml' },
  { path: '/sitemap.xml', type: 'xml' },
  { path: '/sitemap.md', type: 'markdown' },
  { path: '/llms.txt', type: 'plain' },
  { path: '/llms.md', type: 'markdown' },
  { path: '/llms-full.txt', type: 'plain' },
  { path: '/robots.txt', type: 'plain' },
  { path: '/manifest.webmanifest', type: 'json' },
];

// Routes and slugs that were removed and must never reappear in feeds.
const STALE = [
  '/use',
  '/colophon',
  '/now',
  '/about',
  '/api/chat',
  '/api/now',
  '/design-system',
  'edge-ai-weblm-webgpu',
  'web-performance-optimization',
  'typescript-best-practices',
];

test.describe('Feeds & machine-readable endpoints', () => {
  for (const { path } of ENDPOINTS) {
    test(`${path} responds 200`, async ({ request }) => {
      const res = await request.get(path);
      expect(res.status()).toBe(200);
    });
  }

  test('icon and apple-icon render as images', async ({ request }) => {
    for (const path of ['/icon', '/apple-icon']) {
      const res = await request.get(path);
      expect(res.status()).toBe(200);
      expect(res.headers()['content-type']).toContain('image/');
    }
  });

  test('feeds contain no stale routes or fake posts', async ({ request }) => {
    for (const path of ['/rss.xml', '/sitemap.md', '/llms.txt', '/llms.md']) {
      const body = await (await request.get(path)).text();
      for (const stale of STALE) {
        expect(body, `${path} should not reference ${stale}`).not.toContain(
          stale
        );
      }
    }
  });
});
