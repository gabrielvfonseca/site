import type { Client } from "../types";

type InsertAmaQuestionData = {
	question: string;
	slug: string;
	askerName?: string | null;
	askerEmail?: string | null;
	status?: string;
	answer?: string | null;
	pinned?: boolean;
};

export async function insertAmaQuestion(
	client: Client,
	data: InsertAmaQuestionData,
) {
	return client.from("ama_questions").insert({
		question: data.question,
		slug: data.slug,
		asker_name: data.askerName ?? null,
		asker_email: data.askerEmail ?? null,
		status: data.status ?? "pending",
		answer: data.answer ?? null,
		pinned: data.pinned ?? false,
	});
}

type InsertAmaMessageData = {
	questionId: string;
	role: "asker" | "owner";
	body: string;
};

export async function insertAmaMessage(
	client: Client,
	data: InsertAmaMessageData,
) {
	return client.from("ama_messages").insert({
		question_id: data.questionId,
		role: data.role,
		body: data.body,
	});
}
