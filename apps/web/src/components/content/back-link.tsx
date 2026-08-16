import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Props for {@link BackLink}.
 */
interface BackLinkProps {
	/** Destination href, e.g. `/posts`. */
	readonly href: string;
	/** Visible label, e.g. `Writing`. */
	readonly label: string;
	/** Optional extra class names. */
	readonly className?: string;
}

/**
 * A compact, muted breadcrumb link shown above article content, pointing back
 * to the collection index.
 * @param props - The back link props.
 * @returns The BackLink element.
 */
export function BackLink({ href, label, className }: BackLinkProps) {
	return (
		<Link
			className={cn(
				"w-fit rounded text-muted-foreground text-sm transition-colors duration-200 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
				className,
			)}
			href={href}
		>
			{label}
		</Link>
	);
}
