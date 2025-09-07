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
    const loadingElements = screen.getAllByTestId('loading');
    expect(loadingElements.length).toBeGreaterThan(0);
    
    // Check that at least one has the proper attributes
    const hasProperAttributes = loadingElements.some(element => 
      element.getAttribute('role') === 'status' && 
      element.getAttribute('aria-label') === 'Loading content'
    );
    expect(hasProperAttributes).toBe(true);
  });

  it('should render with proper styling classes', () => {
    render(<Loading />);

    // The component should have some visual indication of loading
    const loadingElements = screen.getAllByTestId('loading');
    expect(loadingElements.length).toBeGreaterThan(0);
    
    // Check that at least one has the proper classes
    const hasProperClasses = loadingElements.some(element => 
      element.classList.contains('flex') && 
      element.classList.contains('flex-col') && 
      element.classList.contains('gap-4')
    );
    expect(hasProperClasses).toBe(true);
  });

  it('should be accessible to screen readers', () => {
    render(<Loading />);

    // Should have either aria-label, role="status", or visible text
    const loadingElements = screen.getAllByTestId('loading');
    expect(loadingElements.length).toBeGreaterThan(0);
    
    // Check that at least one is accessible
    const isAccessible = loadingElements.some(element => 
      element.getAttribute('role') === 'status' || 
      element.getAttribute('aria-label')?.includes('Loading')
    );
    expect(isAccessible).toBe(true);
  });
});
