import { sql } from "drizzle-orm";
import { index, sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * Lifecycle status of an AMA (Ask Me Anything) question.
 * - `pending`: submitted, awaiting review
 * - `answered`: answered privately, not yet public
 * - `published`: answer is public and shown on the AMA page
 * - `rejected`: dismissed, never shown
 */
export const amaStatus = {
  pending: "pending",
  answered: "answered",
  published: "published",
  rejected: "rejected",
} as const;
export type AmaStatus = (typeof amaStatus)[keyof typeof amaStatus];

/**
 * Author of an individual message within an AMA thread.
 * - `asker`: a follow-up from the person who asked (or the public)
 * - `owner`: a reply from the site owner
 */
export const amaMessageRole = {
  asker: "asker",
  owner: "owner",
} as const;
export type AmaMessageRole =
  (typeof amaMessageRole)[keyof typeof amaMessageRole];

/**
 * Questions submitted through the public AMA form. Each published row is the
 * head of a thread surfaced on the `/ama` page (and at `/ama/[slug]`). Follow-up
 * back-and-forth lives in {@link amaMessages}.
 *
 * D1 stores booleans as integers (0/1) and timestamps as ISO-8601 UTC strings,
 * so `pinned` is a `text("0" | "1")` column and `createdAt`/`answeredAt` are
 * plain `text` columns (see `schemaMode: "strict"` in the schema docs).
 */
export const amaQuestions = sqliteTable(
  "ama_questions",
  {
    id: text("id").primaryKey(),
    /** URL-safe identifier for the thread page (`/ama/[slug]`). */
    slug: text("slug").unique(),
    question: text("question").notNull(),
    askerName: text("asker_name"),
    askerEmail: text("asker_email"),
    status: text("status").notNull().default("pending"),
    answer: text("answer"),
    /** Pinned threads sort to the top of the `/ama` list with a badge. */
    pinned: text("pinned", { enum: ["0", "1"] })
      .notNull()
      .default("0"),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(datetime('now'))`),
    answeredAt: text("answered_at"),
  },
  (table) => [
    index("ama_questions_published_idx").on(
      table.status,
      table.pinned,
      table.answeredAt
    ),
  ]
);

/**
 * Ordered follow-up messages that extend an AMA thread beyond the initial
 * question/answer, enabling a full conversation at `/ama/[slug]`.
 */
export const amaMessages = sqliteTable(
  "ama_messages",
  {
    id: text("id").primaryKey(),
    questionId: text("question_id")
      .notNull()
      .references(() => amaQuestions.id, { onDelete: "cascade" }),
    role: text("role").notNull(),
    body: text("body").notNull(),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(datetime('now'))`),
  },
  (table) => [index("ama_messages_thread_idx").on(table.questionId)]
);

/** A persisted AMA question row. */
export type AmaQuestion = typeof amaQuestions.$inferSelect;
/** The shape required to insert a new AMA question. */
export type NewAmaQuestion = typeof amaQuestions.$inferInsert;
/** A persisted AMA thread message row. */
export type AmaMessage = typeof amaMessages.$inferSelect;
/** The shape required to insert a new AMA thread message. */
export type NewAmaMessage = typeof amaMessages.$inferInsert;
