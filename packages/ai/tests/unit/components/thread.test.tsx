import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Thread } from '../../../src/components/thread';

// Mock tailwind-merge
vi.mock('tailwind-merge', () => ({
  twMerge: (...classes: string[]) => classes.filter(Boolean).join(' '),
}));

describe('Thread Component', () => {
  it('renders with default styling', () => {
    render(
      <Thread>
        <div>Test content</div>
      </Thread>
    );

    const threadContainer = screen.getByText('Test content').parentElement;
    expect(threadContainer).toHaveClass(
      'flex',
      'flex-1',
      'flex-col',
      'items-start',
      'gap-4',
      'overflow-y-auto',
      'p-8',
      'pb-0'
    );
  });

  it('renders children correctly', () => {
    render(
      <Thread>
        <div data-testid="child1">Child 1</div>
        <div data-testid="child2">Child 2</div>
      </Thread>
    );

    expect(screen.getByTestId('child1')).toBeInTheDocument();
    expect(screen.getByTestId('child2')).toBeInTheDocument();
  });

  it('applies custom className through twMerge', () => {
    render(
      <Thread className="custom-class">
        <div>Test content</div>
      </Thread>
    );

    const threadContainer = screen.getByText('Test content').parentElement;
    expect(threadContainer).toHaveClass(
      'flex',
      'flex-1',
      'flex-col',
      'items-start',
      'gap-4',
      'overflow-y-auto',
      'p-8',
      'pb-0',
      'custom-class'
    );
  });

  it('passes through additional HTML attributes', () => {
    render(
      <Thread data-testid="thread" role="main" aria-label="Message thread">
        <div>Test content</div>
      </Thread>
    );

    const threadContainer = screen.getByTestId('thread');
    expect(threadContainer).toHaveAttribute('role', 'main');
    expect(threadContainer).toHaveAttribute('aria-label', 'Message thread');
  });

  it('handles empty children', () => {
    const { container } = render(<Thread />);

    const threadContainer = container.querySelector('div');
    expect(threadContainer).toBeInTheDocument();
    expect(threadContainer).toBeEmptyDOMElement();
  });

  it('handles complex children structure', () => {
    render(
      <Thread>
        <div>
          <span>Nested content</span>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </div>
      </Thread>
    );

    expect(screen.getByText('Nested content')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('handles onClick event', () => {
    const handleClick = vi.fn();

    render(
      <Thread onClick={handleClick}>
        <div>Test content</div>
      </Thread>
    );

    const threadContainer = screen.getByText('Test content').parentElement;
    threadContainer?.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies inline styles', () => {
    render(
      <Thread style={{ backgroundColor: 'red', padding: '20px' }}>
        <div>Test content</div>
      </Thread>
    );

    const threadContainer = screen.getByText('Test content').parentElement;
    expect(threadContainer).toHaveAttribute('style');
    expect(threadContainer?.style.backgroundColor).toBe('red');
    expect(threadContainer?.style.padding).toBe('20px');
  });
});
