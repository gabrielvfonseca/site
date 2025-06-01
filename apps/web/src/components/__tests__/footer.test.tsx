import { config } from '@/constants/config';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Footer } from '../footer';

describe('Footer', () => {
  it('renders the copyright notice with current year', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear}. All rights reserved.`)
    ).toBeInTheDocument();
  });

  it('renders all social links', () => {
    render(<Footer />);

    for (const [, value] of Object.entries(config.social)) {
      const link = screen.getByRole('link', { name: value.alt });
      expect(link).toHaveAttribute('href', value.url);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });
});
