import { AnalyticsProvider } from "@gabfon/analytics";
import { Toaster } from "./components/toaster";
import { TooltipProvider } from "./components/tooltip";
import type { ThemeProviderProps } from "./providers/theme";
import { ThemeProvider } from "./providers/theme";

export * from "./lib/utils";

interface DesignSystemProviderProperties extends ThemeProviderProps {
	privacyUrl?: string;
	termsUrl?: string;
	helpUrl?: string;
}

/**
 * The DesignSystemProvider for the site.
 * @param props - The DesignSystemProviderProperties.
 * @returns The DesignSystemProvider for the site.
 */
export function DesignSystemProvider({
	children,
	privacyUrl,
	termsUrl,
	helpUrl,
	...properties
}: DesignSystemProviderProperties) {
	return (
		<ThemeProvider {...properties}>
			<AnalyticsProvider>
				<TooltipProvider>{children}</TooltipProvider>
				<Toaster />
			</AnalyticsProvider>
		</ThemeProvider>
	);
}
