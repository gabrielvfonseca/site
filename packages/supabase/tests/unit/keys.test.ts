import { describe, expect, test, vi } from "vitest";

describe("Supabase Keys", () => {
	test("should return environment variables when set", async () => {
		// Set up mock environment variables
		vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://example.supabase.co");
		vi.stubEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", "public-anon-key");

		// Reset the module to get the fresh keys function with the mocked env
		vi.resetModules();
		const { keys } = await import("../../src/keys");

		const env = keys();

		expect(env.NEXT_PUBLIC_SUPABASE_URL).toBe("https://example.supabase.co");
		expect(env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY).toBe("public-anon-key");
	});

	test("reports configured when both credentials are present", async () => {
		vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://example.supabase.co");
		vi.stubEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", "public-anon-key");

		vi.resetModules();
		const { isSupabaseConfigured, requireSupabaseCredentials } = await import(
			"../../src/keys"
		);

		expect(isSupabaseConfigured()).toBe(true);
		expect(requireSupabaseCredentials()).toEqual({
			url: "https://example.supabase.co",
			publishableKey: "public-anon-key",
		});
	});

	test("running without credentials is a supported, non-throwing state", async () => {
		// An unconfigured environment must not fail at startup: the site renders
		// without a database and the AMA page degrades to an empty list.
		vi.unstubAllEnvs();
		vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "");
		vi.stubEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", "");

		vi.resetModules();
		const { keys, isSupabaseConfigured } = await import("../../src/keys");

		expect(() => keys()).not.toThrow();
		expect(isSupabaseConfigured()).toBe(false);
	});

	test("requiring credentials fails loudly with an actionable message", async () => {
		vi.unstubAllEnvs();
		vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "");
		vi.stubEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", "");

		vi.resetModules();
		const { requireSupabaseCredentials } = await import("../../src/keys");

		expect(() => requireSupabaseCredentials()).toThrow(
			/Supabase is not configured/,
		);
	});
});
