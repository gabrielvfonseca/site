import { render, screen, cleanup } from '@testing-library/react';
import { describe, expect, it, vi, afterEach } from 'vitest';
import { Header } from '../../src/components/header';

// Mock the config module
vi.mock('../../src/constants/config', () => ({
  config: {
    name: 'Test Site',
    title: 'Test Developer & Designer',
  },
}));

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('Header Component', () => {
  afterEach(() => {
    cleanup();
  });
  it('should render the header with site name and title', () => {
    render(<Header />);

    expect(screen.getByText('Test Site')).toBeTruthy();
    expect(screen.getByText('Test Developer & Designer')).toBeTruthy();
  });

  it('should render a link to the home page', () => {
    render(<Header />);

    const homeLink = screen.getByRole('link', { name: 'Test Site' });
    expect(homeLink).toBeTruthy();
    expect(homeLink.getAttribute('href')).toBe('/');
  });

  it('should have proper accessibility attributes', () => {
    render(<Header />);

    const homeLink = screen.getByRole('link', { name: 'Test Site' });
    expect(homeLink.getAttribute('aria-label')).toBe('Test Site');
    expect(homeLink.getAttribute('title')).toBe('Test Site');
  });

  it('should have correct CSS classes for styling', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    const headerClasses = header.className.split(' ');
    expect(headerClasses).toContain('flex');
    expect(headerClasses).toContain('w-full');
    expect(headerClasses).toContain('items-center');
    expect(headerClasses).toContain('justify-between');
    expect(headerClasses).toContain('tracking-tight');

    const homeLink = screen.getByRole('link', { name: 'Test Site' });
    const linkClasses = homeLink.className.split(' ');
    expect(linkClasses).toContain('mb-px');
    expect(linkClasses).toContain('inline-block');
    expect(linkClasses).toContain('font-medium');
    expect(linkClasses).toContain('text-primary');
    expect(linkClasses).toContain('no-underline');

    const titleElement = screen.getByText('Test Developer & Designer');
    const titleClasses = titleElement.className.split(' ');
    expect(titleClasses).toContain('font-medium');
    expect(titleClasses).toContain('text-quaternary');
    expect(titleClasses).toContain('leading-none');
  });

  it('should render as a semantic header element', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header.tagName).toBe('HEADER');
  });

  it('should handle empty or undefined config values gracefully', () => {
    // Test with mocked empty config
    vi.doMock('../../src/constants/config', () => ({
      config: {
        name: '',
        title: '',
      },
    }));

    render(<Header />);

    // Should still render the structure even with empty values
    const header = screen.getByRole('banner');
    expect(header).toBeTruthy();
  });
});
