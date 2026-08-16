import Link from "next/link";
import { ContributionGraph } from "@/components/contribution-graph";
import { Posts } from "@/components/posts";
import { Projects } from "@/components/projects";
import { CONFIG } from "@/config/site";
import { hasPublishedPosts } from "@/lib/post";
import { hasProjects } from "@/lib/project";

/**
 * The Page for the site.
 * @returns The Page for the site.
 */
export default function Page() {
	// Check if there are posts and projects
	const posts: boolean = hasPublishedPosts();
	const projects: boolean = hasProjects();

	return (
		<div className="flex flex-col gap-12">
			<section aria-label="About" className="flex flex-col gap-4">
				<p>
					I'm a Lisbon-based software developer, founder, and Computer
					Engineering student at{" "}
					<Link
						aria-label="NOVA School of Science and Technology (opens in a new tab)"
						className="link-external"
						href="https://www.fct.unl.pt"
						rel="noopener noreferrer"
						target="_blank"
						title="NOVA School of Science and Technology"
					>
						NOVA School of Science and Technology
					</Link>
					.
				</p>
				<p>
					I'm currently building an{" "}
					<Link
						aria-label="AI-powered platform (opens in a new tab)"
						className="link-external"
						href="https://frontal.dev"
						rel="noopener noreferrer"
						target="_blank"
						title="AI-powered platform"
					>
						AI-powered platform
					</Link>{" "}
					to streamline business operations and decision-making. As the founder
					& CEO of{" "}
					<Link
						aria-label="Frontal (opens in a new tab)"
						className="link-external"
						href="https://frontal.dev"
						rel="noopener noreferrer"
						target="_blank"
						title="frontal.dev"
					>
						Frontal
					</Link>
					, I'm deeply involved in product development and user research.
				</p>
				<p>
					Outside of my startup, I work on full-stack development for freelance
					and{" "}
					<Link
						aria-label="personal projects"
						className="link-default"
						href="#projects"
						title="personal projects"
					>
						personal projects
					</Link>{" "}
					, always seeking to solve real-world problems creatively. I regularly{" "}
					<Link
						aria-label="write posts"
						className="link-default"
						href="#posts"
						title="write posts"
					>
						write posts
					</Link>{" "}
					about my experiences and believe in{" "}
					<Link
						aria-label="building in public (opens in a new tab)"
						className="link-external"
						href={CONFIG.social.x}
						rel="noopener noreferrer"
						target="_blank"
						title="building in public"
					>
						building in public
					</Link>{" "}
					to share my journey and learnings. I'm an active participant in the
					tech, business, and startup communities, constantly learning and
					iterating.
				</p>
				<p>
					I'm{" "}
					<Link
						aria-label="open to connecting (opens in a new tab)"
						className="link-external"
						href={CONFIG.social.linkedin}
						rel="noopener noreferrer"
						target="_blank"
						title="open to connecting"
					>
						open to connecting
					</Link>{" "}
					with fellow builders, potential collaborators, and anyone interested
					in AI, productivity, and organizational clarity. Feel free to reach
					out on{" "}
					<Link
						aria-label="X (opens in a new tab)"
						className="link-external"
						href={CONFIG.social.x}
						rel="noopener noreferrer"
						target="_blank"
						title="X"
					>
						X
					</Link>
					,{" "}
					<Link
						aria-label="LinkedIn (opens in a new tab)"
						className="link-external"
						href={CONFIG.social.linkedin}
						rel="noopener noreferrer"
						target="_blank"
						title="LinkedIn"
					>
						LinkedIn
					</Link>
					, or{" "}
					<Link
						aria-label="GitHub (opens in a new tab)"
						className="link-external"
						href={CONFIG.social.github}
						rel="noopener noreferrer"
						target="_blank"
						title="GitHub"
					>
						GitHub
					</Link>
					. If you'd like to schedule a meeting or a quick call, you can do so{" "}
					<Link
						aria-label="Schedule a meeting (opens in a new tab)"
						className="link-external"
						href={CONFIG.schedule}
						rel="noopener noreferrer"
						target="_blank"
						title="Schedule a meeting"
					>
						here
					</Link>
					{" or"}
					<Link
						aria-label="Email me (opens in a new tab)"
						className="link-external"
						href={CONFIG.email}
						rel="noopener noreferrer"
						target="_blank"
						title="Email me"
					>
						email me
					</Link>
					.
				</p>
				<p>
					Want the longer story? Read{" "}
					<Link className="link-default" href="/bio" title="Bio">
						my bio
					</Link>{" "}
					for more about who I am and what I'm building, see what I'm focused on{" "}
					<Link className="link-default" href="/now" title="Now">
						right now
					</Link>
					, or{" "}
					<Link className="link-default" href="/ama" title="Ask me anything">
						ask me anything
					</Link>
					.
				</p>
			</section>

			<section
				aria-labelledby="homepage-activity-heading"
				className="flex scroll-mt-8 flex-col gap-4"
				id="activity"
			>
				<h2 className="text-lg" id="homepage-activity-heading">
					Activity
				</h2>
				<ContributionGraph />
			</section>

			{projects && (
				<section
					aria-labelledby="homepage-projects-heading"
					className="flex scroll-mt-8 flex-col gap-4"
					id="projects"
				>
					<h2 className="text-lg" id="homepage-projects-heading">
						Projects
					</h2>
					<Projects />
				</section>
			)}

			{posts && (
				<section
					aria-labelledby="homepage-posts-heading"
					className="flex scroll-mt-8 flex-col gap-4"
					id="posts"
				>
					<h2 className="text-lg" id="homepage-posts-heading">
						Posts
					</h2>
					<Posts />
				</section>
			)}
		</div>
	);
}
