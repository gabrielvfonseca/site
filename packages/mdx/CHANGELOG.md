# @gabfon/mdx

## 0.2.0

### Minor Changes

- ## MDX Package Enhancements and Build System

  ### 🚀 MDX Package Enhancements

  - Add proper build system with tsup configuration
  - Implement comprehensive MDX components library
  - Add Next.js MDX configuration with remark plugins
  - Create MDX components export for app integration
  - Enhance serialization and component handling

  ### 🔧 Build System Improvements

  - Configure tsup for dual ESM/CJS builds
  - Add proper TypeScript declarations
  - Update package.json with correct exports
  - Add build scripts and configuration

  ### 📝 Component Library

  - Add comprehensive MDX components (Code, Pre, etc.)
  - Implement syntax highlighting with Sugar High
  - Add GitHub Flavored Markdown support
  - Create reusable component patterns

  ### 🌐 App Integration

  - Add mdx-components.tsx for Next.js integration
  - Update Next.js config for MDX support
  - Remove unused Skeleton imports
  - Update external link to frontal.dev

  ### 🐛 Bug Fixes

  - Fix linting issues and code formatting
  - Resolve variable shadowing conflicts
  - Add proper biome-ignore comments
  - Improve regex performance with top-level constants

  ### 📦 Dependencies

  - Add remark-gfm for GitHub Flavored Markdown
  - Add remark-sugar-high for syntax highlighting
  - Update MDX-related dependencies
  - Improve package structure and exports

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

- Updated dependencies [12194d2]
- Updated dependencies
  - @gabfon/design-system@0.1.0

## 0.0.2

### Patch Changes

- fix: resolve deployment and MDX issues

  - Fix MDX createContext error by temporarily disabling MDX
  - Resolve Vercel deployment issues with React 19 testing
  - Fix environment variable configuration for build process
  - Make database connection optional for build process
  - Update pnpm lockfile and dependency management
  - Improve error handling and resilience in build process

- Updated dependencies
  - @gabfon/design-system@0.0.2
