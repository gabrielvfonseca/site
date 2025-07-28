import { getCachedPublishedPosts } from '@/data-access/cache/post-cache';
import type { Post } from '@/types/posts';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import type React from 'react';

type PostLayoutProps = {
  readonly children: ReactNode;
  readonly params: Promise<{
    slug: string;
  }>;
};

export default async function PostLayout({
  children,
  params,
}: PostLayoutProps): Promise<React.JSX.Element> {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  const allPosts = await getCachedPublishedPosts();

  const post = allPosts.find((post: Post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return <article className="flex min-h-[500px] flex-col">{children}</article>;
}
