-- 002__seed_data.sql
-- Seed data for local development. Inserts a pinned AMA thread with a
-- follow-up exchange so the page and thread view show content out-of-the-box.
-- Runs only when ama_questions is empty (idempotent).

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
      (thread_id, 'owner', 'It keeps each integration (analytics, security, email, etc.) isolated with its own env — easier to reason about and reuse.', now() + interval '2 minutes');
  END IF;
END
$$;
