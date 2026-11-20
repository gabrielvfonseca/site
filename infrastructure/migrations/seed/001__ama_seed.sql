-- 001__ama_seed.sql
-- Seed data for local development. Inserts a pinned AMA thread with a
-- follow-up exchange so the page and thread view show content out-of-the-box.
-- Runs only when ama_questions is empty (idempotent).
-- D1 (SQLite) — no PL/pgSQL; use plain SQL with a WHERE NOT EXISTS guard.

INSERT INTO ama_questions (slug, question, asker_name, answer, status, pinned, answered_at)
SELECT
  'what-is-this-site-built-with',
  'What is this site built with?',
  'A curious visitor',
  'Next.js 16, TypeScript, and a Turborepo monorepo — deployed on Cloudflare Workers and runnable locally with Docker Compose.',
  'published',
  1,
  strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
WHERE NOT EXISTS (SELECT 1 FROM ama_questions LIMIT 1);
