"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { queryClient } from "@/lib/query-client";

/**
 * The QueryProviderProps for the QueryProvider.
 */
interface QueryProviderProps {
	/**
	 * The children for the QueryProvider.
	 */
	readonly children: ReactNode;
}

/**
 * The QueryProvider for the QueryProvider.
 * @param props - The QueryProviderProps.
 * @returns The QueryProvider for the QueryProvider.
 */
const QueryProvider = ({ children }: QueryProviderProps) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export { QueryProvider };
