import { ThemeProvider as NextThemeProvider } from "next-themes";
import type { ThemeProviderProps as NextThemeProviderProps } from "next-themes";

export { useTheme } from "next-themes";

export type ThemeProviderProps = NextThemeProviderProps;

export const ThemeProvider = ({
  children,
  ...properties
}: ThemeProviderProps) => (
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
