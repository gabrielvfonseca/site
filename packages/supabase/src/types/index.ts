import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./db";

/**
 * A Supabase client bound to this project's generated `Database` schema. Both
 * the browser and server factories return this, so query and mutation helpers
 * accept either interchangeably while staying fully typed.
 */
export type Client = SupabaseClient<Database>;

export * from "./db";
