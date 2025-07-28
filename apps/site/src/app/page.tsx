import { Posts } from '@/components/posts';
import { Projects } from '@/components/projects';
import { config } from '@/constants/config';
import { getCachedPublishedPosts } from '@/data-access/cache/post-cache';
import { getCachedAllProjects } from '@/data-access/cache/project-cache';
import type { Post } from '@/types/posts';
import type { Project } from '@/types/projects';
import { Skeleton } from '@repo/design-system/components/skeleton';
import Link from 'next/link';
import { type JSX, Suspense } from 'react';

export default async function Page(): Promise<JSX.Element> {
  const posts: Post[] = await getCachedPublishedPosts();
  const projects: Project[] = await getCachedAllProjects();

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <p className="font-medium text-primary">
          I'm a Lisbon-based software developer, founder, and Computer
          Engineering student at{' '}
          <Link
            href="https://www.fct.unl.pt"
            aria-label="NOVA School of Science and Technology"
            title="NOVA School of Science and Technology"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link hover:text-link-hover"
          >
            NOVA School of Science and Technology
          </Link>
          .
        </p>
        <p>
          I'm currently building an AI-powered platform to streamline business
          operations and decision-making. As the founder, I'm deeply involved in
          product development and user research.
        </p>
        <p>
          Outside of my startup, I engage in full-stack development for
          freelance and personal projects, always seeking to solve real-world
          problems creatively. I'm an active participant in the tech, business,
          and startup communities, constantly learning and iterating.
        </p>
        <p>
          I'm open to connecting with fellow builders, potential collaborators,
          and anyone interested in AI, productivity, and organizational clarity.
          Feel free to reach out on{' '}
          <Link
            href={config.social.twitter.url}
            aria-label={config.social.twitter.alt}
            title={config.social.twitter.alt}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link hover:text-link-hover"
          >
            {config.social.twitter.alt}
          </Link>
          ,{' '}
          <Link
            href={config.social.linkedin.url}
            aria-label={config.social.linkedin.alt}
            title={config.social.linkedin.alt}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link hover:text-link-hover"
          >
            {config.social.linkedin.alt}
          </Link>
          , or{' '}
          <Link
            href={config.social.github.url}
            aria-label={config.social.github.alt}
            title={config.social.github.alt}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link hover:text-link-hover"
          >
            {config.social.github.alt}
          </Link>
          . If you'd like to schedule a meeting, you can do so{' '}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            aria-label={config.schedule.alt}
            title={config.schedule.alt}
            href={config.schedule.url}
            className="text-link hover:text-link-hover"
          >
            here
          </Link>
          {' or '}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={config.email.url}
            aria-label={config.email.alt}
            title={config.email.alt}
            className="text-link hover:text-link-hover"
          >
            email me
          </Link>
          .
        </p>
      </div>

      {projects && (
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h4>Projecs</h4>
            <Link
              href="/projects"
              className="text-quaternary text-xs transition-color duration-300 hover:text-tertiary"
            >
              View more
            </Link>
          </div>
          <Suspense fallback={<Skeleton className="h-8 w-full" />}>
            <Projects />
          </Suspense>
        </section>
      )}

      {posts && (
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h4>Posts</h4>
            <Link
              href="/posts"
              className="text-quaternary text-xs transition-color duration-300 hover:text-tertiary"
            >
              View more
            </Link>
          </div>
          <Suspense fallback={<Skeleton className="h-8 w-full" />}>
            <Posts />
          </Suspense>
        </section>
      )}
    </div>
  );
}
