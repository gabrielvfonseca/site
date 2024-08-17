
// Config
import { baseUrl } from '@config/site';

// Contentlayer
import { allNotes } from 'contentlayer/generated';

// GET function
export async function GET() {
  const itemsXml = allNotes
    .sort((a, b) => +new Date(b.date as any) - +new Date(a.date as any))
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
        <title>My Portfolio</title>
        <link>${baseUrl}</link>
        <description>This is my portfolio RSS feed</description>
        ${itemsXml}
    </channel>
  </rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
