import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { requireSupabaseCredentials } from "../keys";
import type { Database } from "../types";

/**
 * Create a Supabase client for server-side use.
 * @returns The Supabase client, bound to this project's `Database` schema.
 */
// biome-ignore lint/suspicious/useAwait: async signature is this package's server-client contract
export async function createClient() {
	const { url, publishableKey } = requireSupabaseCredentials();
	return createSupabaseClient<Database>(url, publishableKey);
}
