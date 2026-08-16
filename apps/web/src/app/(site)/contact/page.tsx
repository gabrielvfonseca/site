import { createMetadata } from "@gabfon/seo/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import { CONFIG } from "@/config/site";

/**
 * The metadata for the contact page.
 * @returns The metadata for the contact page.
 */
export const metadata: Metadata = createMetadata({
	title: "Contact",
	description:
		"Get in touch with Gabriel Fonseca, founder and engineer building enterprise AI. Based in Lisbon, Portugal.",
	pathname: "/contact",
});

const Page = () => {
	return (
		<div className="flex flex-col gap-12">
			<section
				aria-labelledby="contact-heading"
				className="flex scroll-mt-8 flex-col gap-4"
			>
				<h1 className="text-lg" id="contact-heading">
					Get in touch
				</h1>
				<p className="text-muted-foreground">
					Have a question, a project in mind, or just want to say hi? Send a
					message below and I&apos;ll get back to you.
				</p>
				<ContactForm />
			</section>

			<p className="text-muted-foreground/[var(--opacity-description)] text-sm">
				Prefer another way?{" "}
				<Link
					className="link-external"
					href={CONFIG.email}
					rel="noopener noreferrer"
					target="_blank"
				>
					Email me directly
				</Link>{" "}
				or{" "}
				<Link
					className="link-external"
					href={CONFIG.schedule}
					rel="noopener noreferrer"
					target="_blank"
				>
					schedule a call
				</Link>
				.
			</p>
		</div>
	);
};

export default Page;
