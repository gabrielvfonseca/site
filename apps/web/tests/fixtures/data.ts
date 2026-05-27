import type { Project } from '@/models/project.model'
import type { Post } from '@/models/post.model'

export const mockProjects: Project[] = [
  {
    slug: 'https://example.com/project-1',
    title: 'Project One',
    description: 'A sample project for testing',
  },
  {
    slug: 'https://example.com/project-2',
    title: 'Project Two',
    description: 'Another sample project',
  },
  {
    slug: 'https://example.com/project-3',
    title: 'Project Three',
    description: 'Third sample project',
  },
]

export const mockPosts: Post[] = [
  {
    slug: 'first-post',
    title: 'First Post',
    description: 'Introduction to testing',
  },
  {
    slug: 'second-post',
    title: 'Second Post',
    description: 'Advanced testing techniques',
  },
  {
    slug: 'third-post',
    title: 'Third Post',
    description: 'Testing best practices',
  },
]
