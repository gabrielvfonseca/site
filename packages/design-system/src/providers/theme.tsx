import {
  ThemeProvider as NextThemeProvider,
  type ThemeProviderProps as NextThemeProviderProps,
} from 'next-themes';

export const ThemeProvider = ({
  children,
  ...properties
}: NextThemeProviderProps) => (
  <NextThemeProvider
    attribute="class"
    defaultTheme="system"
    disableTransitionOnChange
    enableSystem
    {...properties}
  >
    {children}
  </NextThemeProvider>
);
