import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeAll, vi } from 'vitest'
import { ListRenderer, type ListItem } from '@/components/list-renderer'

beforeAll(() => {
  // Mock window.matchMedia for prefers-reduced-motion
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
})

interface TestItem extends ListItem {
  slug: string
  title: string
  description?: string
}

const mockItems: TestItem[] = [
  { slug: 'item-1', title: 'Item 1', description: 'First item' },
  { slug: 'item-2', title: 'Item 2', description: 'Second item' },
  { slug: 'item-3', title: 'Item 3', description: 'Third item' },
]

describe('ListRenderer', () => {
  it('should render all items', () => {
    render(
      <ListRenderer
        items={mockItems}
        renderItem={(item) => <div>{item.title}</div>}
        getHref={(item) => `/${item.slug}`}
      />
    )

    expect(screen.getByText('Item 1')).toBeDefined()
    expect(screen.getByText('Item 2')).toBeDefined()
    expect(screen.getByText('Item 3')).toBeDefined()
  })

  it('should use custom href getter', () => {
    render(
      <ListRenderer
        items={mockItems}
        renderItem={(item) => <div>{item.title}</div>}
        getHref={(item) => `/custom/${item.slug}`}
      />
    )

    const links = screen.getAllByRole('listitem')
    expect(links[0].getAttribute('href')).toBe('/custom/item-1')
    expect(links[1].getAttribute('href')).toBe('/custom/item-2')
  })

  it('should default to item slug as href', () => {
    render(
      <ListRenderer
        items={mockItems}
        renderItem={(item) => <div>{item.title}</div>}
      />
    )

    const links = screen.getAllByRole('listitem')
    expect(links[0].getAttribute('href')).toBe('item-1')
  })

  it('should handle hover state', () => {
    render(
      <ListRenderer
        items={mockItems}
        renderItem={(item, index, isHovered) => (
          <div data-testid={`item-${index}`}>
            {item.title} {isHovered && '(hovered)'}
          </div>
        )}
        getHref={(item) => `/${item.slug}`}
      />
    )

    const firstLink = screen.getByRole('listitem', { name: /Item 1/ })
    fireEvent.mouseEnter(firstLink)

    expect(screen.getByText(/Item 1.*hovered/)).toBeDefined()
  })

  it('should remove hover state on mouse leave', () => {
    render(
      <ListRenderer
        items={mockItems}
        renderItem={(item, index, isHovered) => (
          <div data-testid={`item-${index}`}>
            {item.title} {isHovered && '(hovered)'}
          </div>
        )}
        getHref={(item) => `/${item.slug}`}
      />
    )

    const firstLink = screen.getByRole('listitem', { name: /Item 1/ })
    fireEvent.mouseEnter(firstLink)
    fireEvent.mouseLeave(firstLink)

    expect(screen.queryByText(/Item 1.*hovered/)).toBeNull()
  })

  it('should apply custom className', () => {
    const { container } = render(
      <ListRenderer
        items={mockItems}
        renderItem={(item) => <div>{item.title}</div>}
        getHref={(item) => `/${item.slug}`}
        className="custom-class"
      />
    )

    const links = container.querySelectorAll('a')
    links.forEach((link) => {
      expect(link.className).toContain('custom-class')
    })
  })

  it('should apply custom containerClassName', () => {
    const { container } = render(
      <ListRenderer
        items={mockItems}
        renderItem={(item) => <div>{item.title}</div>}
        getHref={(item) => `/${item.slug}`}
        containerClassName="custom-container"
      />
    )

    const containerDiv = container.querySelector('.custom-container')
    expect(containerDiv).toBeDefined()
  })

  it('should pass through additional props', () => {
    const { container } = render(
      <ListRenderer
        items={mockItems}
        renderItem={(item) => <div>{item.title}</div>}
        getHref={(item) => `/${item.slug}`}
        target="_blank"
      />
    )

    const links = container.querySelectorAll('a')
    links.forEach((link) => {
      expect(link.getAttribute('target')).toBe('_blank')
    })
  })

  it('should render empty list', () => {
    const { container } = render(
      <ListRenderer
        items={[]}
        renderItem={(item) => <div>{item.title}</div>}
        getHref={(item) => `/${item.slug}`}
      />
    )

    const links = container.querySelectorAll('a')
    expect(links).toHaveLength(0)
  })
})
