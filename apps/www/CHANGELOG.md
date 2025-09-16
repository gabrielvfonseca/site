# site

## 0.2.1

### Patch Changes

- ## PWA Enhancements and Code Improvements

  ### 🚀 PWA Features

  - Enhanced PWA manifest with comprehensive features
  - Added multiple icon sizes (192x192, 512x512, Apple touch icon)
  - Included screenshots for app store listings
  - Added navigation shortcuts for About, Projects, and Blog
  - Set proper theme colors and orientation
  - Added categories and language specification
  - Improved PWA installation and user experience

  ### 🔧 Code Improvements

  - Convert type aliases to interfaces for component props
  - Enhanced type definitions across all layout components
  - Improved JSDoc comments and documentation
  - Added comprehensive site description for metadata
  - Updated linting configuration for better type flexibility

  ### 📱 User Experience

  - Better PWA installation experience
  - Improved app store presentation
  - Enhanced navigation shortcuts
  - Better type safety and code maintainability

## 0.2.0

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

- Updated dependencies [12194d2]
- Updated dependencies
  - @gabfon/analytics@0.1.0
  - @gabfon/cache@0.1.0
  - @gabfon/database@0.1.0
  - @gabfon/design-system@0.1.0
  - @gabfon/mdx@0.1.0
  - @gabfon/next-config@0.1.0
  - @gabfon/observability@0.1.0
  - @gabfon/rate-limit@0.1.0
  - @gabfon/security@0.1.0
  - @gabfon/seo@0.1.0
  - @gabfon/testing@0.1.0

## 0.1.1

### Patch Changes

- fix: resolve deployment and MDX issues

  - Fix MDX createContext error by temporarily disabling MDX
  - Resolve Vercel deployment issues with React 19 testing
  - Fix environment variable configuration for build process
  - Make database connection optional for build process
  - Update pnpm lockfile and dependency management
  - Improve error handling and resilience in build process

- Updated dependencies
  - @gabfon/analytics@0.0.2
  - @gabfon/cache@0.0.2
  - @gabfon/database@0.0.2
  - @gabfon/design-system@0.0.2
  - @gabfon/mdx@0.0.2
  - @gabfon/next-config@0.0.2
  - @gabfon/observability@0.0.2
  - @gabfon/rate-limit@0.0.2
  - @gabfon/security@0.0.1
  - @gabfon/seo@0.0.2
  - @gabfon/testing@0.0.2
