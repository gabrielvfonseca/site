import { describe, expect, test, vi } from "vitest";
import { keys } from "../src/keys";

describe("Supabase Keys", () => {
	test("should return environment variables when set", () => {
		// Set up mock environment variables
		vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://example.supabase.co");
		vi.stubEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", "public-anon-key");

		// Reset the module to get the fresh keys function with the mocked env
		vi.resetModules();
		const { keys } = require("../src/keys");

		const env = keys();

		expect(env.NEXT_PUBLIC_SUPABASE_URL).toBe("https://example.supabase.co");
		expect(env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY).toBe("public-anon-key");
	});

	test("should throw if required variables are missing", () => {
		// Clear the environment variables
		vi.unstubAllEnvs();

		// Reset the module
		vi.resetModules();
		const { keys } = require("../src/keys");

		expect(() => {
			keys();
		}).toThrow();
	});
});
