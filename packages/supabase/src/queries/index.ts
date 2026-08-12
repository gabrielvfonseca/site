import type { Client } from "../types";

export async function getPublishedAmaQuestionsQuery(client: Client) {
	return client
		.from("ama_questions")
		.select("*")
		.eq("status", "published")
		.not("answer", "is", null)
		.order("pinned", { ascending: false })
		.order("answered_at", { ascending: false });
}

export async function getAmaQuestionBySlugQuery(client: Client, slug: string) {
	return client
		.from("ama_questions")
		.select("*")
		.eq("slug", slug)
		.eq("status", "published")
		.not("answer", "is", null)
		.single();
}

export async function getAmaMessagesByQuestionIdQuery(
	client: Client,
	questionId: string,
) {
	return client
		.from("ama_messages")
		.select("*")
		.eq("question_id", questionId)
		.order("created_at", { ascending: true });
}
