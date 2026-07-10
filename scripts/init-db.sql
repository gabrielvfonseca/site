-- Local Postgres bootstrap for the AMA feature.
--
-- Mirrors packages/database/src/schema.ts so the `/ama` list, `/ama/[slug]`
-- threads, and submission flow work against the Docker Compose Postgres
-- container (via the Neon HTTP proxy). Runs once on first container start
-- (docker-entrypoint-initdb.d).

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ama_status') THEN
    CREATE TYPE ama_status AS ENUM (
      'pending',
      'answered',
      'published',
      'rejected'
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ama_message_role') THEN
    CREATE TYPE ama_message_role AS ENUM ('asker', 'owner');
  END IF;
END
$$;

CREATE TABLE IF NOT EXISTS ama_questions (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         text UNIQUE,
  question     text NOT NULL,
  asker_name   text,
  asker_email  text,
  status       ama_status NOT NULL DEFAULT 'pending',
  answer       text,
  pinned       boolean NOT NULL DEFAULT false,
  created_at   timestamptz NOT NULL DEFAULT now(),
  answered_at  timestamptz
);

CREATE TABLE IF NOT EXISTS ama_messages (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id  uuid NOT NULL REFERENCES ama_questions (id) ON DELETE CASCADE,
  role         ama_message_role NOT NULL,
  body         text NOT NULL,
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- Speeds up the published-answers query on the /ama page.
CREATE INDEX IF NOT EXISTS ama_questions_published_idx
  ON ama_questions (status, pinned, answered_at DESC);

CREATE INDEX IF NOT EXISTS ama_messages_thread_idx
  ON ama_messages (question_id);

-- A seed thread (pinned) so the list and a thread page show content out of the
-- box. Includes a follow-up exchange to demonstrate the conversation view.
DO $$
DECLARE
  thread_id uuid;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM ama_questions) THEN
    INSERT INTO ama_questions (slug, question, asker_name, answer, status, pinned, answered_at)
    VALUES (
      'what-is-this-site-built-with',
      'What is this site built with?',
      'A curious visitor',
      'Next.js 16, TypeScript, and a Turborepo monorepo — deployed on Vercel and runnable locally with Docker Compose.',
      'published',
      true,
      now()
    )
    RETURNING id INTO thread_id;

    INSERT INTO ama_messages (question_id, role, body, created_at) VALUES
      (thread_id, 'asker', 'Nice! Why Turborepo over a single app?', now() + interval '1 minute'),
      (thread_id, 'owner', 'It keeps each integration (analytics, security, email, etc.) isolated with its own env — easier to reason about and reuse.', now() + interval '2 minute');
  END IF;
END
$$;
