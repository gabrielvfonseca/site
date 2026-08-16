import type { Client, Database } from "../types";

type AmaQuestionInsert =
	Database["public"]["Tables"]["ama_questions"]["Insert"];
type AmaMessageInsert = Database["public"]["Tables"]["ama_messages"]["Insert"];

type AmaStatus = Database["public"]["Enums"]["ama_status"];

type InsertAmaQuestionData = {
	question: string;
	slug: string;
	askerName?: string | null;
	askerEmail?: string | null;
	status?: AmaStatus;
	answer?: string | null;
	pinned?: boolean;
};

/**
 * Insert a submitted AMA question.
 * @param client - A Supabase client.
 * @param data - The question fields, in camelCase.
 * @returns Nothing; throws when the insert fails.
 */
export async function insertAmaQuestion(
	client: Client,
	data: InsertAmaQuestionData,
): Promise<void> {
	const row = {
		question: data.question,
		slug: data.slug,
		asker_name: data.askerName ?? null,
		asker_email: data.askerEmail ?? null,
		status: data.status ?? "pending",
		answer: data.answer ?? null,
		pinned: data.pinned ?? false,
	} satisfies AmaQuestionInsert;

	const { error } = await client.from("ama_questions").insert(row);

	if (error) {
		throw error;
	}
}

type InsertAmaMessageData = {
	questionId: string;
	role: "asker" | "owner";
	body: string;
};

/**
 * Insert a follow-up message on an existing AMA question.
 * @param client - A Supabase client.
 * @param data - The message fields, in camelCase.
 * @returns Nothing; throws when the insert fails.
 */
export async function insertAmaMessage(
	client: Client,
	data: InsertAmaMessageData,
): Promise<void> {
	const row = {
		question_id: data.questionId,
		role: data.role,
		body: data.body,
	} satisfies AmaMessageInsert;

	const { error } = await client.from("ama_messages").insert(row);

	if (error) {
		throw error;
	}
}
