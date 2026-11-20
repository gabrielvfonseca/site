import { and, asc, desc, eq, isNotNull } from "drizzle-orm";

import { getDatabase } from "./client";
import { amaMessages, amaQuestions } from "./schema";
import type { AmaMessage, AmaQuestion, NewAmaQuestion } from "./schema";

/**
 * The D1 binding as exposed by the Workers runtime (`env.DB`). In non-Workers
 * contexts (unit tests, local tooling) this resolves to `undefined` and the
 * queries degrade to empty results.
 */
function binding(): Parameters<typeof getDatabase>[0] {
  const env = globalThis.process?.env as Record<string, unknown> | undefined;
  return (env?.DB as Parameters<typeof getDatabase>[0]) ?? undefined;
}

/**
 * Fetch published AMA questions (answered + made public), pinned first and then
 * newest first. Returns an empty array when no database is configured.
 * @returns The published AMA questions.
 */
export async function getPublishedAmaQuestions(): Promise<AmaQuestion[]> {
  const database = getDatabase(binding());
  if (!database) {
    return [];
  }
  return await database
    .select()
    .from(amaQuestions)
    .where(
      and(eq(amaQuestions.status, "published"), isNotNull(amaQuestions.answer))
    )
    .orderBy(desc(amaQuestions.pinned), desc(amaQuestions.answeredAt));
}

/**
 * Fetch a single published AMA thread head by its slug. Returns `null` when no
 * database is configured or no matching published thread exists.
 * @param slug - The thread slug from the URL.
 * @returns The published thread head, or `null`.
 */
export async function getPublishedAmaQuestionBySlug(
  slug: string
): Promise<AmaQuestion | null> {
  const database = getDatabase(binding());
  if (!database) {
    return null;
  }
  const rows = await database
    .select()
    .from(amaQuestions)
    .where(
      and(
        eq(amaQuestions.slug, slug),
        eq(amaQuestions.status, "published"),
        isNotNull(amaQuestions.answer)
      )
    )
    .limit(1);
  return rows[0] ?? null;
}

/**
 * Fetch the ordered follow-up messages for an AMA thread. Returns an empty array
 * when no database is configured.
 * @param questionId - The thread (question) id.
 * @returns The ordered thread messages.
 */
export async function getAmaThreadMessages(
  questionId: string
): Promise<AmaMessage[]> {
  const database = getDatabase(binding());
  if (!database) {
    return [];
  }
  return await database
    .select()
    .from(amaMessages)
    .where(eq(amaMessages.questionId, questionId))
    .orderBy(asc(amaMessages.createdAt));
}

/**
 * Insert a submitted AMA question. No-ops when no database is configured.
 * @param input - The new question values.
 * @returns Whether the row was persisted.
 */
export async function insertAmaQuestion(
  input: NewAmaQuestion
): Promise<boolean> {
  const database = getDatabase(binding());
  if (!database) {
    return false;
  }
  await database.insert(amaQuestions).values(input);
  return true;
}
