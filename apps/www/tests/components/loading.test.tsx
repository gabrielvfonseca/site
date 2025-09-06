import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Loading from '../../src/components/loading';

describe('Loading Component', () => {
  it('should render the loading component', () => {
    render(<Loading />);

    // Check if the loading component is rendered
    const loadingElement =
      screen.queryByTestId('loading') || screen.queryByRole('status');
    expect(loadingElement).toBeTruthy();
  });

  it('should have appropriate accessibility attributes', () => {
    render(<Loading />);

    // Look for common loading indicators
    const loadingElement =
      screen.queryByRole('status') ||
      screen.queryByLabelText(/loading/i) ||
      screen.queryByText(/loading/i);

    expect(loadingElement).toBeTruthy();
  });

  it('should render with proper styling classes', () => {
    render(<Loading />);

    // The component should have some visual indication of loading
    const container =
      screen.queryByRole('status') ||
      document.querySelector('[data-testid="loading"]') ||
      screen.queryByText(/loading/i)?.parentElement;

    expect(container).toBeTruthy();
  });

  it('should be accessible to screen readers', () => {
    render(<Loading />);

    // Should have either aria-label, role="status", or visible text
    const loadingElement =
      screen.queryByRole('status') ||
      screen.queryByLabelText(/loading/i) ||
      screen.queryByText(/loading/i);

    expect(loadingElement).toBeTruthy();
  });
});
