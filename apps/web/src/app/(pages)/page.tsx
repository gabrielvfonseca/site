import { config } from '@/constants/config';
import { posts } from '@/constants/posts';
import { projects } from '@/constants/projects';
import { PostList } from '@/features/posts/post-list';
import { ProjectList } from '@/features/projects/project-list';
import { Skeleton } from '@repo/design-system/components/ui/skeleton';
import React from 'react';

export default function Homepage() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <p className="font-medium text-primary">
          I'm a Lisbon-based software developer, founder, and Computer
          Engineering student at{' '}
          <a
            href="https://www.fct.unl.pt"
            className="text-link hover:text-link-hover"
          >
            NOVA School of Science and Technology
          </a>
          .
        </p>
        <p>
          I’m currently building an AI-powered platform to streamline business
          operations and decision-making. As the founder, I’m deeply involved in
          product development and user research.
        </p>
        <p>
          Outside of my startup, I engage in full-stack development for
          freelance and personal projects, always seeking to solve real-world
          problems creatively. I’m an active participant in the tech, business,
          and startup communities, constantly learning and iterating.
        </p>
        <p>
          I’m open to connecting with fellow builders, potential collaborators,
          and anyone interested in AI, productivity, and organizational clarity.
          Feel free to reach out on{' '}
          <a
            href={config.social.twitter.url}
            className="text-link hover:text-link-hover"
          >
            {config.social.twitter.alt}
          </a>
          ,{' '}
          <a
            href={config.social.linkedin.url}
            className="text-link hover:text-link-hover"
          >
            {config.social.linkedin.alt}
          </a>
          , or{' '}
          <a
            href={config.social.github.url}
            className="text-link hover:text-link-hover"
          >
            {config.social.github.alt}
          </a>
          .
        </p>
      </div>

      {projects.length > 0 && (
        <div className="flex flex-col gap-4">
          <h4 className="heading-16">Projects</h4>
          <React.Suspense fallback={<Skeleton className="h-8 w-full" />}>
            <ProjectList />
          </React.Suspense>
        </div>
      )}

      {posts.length > 0 && (
        <div className="flex flex-col gap-4">
          <h4 className="heading-16">Writing</h4>
          <React.Suspense fallback={<Skeleton className="h-8 w-full" />}>
            <PostList />
          </React.Suspense>
        </div>
      )}
    </div>
  );
}
