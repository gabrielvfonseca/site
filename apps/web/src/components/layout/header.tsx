import Link from "next/link";
import { CONFIG } from "@/config/site";

/**
 * The Header for the site.
 * @returns The Header for the site.
 */
export function Header() {
	return (
		<header className="flex w-full items-center justify-between tracking-tight">
			<nav aria-label="Main navigation" className="flex flex-col items-start">
				<Link
					aria-label={`${CONFIG.name} Home`}
					className="mb-px inline-block rounded text-foreground no-underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
					href="/"
					title={CONFIG.name}
				>
					{CONFIG.name}
				</Link>
				<p className="text-muted-foreground leading-none">{CONFIG.title}</p>
			</nav>
		</header>
	);
}
