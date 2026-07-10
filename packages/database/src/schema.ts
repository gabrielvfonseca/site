import { sql } from 'drizzle-orm';
import {
  boolean,
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

/**
 * Lifecycle status of an AMA (Ask Me Anything) question.
 * - `pending`: submitted, awaiting review
 * - `answered`: answered privately, not yet public
 * - `published`: answer is public and shown on the AMA page
 * - `rejected`: dismissed, never shown
 */
export const amaStatus = pgEnum('ama_status', [
  'pending',
  'answered',
  'published',
  'rejected',
]);

/**
 * Author of an individual message within an AMA thread.
 * - `asker`: a follow-up from the person who asked (or the public)
 * - `owner`: a reply from the site owner
 */
export const amaMessageRole = pgEnum('ama_message_role', ['asker', 'owner']);

/**
 * Questions submitted through the public AMA form. Each published row is the
 * head of a thread surfaced on the `/ama` page (and at `/ama/[slug]`). Follow-up
 * back-and-forth lives in {@link amaMessages}.
 */
export const amaQuestions = pgTable(
  'ama_questions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    /** URL-safe identifier for the thread page (`/ama/[slug]`). */
    slug: text('slug').unique(),
    question: text('question').notNull(),
    askerName: text('asker_name'),
    askerEmail: text('asker_email'),
    status: amaStatus('status').notNull().default('pending'),
    answer: text('answer'),
    /** Pinned threads sort to the top of the `/ama` list with a badge. */
    pinned: boolean('pinned').notNull().default(false),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .default(sql`now()`),
    answeredAt: timestamp('answered_at', { withTimezone: true }),
  },
  (table) => [
    index('ama_questions_published_idx').on(
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
export const amaMessages = pgTable(
  'ama_messages',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    questionId: uuid('question_id')
      .notNull()
      .references(() => amaQuestions.id, { onDelete: 'cascade' }),
    role: amaMessageRole('role').notNull(),
    body: text('body').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (table) => [index('ama_messages_thread_idx').on(table.questionId)]
);

/** A persisted AMA question row. */
export type AmaQuestion = typeof amaQuestions.$inferSelect;
/** The shape required to insert a new AMA question. */
export type NewAmaQuestion = typeof amaQuestions.$inferInsert;
/** A persisted AMA thread message row. */
export type AmaMessage = typeof amaMessages.$inferSelect;
/** The shape required to insert a new AMA thread message. */
export type NewAmaMessage = typeof amaMessages.$inferInsert;
