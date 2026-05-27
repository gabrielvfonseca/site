import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DesignSystemProvider } from '../../src/index';

// Mock AnalyticsProvider
vi.mock('@gabfon/analytics', () => ({
  AnalyticsProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="analytics-provider">{children}</div>
  ),
}));

// Mock ThemeProvider
vi.mock('../../src/providers/theme', () => ({
  ThemeProvider: ({ children, ...props }: any) => (
    <div data-testid="theme-provider" {...props}>
      {children}
    </div>
  ),
}));

// Mock TooltipProvider
vi.mock('../../src/components/tooltip', () => ({
  TooltipProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="tooltip-provider">{children}</div>
  ),
}));

// Mock Toaster
vi.mock('../../src/components/toaster', () => ({
  Toaster: () => <div data-testid="toaster" />,
}));

describe('DesignSystemProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children within all providers', () => {
    render(
      <DesignSystemProvider>
        <div>Test Content</div>
      </DesignSystemProvider>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
    expect(screen.getByTestId('analytics-provider')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip-provider')).toBeInTheDocument();
    expect(screen.getByTestId('toaster')).toBeInTheDocument();
  });

  it('passes theme provider properties correctly', () => {
    render(
      <DesignSystemProvider defaultTheme="dark" enableSystem>
        <div>Test Content</div>
      </DesignSystemProvider>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
  });

  it('maintains correct provider hierarchy', () => {
    render(
      <DesignSystemProvider>
        <div data-testid="test-content">Test Content</div>
      </DesignSystemProvider>
    );

    const themeProvider = screen.getByTestId('theme-provider');
    const analyticsProvider = screen.getByTestId('analytics-provider');
    const tooltipProvider = screen.getByTestId('tooltip-provider');
    const testContent = screen.getByTestId('test-content');
    const toaster = screen.getByTestId('toaster');

    // ThemeProvider should be the outermost provider
    expect(themeProvider).toContainElement(analyticsProvider);
    
    // AnalyticsProvider should contain TooltipProvider and Toaster
    expect(analyticsProvider).toContainElement(tooltipProvider);
    expect(analyticsProvider).toContainElement(toaster);
    
    // TooltipProvider should contain the test content
    expect(tooltipProvider).toContainElement(testContent);
  });

  it('handles optional properties', () => {
    const optionalProps = {
      privacyUrl: 'https://example.com/privacy',
      termsUrl: 'https://example.com/terms',
      helpUrl: 'https://example.com/help',
    };

    render(
      <DesignSystemProvider {...optionalProps}>
        <div>Test Content</div>
      </DesignSystemProvider>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders without any optional properties', () => {
    render(
      <DesignSystemProvider>
        <div>Test Content</div>
      </DesignSystemProvider>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('handles empty children', () => {
    render(<DesignSystemProvider />);
    
    expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
    expect(screen.getByTestId('analytics-provider')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip-provider')).toBeInTheDocument();
    expect(screen.getByTestId('toaster')).toBeInTheDocument();
  });
});
