import { config } from '@/constants/config';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Header } from '../header';

describe('Header', () => {
  it('renders the name and title correctly', () => {
    render(<Header />);

    expect(screen.getByText(config.name.value)).toBeInTheDocument();
    expect(screen.getByText(config.title.value)).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<Header />);

    const nameLink = screen.getByRole('link', { name: config.name.value });
    expect(nameLink).toHaveAttribute('title', config.name.value);
    expect(nameLink).toHaveAttribute('aria-label', config.name.value);
  });
});
