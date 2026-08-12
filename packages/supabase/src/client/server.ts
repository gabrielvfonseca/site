import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../types";

export async function createClient() {
	const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

	if (!url || !key) {
		throw new Error(
			"Missing Supabase environment variables. Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY are set.",
		);
	}

	return createSupabaseClient<Database>(url, key);
}
