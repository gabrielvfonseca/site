import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { keys } from "../keys";
import type { Database } from "../types";

export const createClient = () => {
	const env = keys();
	return createSupabaseClient<Database>(
		env.NEXT_PUBLIC_SUPABASE_URL,
		env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
	);
};
