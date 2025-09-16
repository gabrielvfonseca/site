import { createMetadata } from '@gabfon/seo/metadata';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { JSX } from 'react';
import { highlight } from 'sugar-high';
import { getCachedPublishedPosts } from '@/data-access/cache/post-cache';
import type { Post } from '@/types/posts';

// Regex patterns for markdown processing
const ORDERED_LIST_REGEX = /^\d+\./;
const LIST_ITEM_REGEX = /^[*\-+]\s+|\d+\.\s+/;

/**
 * The PostPageProps for the site.
 */
interface PostPageProps {
  /**
   * The params for the site.
   */
  readonly params: Promise<{
    /**
     * The slug for the site.
     */
    slug: string;
  }>;
}

/**
 * The getPost for the site.
 * @param slug - The slug for the site.
 * @returns The getPost for the site.
 */
const getPost = async (slug: string): Promise<Post | undefined> => {
  try {
    const allPosts = await getCachedPublishedPosts();
    return allPosts.find((post: Post) => post.slug === slug);
  } catch {
    // If database is not available, return undefined
    return;
  }
};

/**
 * Processes markdown content with syntax highlighting
 * @param content - The markdown content string
 * @returns Processed HTML string
 */
const processMarkdownContent = (content: string): string => {
  return (
    content
      // Code blocks (must be processed first)
      .replace(/```(\w+)?\n([\s\S]*?)```/g, (_match, lang, code) => {
        const highlightedCode = highlight(code.trim());
        return `<pre class="mt-4 overflow-x-auto rounded-lg border border-accent-2 bg-accent-1 p-4 font-mono text-sm text-secondary"><code class="language-${lang || 'text'}">${highlightedCode}</code></pre>`;
      })
      // Inline code
      .replace(
        /`([^`]+)`/g,
        '<code class="rounded-md border border-accent-2 bg-accent-1 px-1.5 py-0.5 text-xs font-mono text-secondary">$1</code>'
      )
      // Headers
      .replace(
        /^# (.*$)/gim,
        '<h1 class="pb-4 font-medium text-primary text-xl">$1</h1>'
      )
      .replace(
        /^## (.*$)/gim,
        '<h2 class="mt-6 pb-3 font-medium text-primary text-lg">$1</h2>'
      )
      .replace(
        /^### (.*$)/gim,
        '<h3 class="mt-5 pb-2 font-medium text-primary text-lg">$1</h3>'
      )
      .replace(
        /^#### (.*$)/gim,
        '<h4 class="mt-4 pb-2 font-medium text-primary text-md">$1</h4>'
      )
      .replace(
        /^##### (.*$)/gim,
        '<h5 class="mt-4 pb-2 font-medium text-primary text-md">$1</h5>'
      )
      .replace(
        /^###### (.*$)/gim,
        '<h6 class="mt-4 pb-2 font-medium text-primary text-md font-normal">$1</h6>'
      )
      // Horizontal rules
      .replace(
        /^---$/gim,
        '<hr class="my-6 border-0 border-accent-2 border-t" />'
      )
      .replace(
        /^___$/gim,
        '<hr class="my-6 border-0 border-accent-2 border-t" />'
      )
      .replace(
        /^\*\*\*$/gim,
        '<hr class="my-6 border-0 border-accent-2 border-t" />'
      )
      // Bold and italic (must be processed before links)
      .replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="font-medium text-primary">$1</strong>'
      )
      .replace(/\*(.*?)\*/g, '<em class="font-medium text-secondary">$1</em>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, text, url) => {
        if (url.startsWith('/')) {
          return `<a class="text-link hover:text-link-hover active:text-link-active transition-colors duration-200" href="${url}">${text}</a>`;
        }
        if (url.startsWith('#')) {
          return `<a class="text-link hover:text-link-hover active:text-link-active transition-colors duration-200" href="${url}">${text}</a>`;
        }
        return `<a class="text-link hover:text-link-hover active:text-link-active transition-colors duration-200" href="${url}" rel="noopener noreferrer" target="_blank">${text}</a>`;
      })
      // Process lists - first wrap consecutive list items
      .replace(/((?:^[*\-+] .*$|^\d+\. .*$)\n?)+/gim, (match) => {
        const lines = match.trim().split('\n');
        const isOrdered = ORDERED_LIST_REGEX.test(lines[0]);
        const listClass = isOrdered ? 'list-decimal' : 'list-disc';
        const listItems = lines
          .map((line) => {
            const lineContent = line.replace(LIST_ITEM_REGEX, '');
            return `<li class="text-tertiary leading-relaxed">${lineContent}</li>`;
          })
          .join('');
        return `<${isOrdered ? 'ol' : 'ul'} class="${listClass} space-y-2 py-2 pl-6 text-tertiary leading-relaxed">${listItems}</${isOrdered ? 'ol' : 'ul'}>`;
      })
      // Blockquotes
      .replace(
        /^> (.*$)/gim,
        '<blockquote class="mt-4 border-l-4 border-accent-3 pl-4 text-tertiary italic">$1</blockquote>'
      )
      // Process paragraphs - wrap text that's not already wrapped
      .replace(/\n\n/g, '</p><p class="mt-4 text-tertiary leading-relaxed">')
      .replace(
        /^(?!<[h|o|u|b|p|d|h])(?!\s*$)([^<\n].*)$/gim,
        '<p class="mt-4 text-tertiary leading-relaxed">$1</p>'
      )
  );
};

/**
 * The generateMetadata for the site.
 * @param props - The PostPageProps.
 * @returns The generateMetadata for the site.
 */
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return createMetadata({
    title: `${post.title} | Gabriel Fonseca`,
    description:
      'Gabriel Fonseca is a computer engineering student living in Lisbon, pt.',
  });
}

/**
 * The PostPage for the site.
 * @param props - The PostPageProps.
 * @returns The PostPage for the site.
 */
export default async function PostPage({
  params,
}: PostPageProps): Promise<JSX.Element> {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const processedContent = processMarkdownContent(post.content);

  return (
    <section
      className="max-w-none"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: This is intentional for markdown processing
      // biome-ignore lint/style/useNamingConvention: This is a React prop name
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
}
