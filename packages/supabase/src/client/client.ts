import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { requireSupabaseCredentials } from "../keys";
import type { Database } from "../types";

/**
 * Create a Supabase client for browser use.
 * @returns The Supabase client, bound to this project's `Database` schema.
 */
export const createClient = () => {
	const { url, publishableKey } = requireSupabaseCredentials();
	return createSupabaseClient<Database>(url, publishableKey);
};
