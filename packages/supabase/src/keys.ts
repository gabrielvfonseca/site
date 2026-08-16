import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

/**
 * The keys for the supabase package.
 *
 * Both values are optional: the site is designed to render without a database
 * (the AMA page degrades to an empty list), so an unconfigured environment is a
 * supported state rather than a startup failure. Use {@link isSupabaseConfigured}
 * to branch on it instead of catching a client-construction error.
 * @returns The keys for the supabase package.
 */
export const keys = () =>
	createEnv({
		server: {},
		client: {
			NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
			NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1).optional(),
		},
		runtimeEnv: {
			NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
			NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
				process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
		},
		clientPrefix: "NEXT_PUBLIC_",
		emptyStringAsUndefined: true,
		skipValidation: !!process.env.SKIP_ENV_VALIDATION,
	});

/**
 * Whether a Supabase URL and publishable key are both present.
 *
 * Callers should check this before creating a client so that "no database
 * configured" stays a quiet, expected branch instead of being reported as an
 * application error.
 * @returns `true` when both Supabase credentials are set.
 */
export function isSupabaseConfigured(): boolean {
	const env = keys();
	return Boolean(
		env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
	);
}

/**
 * Read the Supabase credentials, throwing a clear, actionable error when they
 * are missing — rather than letting `supabase-js` fail with `supabaseUrl is
 * required` from deep inside the library.
 * @returns The validated URL and publishable key.
 */
export function requireSupabaseCredentials(): {
	url: string;
	publishableKey: string;
} {
	const env = keys();
	const url = env.NEXT_PUBLIC_SUPABASE_URL;
	const publishableKey = env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

	if (!(url && publishableKey)) {
		throw new Error(
			"Supabase is not configured: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.",
		);
	}

	return { url, publishableKey };
}
