import { env } from "@/config/env";

export const CONFIG = {
	name: "Gabriel Fonseca",
	title: "Building Enterprise AI",
	description:
		"Personal website of Gabriel Fonseca — software developer, DJ, and computer engineering student in Lisbon, Portugal. Portfolio, blog, and projects.",
	location: "Lisbon, Portugal",
	email: `mailto:${env.NEXT_PUBLIC_EMAIL}`,
	social: {
		x: env.NEXT_PUBLIC_X_URL,
		linkedin: env.NEXT_PUBLIC_LINKEDIN_URL,
		github: env.NEXT_PUBLIC_GITHUB_URL,
	},
	schedule: env.NEXT_PUBLIC_SCHEDULE_URL,
} as const;

export const META_THEME_COLORS = {
	light: "#ffffff",
	dark: "#000000",
};
