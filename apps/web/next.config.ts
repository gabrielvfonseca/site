import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { config, withAnalyzer } from "@gabfon/next-config";
import { withLogging, withSentry } from "@gabfon/observability/next-config";
import { withVercelToolbar } from "@vercel/toolbar/plugins/next";
import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

// Repo root (two levels up from apps/web). Used as the file-tracing root so the
// `standalone` build bundles hoisted workspace dependencies from the monorepo.
const monorepoRoot = join(dirname(fileURLToPath(import.meta.url)), "../..");

const withToolbar = (cfg: object) =>
	process.env.FLAGS_SECRET ? withVercelToolbar()(cfg) : cfg;

let nextConfig: NextConfig = withToolbar(
	withLogging({
		...config,
		// Self-contained server bundle for the Docker runtime image.
		output: "standalone",
		outputFileTracingRoot: monorepoRoot,
		// Allow the dev server to serve HMR/`_next` resources to other devices on
		// the local network (phone testing, hotspot). Private ranges only, and only
		// in development — the option is ignored by production builds.
		allowedDevOrigins: [
			"192.168.*.*",
			"10.*.*.*",
			"172.16.*.*",
			"172.20.*.*",
			"*.local",
		],
		// The `opengraph-image`/`twitter-image` routes read bundled Geist TTFs at
		// runtime; ensure file tracing ships them with the serverless functions.
		outputFileTracingIncludes: {
			"/opengraph-image": ["./apps/web/assets/fonts/*.ttf"],
			"/twitter-image": ["./apps/web/assets/fonts/*.ttf"],
			"/posts/[slug]/opengraph-image": ["./apps/web/assets/fonts/*.ttf"],
			"/projects/[slug]/opengraph-image": ["./apps/web/assets/fonts/*.ttf"],
		},
		pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
		// i18n configuration for path-prefix routing (vinext supports this)
		i18n: {
			locales: ["en", "es", "fr", "de"],
			defaultLocale: "en",
			localeDetection: false, // We handle locale detection in middleware
		},
		transpilePackages: [
			"@gabfon/analytics",
			"@gabfon/next-config",
			"@gabfon/observability",
			"@gabfon/design-system",
			"@gabfon/rate-limit",
			"@gabfon/security",
			"@gabfon/seo",
			"@gabfon/spotify",
			"@gabfon/supabase",
			"@gabfon/strava",
			"@gabfon/github",
			"@gabfon/email",
			"@gabfon/seo",
		],
		experimental: {
			globalNotFound: true,
			prefetchInlining: true,
			// cachedNavigations requires cacheComponents (PPR) which is not supported in vinext
			// Use "use cache" directive instead for granular caching
			appNewScrollHandler: true,
			inlineCss: true,
			turbopackFileSystemCacheForDev: true,
		},
		images: {
			formats: ["image/avif", "image/webp"],
			remotePatterns: [
				{
					protocol: "https",
					hostname: "avatars.githubusercontent.com",
				},
				{
					protocol: "https",
					hostname: "images.unsplash.com",
				},
				// Placeholder image host for the bio gallery (swap for your own photos).
				{
					protocol: "https",
					hostname: "picsum.photos",
				},
				{
					protocol: "https",
					hostname: "fastly.picsum.photos",
				},
				// Additional common image hosts for better @unpic/react detection
				{
					protocol: "https",
					hostname: "*.cloudinary.com",
				},
				{
					protocol: "https",
					hostname: "*.imgix.net",
				},
				{
					protocol: "https",
					hostname: "cdn.sanity.io",
				},
				{
					protocol: "https",
					hostname: "images.ctfassets.net",
				},
				{
					protocol: "https",
					hostname: "media.graphcms.com",
				},
			],
			// Custom loader for images not on supported CDNs
			// This allows vinext to optimize remote images via Cloudflare Images
			loader: "custom",
			loaderFile: "@/lib/image-loader",
		},
		// PPR not supported in vinext - use "use cache" directive instead
		// cacheComponents: true,
		devIndicators: false,
		// Production optimizations and security
		poweredByHeader: false,
		reactStrictMode: true,
	}),
);

if (process.env.VERCEL) {
	nextConfig = withSentry(nextConfig);
}

if (process.env.ANALYZE === "true") {
	nextConfig = withAnalyzer(nextConfig);
}

const withMdx = createMDX();

export default withMdx(nextConfig);
