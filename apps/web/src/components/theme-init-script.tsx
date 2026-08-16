"use client";

import { useEffect } from "react";
import { META_THEME_COLORS } from "@/config/site";

export function ThemeInitScript() {
	useEffect(() => {
		try {
			const stored = localStorage.theme;
			const isDark =
				stored === "dark" ||
				((!stored || stored === "system") &&
					matchMedia("(prefers-color-scheme: dark)").matches);
			const color = isDark ? META_THEME_COLORS.dark : META_THEME_COLORS.light;
			const meta = document.querySelector('meta[name="theme-color"]');
			if (meta) {
				meta.setAttribute("content", color);
			}
			if (localStorage.layout) {
				document.documentElement.classList.add(`layout-${localStorage.layout}`);
			}
		} catch (_) {
			// Ignore errors
		}
	}, []);

	return null;
}
