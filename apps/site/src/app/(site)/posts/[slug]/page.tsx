import { getCachedPublishedPosts } from '@/data-access/cache/post-cache';
import type { Post } from '@/types/posts';
import { components } from '@repo/mdx/components';
import { MdxRemote } from '@repo/mdx/remote';
import { serialize } from '@repo/mdx/serialize';
import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { JSX, ReactNode } from 'react';

type PostPageProps = {
  readonly children: ReactNode;
  readonly params: Promise<{
    slug: string;
  }>;
};

const getPost = async (slug: string): Promise<Post | undefined> => {
  const allPosts = await getCachedPublishedPosts();

  return allPosts.find((post: Post) => post.slug === slug);
};

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

export default async function PostPage({
  params,
}: PostPageProps): Promise<JSX.Element> {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const source = await serialize(post.content);

  return (
    <>
      <MdxRemote {...source} components={components} />
    </>
  );
}
