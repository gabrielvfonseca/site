import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { PostsList } from '@/components/posts-list'
import { mockPosts } from '../../fixtures/data'

vi.mock('@/components/list-renderer', () => ({
  ListRenderer: ({ items, renderItem, getHref, ...props }: any) => (
    <div data-testid="list-renderer">
      {items.map((item: any, index: number) => (
        <a
          key={item.slug}
          href={getHref ? getHref(item) : item.slug}
          {...props}
          data-testid={`post-link-${index}`}
        >
          {renderItem(item, index, false)}
        </a>
      ))}
    </div>
  ),
}))

describe('PostsList', () => {
  it('should render all posts', () => {
    render(<PostsList items={mockPosts} />)

    expect(screen.getByText('First Post')).toBeDefined()
    expect(screen.getByText('Second Post')).toBeDefined()
    expect(screen.getByText('Third Post')).toBeDefined()
  })

  it('should display post descriptions', () => {
    render(<PostsList items={mockPosts} />)

    expect(screen.getByText('Introduction to testing')).toBeDefined()
    expect(screen.getByText('Advanced testing techniques')).toBeDefined()
  })

  it('should set correct internal href values', () => {
    render(<PostsList items={mockPosts} />)

    const links = screen.getAllByRole('link')
    expect(links[0].getAttribute('href')).toBe(`/posts/${mockPosts[0].slug}`)
    expect(links[1].getAttribute('href')).toBe(`/posts/${mockPosts[1].slug}`)
  })

  it('should not open posts in new tab', () => {
    const { container } = render(<PostsList items={mockPosts} />)

    const links = container.querySelectorAll('a')
    links.forEach((link) => {
      expect(link.getAttribute('target')).not.toBe('_blank')
    })
  })

  it('should handle empty posts list', () => {
    const { container } = render(<PostsList items={[]} />)

    const links = container.querySelectorAll('a')
    expect(links).toHaveLength(0)
  })

  it('should accept custom className', () => {
    const { container } = render(
      <PostsList items={mockPosts} className="custom-class" />
    )

    const links = container.querySelectorAll('.custom-class')
    expect(links.length).toBeGreaterThan(0)
  })

  it('should maintain consistent structure', () => {
    render(<PostsList items={mockPosts} />)

    const listRenderer = screen.getByTestId('list-renderer')
    expect(listRenderer).toBeDefined()

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(mockPosts.length)
  })
})
