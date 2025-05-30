---
"web": patch
"@repo/analytics": patch
"@repo/design-system": patch
"@repo/seo": patch
---

Major project restructuring and improvements:

Web App:
- Modernize README with current framework and deployment info
- Add analytics tools documentation
- Update development scripts
- Fix script imports and remove unused scripts
- Add comprehensive favicon set and metadata files
- Update app layout and core components
- Add new MDX components and content constants
- Restructure app routing and layout

Analytics:
- Update PostHog client implementation
- Add biome-ignore comments for better linting
- Configure person profiles and page tracking settings

Design System:
- Update UI components and styles
- Add animated shiny text component
- Update badge and button components
- Improve theme colors and component styles
- Restructure styles organization

SEO:
- Add viewport configuration
- Update metadata handling
- Add comprehensive favicon set
- Add manifest and sitemap files

Removed Packages:
- Remove unused packages (CMS, database, email)
- Remove feature flags package
- Remove AI package
- Remove internationalization package
- Remove storage package 