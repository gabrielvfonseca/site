-- 001__initial_schema.sql
-- AMA (Ask Me Anything) feature schema.
-- Mirrors packages/database/src/schema.ts for local Postgres (Docker Compose, Neon HTTP proxy).
-- Idempotent: safe to run multiple times.

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

CREATE INDEX IF NOT EXISTS ama_questions_published_idx
  ON ama_questions (status, pinned, answered_at DESC);

CREATE INDEX IF NOT EXISTS ama_messages_thread_idx
  ON ama_messages (question_id);
