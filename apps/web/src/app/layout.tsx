import "@/styles/main.css";
import { AnalyticsProvider } from "@gabfon/analytics";
import { Toaster } from "@gabfon/design-system/components/toaster";
import { TooltipProvider } from "@gabfon/design-system/components/tooltip";
import { ThemeProvider } from "@gabfon/design-system/providers/theme";
import { createMetadata } from "@gabfon/seo/metadata";
import { createViewport } from "@gabfon/seo/viewport";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { SkipNav } from "@/components/accessibility/skip-nav";
import { QueryProvider } from "@/components/providers/query-provider";
import { ThemeInitScript } from "@/components/theme-init-script";
import { meta } from "@/config/metadata";
import { cn } from "@/lib/utils";

const geist = localFont({
	src: [
		{ path: "../../assets/fonts/Geist-400.ttf", weight: "400" },
		{ path: "../../assets/fonts/Geist-500.ttf", weight: "500" },
		{ path: "../../assets/fonts/Geist-600.ttf", weight: "600" },
		{ path: "../../assets/fonts/Geist-700.ttf", weight: "700" },
	],
	variable: "--font-sans",
	display: "swap",
});

/**
 * The viewport for the site.
 * @returns The viewport for the site.
 */
export const viewport: Viewport = createViewport();

/**
 * The metadata for the site.
 * @returns The metadata for the site.
 */
export const metadata: Metadata = createMetadata({ ...meta, pathname: "/" });

/**
 * The RootLayoutProps for the site.
 */
interface RootLayoutProps {
	/**
	 * The children for the site.
	 */
	readonly children: ReactNode;
}

/**
 * The RootLayout for the site.
 * @param props - The RootLayoutProps.
 * @returns The RootLayout for the site.
 */
export default function Layout({ children }: RootLayoutProps) {
	return (
		<html
			className={cn(geist.className, "font-sans")}
			lang="en"
			suppressHydrationWarning
		>
			<body className="min-h-screen bg-background text-foreground">
				<SkipNav />
				<ThemeInitScript />
				<QueryProvider>
					<ThemeProvider defaultTheme="dark" enableSystem>
						<AnalyticsProvider>
							<TooltipProvider>{children}</TooltipProvider>
							<Toaster />
						</AnalyticsProvider>
					</ThemeProvider>
				</QueryProvider>
			</body>
		</html>
	);
}
