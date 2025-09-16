---
"site": patch
"@gabfon/analytics": patch
"@gabfon/cache": patch
"@gabfon/database": patch
"@gabfon/design-system": patch
"@gabfon/mdx": patch
"@gabfon/next-config": patch
"@gabfon/observability": patch
"@gabfon/rate-limit": patch
"@gabfon/security": patch
"@gabfon/seo": patch
"@gabfon/testing": patch
---

fix: resolve deployment and MDX issues

- Fix MDX createContext error by temporarily disabling MDX
- Resolve Vercel deployment issues with React 19 testing
- Fix environment variable configuration for build process
- Make database connection optional for build process
- Update pnpm lockfile and dependency management
- Improve error handling and resilience in build process
