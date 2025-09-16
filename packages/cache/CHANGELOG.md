# @gabfon/cache

## 0.1.0

### Minor Changes

- ## Package Updates and Prisma Fixes

  ### 🔧 Package Updates

  - Update @biomejs/biome to v2.2.4
  - Update @types/node to v24.5.0
  - Update estree-util-value-to-estree to v3.4.0
  - Update @octokit packages to latest versions
    - @octokit/plugin-paginate-rest to v13.1.1
    - @octokit/request to v10.0.3
    - @octokit/request-error to v7.0.0

  ### 🐛 Bug Fixes

  - Fix Prisma query engine binary issue for Vercel deployment
  - Add rhel-openssl-3.0.x binary target for Vercel platform compatibility
  - Update Prisma versions to 6.16.1 for consistency
  - Add postinstall script for proper Prisma client generation

  ### 🚀 Infrastructure Improvements

  - Enhanced Vercel build configuration
  - Improved GitHub Actions workflow environment variables
  - Better dependency management and security updates

  ### 📦 Dependencies

  - All workspace packages updated to latest compatible versions
  - Security vulnerabilities addressed
  - Performance improvements from updated dependencies

### Patch Changes

- 12194d2: fix: resolve deployment and MDX issues

  - Fix MDX createContext error by temporarily disabling MDX
  - Resolve Vercel deployment issues with React 19 testing
  - Fix environment variable configuration for build process
  - Make database connection optional for build process
  - Update pnpm lockfile and dependency management
  - Improve error handling and resilience in build process

## 0.0.2

### Patch Changes

- fix: resolve deployment and MDX issues

  - Fix MDX createContext error by temporarily disabling MDX
  - Resolve Vercel deployment issues with React 19 testing
  - Fix environment variable configuration for build process
  - Make database connection optional for build process
  - Update pnpm lockfile and dependency management
  - Improve error handling and resilience in build process
