/**
 * Custom image loader for Next.js / vinext.
 *
 * This loader allows optimization of remote images that aren't on supported
 * @unpic/react CDNs by routing them through Cloudflare Images.
 *
 * For local images (relative paths), vinext automatically uses the
 * `/_next/image` endpoint with Cloudflare Images optimization.
 *
 * For remote images on supported CDNs (Cloudinary, Imgix, etc.),
 * @unpic/react handles optimization automatically.
 *
 * For remote images NOT on supported CDNs, this custom loader
 * routes them through Cloudflare Images for optimization.
 */

import type { ImageLoaderProps } from "next/image";

/**
 * List of hostnames that @unpic/react supports natively.
 * Images from these hosts will be optimized by their respective CDNs.
 * See: https://unpic.pics/providers
 */
const SUPPORTED_CDN_HOSTNAMES = new Set([
	"res.cloudinary.com",
	"images.ctfassets.net",
	"cdn.sanity.io",
	"media.graphcms.com",
	"images.unsplash.com",
	"avatars.githubusercontent.com",
	"picsum.photos",
	"fastly.picsum.photos",
	"imgix.net",
	"cloudinary.com",
	"ik.imagekit.io",
	"imagekit.io",
	"cloudflareimages.com",
	"images.wsrv.nl",
	"images.weserv.nl",
]);

/**
 * Check if a URL is from a supported CDN that @unpic/react can optimize.
 */
function isSupportedCDN(url: string): boolean {
	try {
		const parsed = new URL(url);
		// Check exact hostname match
		if (SUPPORTED_CDN_HOSTNAMES.has(parsed.hostname)) {
			return true;
		}
		// Check subdomain matches for common CDN patterns
		for (const hostname of SUPPORTED_CDN_HOSTNAMES) {
			if (parsed.hostname.endsWith(`.${hostname}`)) {
				return true;
			}
		}
		return false;
	} catch {
		return false;
	}
}

/**
 * Custom image loader function.
 *
 * For local images (relative paths), vinext handles optimization via /_next/image
 * For remote images on supported CDNs, @unpic/react handles optimization
 * For remote images NOT on supported CDNs, we route through Cloudflare Images
 */
export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
	// Local images (relative paths) - vinext handles via /_next/image
	if (src.startsWith("/") || src.startsWith("./") || src.startsWith("../")) {
		// Return the URL that vinext's image optimizer will handle
		// The actual optimization happens at /_next/image endpoint
		const params = new URLSearchParams();
		params.set("url", src);
		if (width) params.set("w", width.toString());
		if (quality) params.set("q", quality.toString());
		return `/_next/image?${params.toString()}`;
	}

	// Remote images - check if on supported CDN
	if (isSupportedCDN(src)) {
		// Let @unpic/react handle optimization for supported CDNs
		return src;
	}

	// Remote images NOT on supported CDNs - route through Cloudflare Images
	// This uses the Cloudflare Images binding to optimize on-the-fly
	const params = new URLSearchParams();
	params.set("url", src);
	if (width) params.set("w", width.toString());
	if (quality) params.set("q", quality.toString());
	return `/_next/image?${params.toString()}`;
}