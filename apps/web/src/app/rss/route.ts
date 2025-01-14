import { allPosts, type Post } from '@posts';

export async function GET() {
  const baseUrl = 'https://gabfon.com';

  const itemsXml = allPosts
    .sort((a: Post, b: Post) => +new Date(b.date as any) - +new Date(a.date as any))
    .map(
      (post) =>
        `<item>
          <title>${post.title}</title>
          <link>${baseUrl}/blog/${post.slug}</link>
          <description>${post.description || ''}</description>
          <pubDate>${new Date(post.date as any).toUTCString()}</pubDate>
        </item>`
    )
    .join('\n');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
          <title>Site</title>
          <link>${baseUrl}</link>
          <description>This is my site RSS feed</description>
          ${itemsXml}
      </channel>
    </rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
};