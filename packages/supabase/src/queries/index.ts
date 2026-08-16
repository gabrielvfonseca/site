import type { Client, Database } from "../types";

export type AmaQuestionRow =
	Database["public"]["Tables"]["ama_questions"]["Row"];
export type AmaMessageRow = Database["public"]["Tables"]["ama_messages"]["Row"];

/**
 * Fetch every published, answered AMA question, pinned first then most recently
 * answered first.
 * @param client - A Supabase client.
 * @returns The matching rows, or an empty array when there are none.
 */
export async function getPublishedAmaQuestionsQuery(
	client: Client,
): Promise<AmaQuestionRow[]> {
	const { data, error } = await client
		.from("ama_questions")
		.select("*")
		.eq("status", "published")
		.not("answer", "is", null)
		.order("pinned", { ascending: false })
		.order("answered_at", { ascending: false });

	if (error) {
		throw error;
	}

	return data ?? [];
}

/**
 * Fetch a single published AMA question by its slug.
 * @param client - A Supabase client.
 * @param slug - The question slug from the URL.
 * @returns The matching row, or `null` when no published question has that slug.
 */
export async function getAmaQuestionBySlugQuery(
	client: Client,
	slug: string,
): Promise<AmaQuestionRow | null> {
	const { data, error } = await client
		.from("ama_questions")
		.select("*")
		.eq("slug", slug)
		.eq("status", "published")
		.not("answer", "is", null)
		.maybeSingle();

	if (error) {
		throw error;
	}

	return data;
}

/**
 * Fetch the follow-up messages belonging to an AMA question, oldest first.
 * @param client - A Supabase client.
 * @param questionId - The parent question's id.
 * @returns The thread messages, or an empty array when there are none.
 */
export async function getAmaMessagesByQuestionIdQuery(
	client: Client,
	questionId: string,
): Promise<AmaMessageRow[]> {
	const { data, error } = await client
		.from("ama_messages")
		.select("*")
		.eq("question_id", questionId)
		.order("created_at", { ascending: true });

	if (error) {
		throw error;
	}

	return data ?? [];
}
