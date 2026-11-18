import { parseError } from "@gabfon/observability";
import { secure } from "@gabfon/security";
import { noseconeMiddleware, noseconeOptions } from "@gabfon/security/proxy";
import { type NextRequest, NextResponse } from "next/server";
import { env } from "@/config/env";
import { checkRateLimit, rateLimitHeaders } from "@/lib/rate-limit";

const securityHeaders = noseconeMiddleware(noseconeOptions);

/**
 * Domain to locale mapping for domain-based i18n.
 * Add your domains and their corresponding locales here.
 */
const domainLocaleMap: Record<string, string> = {
	// Example: "es.example.com": "es",
	// Example: "fr.example.com": "fr",
	// Example: "de.example.com": "de",
	// "example.com": "en", // Default locale
};

/**
 * Default locale when no domain matches.
 */
const _DEFAULT_LOCALE = "en";

/**
 * Supported locales.
 */
const SUPPORTED_LOCALES = ["en", "es", "fr", "de"];

/**
 * Checks if a pathname already has a locale prefix.
 */
function _hasLocalePrefix(pathname: string): boolean {
	return SUPPORTED_LOCALES.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
	);
}

/**
 * Extracts locale from pathname if present.
 */
function getLocaleFromPathname(pathname: string): string | null {
	for (const locale of SUPPORTED_LOCALES) {
		if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
			return locale;
		}
	}
	return null;
}

/**
 * Removes locale prefix from pathname.
 */
function removeLocalePrefix(pathname: string): string {
	for (const locale of SUPPORTED_LOCALES) {
		if (pathname.startsWith(`/${locale}/`)) {
			return pathname.slice(locale.length + 1) || "/";
		}
		if (pathname === `/${locale}`) {
			return "/";
		}
	}
	return pathname;
}

/**
 * Handles domain-based i18n routing.
 * Maps domains to locales and rewrites URLs to include locale prefix.
 */
function handleI18n(request: NextRequest): NextResponse | null {
	const { hostname, pathname } = request.nextUrl;

	// Skip API routes, static files, and Next.js internals
	if (
		pathname.startsWith("/api/") ||
		pathname.startsWith("/_next/") ||
		pathname.startsWith("/static/") ||
		pathname.includes(".") ||
		pathname === "/favicon.ico"
	) {
		return null;
	}

	// Check if the hostname matches a configured domain
	const localeFromDomain = domainLocaleMap[hostname];

	// If no domain mapping, continue without locale prefix (or use default)
	if (!localeFromDomain) {
		return null;
	}

	// If pathname already has a locale prefix, check if it matches the domain locale
	const existingLocale = getLocaleFromPathname(pathname);

	if (existingLocale) {
		// If the existing locale doesn't match the domain locale, redirect
		if (existingLocale !== localeFromDomain) {
			const newPathname = `/${localeFromDomain}${removeLocalePrefix(pathname)}`;
			const url = request.nextUrl.clone();
			url.pathname = newPathname;
			return NextResponse.redirect(url);
		}
		// Locale matches, continue
		return null;
	}

	// No locale prefix, add the domain's locale
	const newPathname = `/${localeFromDomain}${pathname}`;
	const url = request.nextUrl.clone();
	url.pathname = newPathname;

	// Use rewrite instead of redirect to keep the domain in the URL bar
	return NextResponse.rewrite(url);
}

// IP-based rate limiting for all matched routes. No-ops without Vercel KV.
const rateLimitMiddleware = async (request: NextRequest) => {
	const result = await checkRateLimit(request, {
		prefix: "gabfon:mw",
		requests: 100,
		window: "60 s",
	});

	if (result && !result.success) {
		return NextResponse.json(
			{ error: "Too many requests. Please slow down." },
			{ status: 429, headers: rateLimitHeaders(result) },
		);
	}
};

// Custom middleware for Arcjet security checks
const arcjetMiddleware = async (request: NextRequest) => {
	if (!env.ARCJET_KEY) {
		return;
	}

	try {
		await secure(
			[
				// See https://docs.arcjet.com/bot-protection/identifying-bots
				"CATEGORY:SEARCH_ENGINE", // Allow search engines
				"CATEGORY:PREVIEW", // Allow preview links to show OG images
				"CATEGORY:MONITOR", // Allow uptime monitoring services
			],
			request,
		);
	} catch (error) {
		const message = parseError(error);
		return NextResponse.json({ error: message }, { status: 403 });
	}
};

export default async function proxy(request: NextRequest) {
	// Handle domain-based i18n routing first
	const i18nResponse = handleI18n(request);
	if (i18nResponse) {
		return i18nResponse;
	}

	// Rate limit first (cheapest rejection).
	const rateLimitResponse = await rateLimitMiddleware(request);
	if (rateLimitResponse) {
		return rateLimitResponse;
	}

	// Run security headers.
	const headersResponse = securityHeaders();

	// Run Arcjet middleware (bot/shield protection).
	const arcjetResponse = await arcjetMiddleware(request);
	if (arcjetResponse) {
		return arcjetResponse;
	}

	// Return headers response
	return headersResponse;
}

export const config = {
	// matcher tells Next.js which routes to run the middleware on. This runs the
	// middleware on all routes except for static assets and Posthog ingest
	matcher: ["/((?!_next/static|_next/image|ingest|favicon.ico).*)"],
};
