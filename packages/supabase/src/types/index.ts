import type { Database } from "./db";

export type Client = {
	from: <T extends keyof Database["public"]["Tables"]>(table: T) => any;
	storage: {
		from(bucket: string): any;
	};
};

export * from "./db";
