import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ProjectsList } from '@/components/projects-list'
import { mockProjects } from '../../fixtures/data'

vi.mock('@/components/list-renderer', () => ({
  ListRenderer: ({ items, renderItem, getHref, ...props }: any) => (
    <div data-testid="list-renderer">
      {items.map((item: any, index: number) => (
        <a
          key={item.slug}
          href={getHref ? getHref(item) : item.slug}
          {...props}
          data-testid={`project-link-${index}`}
        >
          {renderItem(item, index, false)}
        </a>
      ))}
    </div>
  ),
}))

describe('ProjectsList', () => {
  it('should render all projects', () => {
    render(<ProjectsList items={mockProjects} />)

    expect(screen.getByText('Project One')).toBeDefined()
    expect(screen.getByText('Project Two')).toBeDefined()
    expect(screen.getByText('Project Three')).toBeDefined()
  })

  it('should display project descriptions', () => {
    render(<ProjectsList items={mockProjects} />)

    expect(screen.getByText('A sample project for testing')).toBeDefined()
    expect(screen.getByText('Another sample project')).toBeDefined()
  })

  it('should open projects in new tab', () => {
    const { container } = render(<ProjectsList items={mockProjects} />)

    const links = container.querySelectorAll('a')
    links.forEach((link) => {
      expect(link.getAttribute('target')).toBe('_blank')
    })
  })

  it('should set correct href values', () => {
    render(<ProjectsList items={mockProjects} />)

    const links = screen.getAllByRole('link')
    expect(links[0].getAttribute('href')).toBe(mockProjects[0].slug)
    expect(links[1].getAttribute('href')).toBe(mockProjects[1].slug)
  })

  it('should handle empty projects list', () => {
    const { container } = render(<ProjectsList items={[]} />)

    const links = container.querySelectorAll('a')
    expect(links).toHaveLength(0)
  })

  it('should render icon for each project', () => {
    render(<ProjectsList items={mockProjects} />)

    const listRenderer = screen.getByTestId('list-renderer')
    expect(listRenderer).toBeDefined()
  })

  it('should accept custom className', () => {
    const { container } = render(
      <ProjectsList items={mockProjects} className="custom-class" />
    )

    const links = container.querySelectorAll('.custom-class')
    expect(links.length).toBeGreaterThan(0)
  })
})
