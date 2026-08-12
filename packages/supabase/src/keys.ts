import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

/**
 * The keys for the supabase package.
 * @returns The keys for the supabase package.
 */
export const keys = () =>
	createEnv({
		server: {},
		client: {
			NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
			NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1),
		},
		runtimeEnv: {
			NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
			NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
				process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
		},
		emptyStringAsUndefined: true,
		skipValidation: !!process.env.SKIP_ENV_VALIDATION,
	});
