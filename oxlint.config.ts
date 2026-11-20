import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import drizzle from "ultracite/oxlint/drizzle";
import next from "ultracite/oxlint/next";
import react from "ultracite/oxlint/react";

export default defineConfig({
  env: core.env,
  extends: [core, react, next, drizzle],
  ignorePatterns: core.ignorePatterns,
  rules: {
    // ── Project overrides (loosened from Ultracite defaults) ────────────
    // Hoisted `function` declarations are the codebase's established style
    // for React components and lib functions. Ultracite's research page
    // acknowledges the tension; this project keeps declarations.
    "func-style": "off",
    // Trailing `//` comments are used throughout (color maps, option
    // objects, config files). Enforcing them on their own line is churn.
    "no-inline-comments": "off",
    // `require-unicode-regexp` is not safely auto-fixable: `[\s\S]` has no
    // Unicode-equivalent without rewriting the pattern, and the existing
    // regexes are correct for their ASCII/JSX inputs.
    "require-unicode-regexp": "off",
    // `__dirname` is the established pattern in vitest/vite configs; the
    // `import.meta.url` equivalent is strictly noisier here.
    "unicorn/prefer-module": "off",
    // `export * from "./schema"` in package entry points is how this
    // monorepo exposes packages; flagging 331/811-module barrels doesn't
    // change anything the bundler does.
    "oxc/no-barrel-file": "off",
    // `<img>` is required in opengraph/icon route files and a few spots
    // where `next/image` is inapplicable (canvas, metadata images).
    "nextjs/no-img-element": "off",
    // sendEmail's if/else branches per optional field push cyclomatic
    // complexity to 28; refactoring to per-field spreads is a follow-up.
    complexity: ["error", { max: 30 }],
    // ── React Compiler diagnostics (not real lint issues) ───────────────
    // The React Compiler's build phase emits `todo` diagnostics for
    // patterns it can't lower (throw-in-try). These are compiler
    // limitations, not code quality problems the team should fix.
    "react/todo": "off",
    // `Math.random()` in render (loading skeletons) is an accepted,
    // widely-used pattern for visual variety; React Compiler flags it as
    // impure but the values are cosmetic only.
    "react/purity": "off",
    // ── Intentional patterns in shared components ───────────────────────
    // `cloneElement` is used in FormField (label→input id wiring) and
    // CodeGroup (fence title extraction) — both are stable, well-tested
    // patterns that are hard to replace without a major API change.
    "react/no-clone-element": "off",
    // `React.Children` is used in CodeGroup to enumerate fenced code
    // blocks; the alternative (manual array flattening) is more fragile.
    "react/no-react-children": "off",
    // `dangerouslySetInnerHTML` is used in Mermaid (rendered SVG) and
    // json-ld (structured data script) — both are controlled, safe
    // inputs. Biome previously flagged these at `warn` only.
    "react/no-danger": "warn",
    // iframe sandboxing: the video/embed/gist iframes intentionally use
    // `allow-scripts` + `allow-same-origin` for third-party embeds
    // (YouTube, GitHub gists) where the sandbox is a best-effort
    // boundary, not a security boundary. Biome flagged at `warn` only.
    "react/iframe-missing-sandbox": "warn",
    // Next.js config requires `async headers()`/`rewrites()` even when
    // no `await` is present (the type signature allows both).
    "require-await": "off",
    // Two small error classes per file (errors.ts, github/client.ts)
    // are the established pattern; splitting into separate files adds
    // import churn without clarity gain.
    "max-classes-per-file": "off",
    // `== null` / `!= null` are the codebase's established idiom for
    // "null or undefined" checks; rewriting every site is churn.
    "no-eq-null": "off",
    // Positional capture groups are used throughout (URL/regex parsing
    // helpers) and are safe where the pattern is known and simple.
    "prefer-named-capture-group": "off",
    // CLI/dev scripts and API clients legitimately use console.* for
    // their output; the observability package is the app's logging
    // layer itself (Biome allowed these sites).
    "no-console": "off",
    // The scrape script is a one-off dev tool; sequential reads keep
    // its output deterministic (like the test-file override).
    "no-await-in-loop": "off",
  },
  overrides: [
    {
      files: ["**/*.{test,spec}.{ts,tsx,js,jsx}"],
      rules: {
        // E2E/unit tests often need sequential await-per-assertion
        // (each step depends on the previous one).
        "no-await-in-loop": "off",
        "unicorn/no-array-sort": "off",
        "prefer-destructuring": "off",
        "unicorn/no-await-expression-member": "off",
      },
    },
  ],
});
