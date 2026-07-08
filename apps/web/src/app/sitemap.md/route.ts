export function GET() {
  const content = `# Sitemap - Gabriel Fonseca (gabfon.com)

This sitemap provides a comprehensive overview of all pages and sections available on gabfon.com.

---

## 🏠 Main Pages

### [Home](/)
- **Description**: Main landing page with portfolio overview
- **Content**: Personal introduction, current projects, and contact information
- **Last Updated**: ${new Date().toISOString().split('T')[0]}

### [Projects](/#projects)
- **Description**: Personal and professional projects, listed on the home page
- **Content**: Project descriptions, technologies used, and live demos
- **Sections**: Web Development, Open Source, AI/ML Projects

### [Posts](/#posts)
- **Description**: Blog posts and technical articles, listed on the home page
- **Content**: Tutorials, best practices, and development insights
- **Topics**: Web Development, AI/ML, Performance Optimization

---

## 📄 Information Pages

### [About](/about)
- **Description**: Detailed professional background and expertise
- **Content**: Work experience, education, and technical skills
- **Focus Areas**: Software Engineering, AI/ML, Product Development

### [Contact](/contact)
- **Description**: Contact form and professional inquiry information
- **Content**: Direct contact methods and consultation availability
- **Options**: Email, scheduling, and social media

---

## 🤖 AI & Content Endpoints

### [llms.txt](/llms.txt)
- **Format**: Plain Text
- **Purpose**: Basic portfolio information for AI/LLM consumption
- **Content**: Concise professional summary and key information
- **Content-Type**: text/plain

### [llms-full.txt](/llms-full.txt)
- **Format**: Plain Text
- **Purpose**: Comprehensive portfolio information for detailed AI analysis
- **Content**: Complete professional background, projects, and expertise
- **Content-Type**: text/plain

### [llms.md](/llms.md)
- **Format**: Markdown
- **Purpose**: Structured portfolio information with rich formatting
- **Content**: Formatted professional profile with links and structure
- **Content-Type**: text/markdown

---

## 📡 Technical Endpoints

### [RSS Feed](/rss.xml)
- **Format**: XML (RSS 2.0)
- **Purpose**: Content syndication for blog updates and project news
- **Content**: Recent posts, project updates, and announcements
- **Content-Type**: application/rss+xml

### [Sitemap (XML)](/sitemap.xml)
- **Format**: XML
- **Purpose**: Search engine sitemap for SEO optimization
- **Content**: Structured page listing for search crawlers
- **Content-Type**: application/xml

### [Sitemap (Markdown)](/sitemap.md)
- **Format**: Markdown
- **Purpose**: Human-readable site structure overview
- **Content**: This document - comprehensive site navigation
- **Content-Type**: text/markdown

---

## 🔧 API Endpoints

### [GitHub API](/api/github)
- **Purpose**: GitHub integration for project and activity data
- **Endpoints**: User info, repositories, contributions, events
- **Authentication**: OAuth token-based

### [Spotify API](/api/spotify)
- **Purpose**: Music activity and listening data integration
- **Endpoints**: Currently playing, recent tracks, top artists
- **Authentication**: Spotify Web API

### [Strava API](/api/strava)
- **Purpose**: Athletic activity and fitness data integration
- **Endpoints**: Activities, stats, athlete information
- **Authentication**: Strava API

---

## 📊 Analytics & Monitoring

### [Analytics](/api/analytics)
- **Purpose**: Website performance and user analytics
- **Provider**: PostHog integration
- **Data**: Page views, user behavior, performance metrics

### [Observability](/api/observability)
- **Purpose**: Application monitoring and error tracking
- **Provider**: Sentry integration
- **Data**: Error tracking, performance monitoring

---

## 🔒 Security & Rate Limiting

### [Security Headers](/api/security)
- **Purpose**: Security middleware and protection
- **Features**: CSRF protection, security headers, input validation
- **Implementation**: Arcjet security integration

### [Rate Limiting](/api/rate-limit)
- **Purpose**: API rate limiting and abuse prevention
- **Features**: Request throttling, IP-based limits
- **Implementation**: Custom rate limiting middleware

---

## 🎨 Design System

### [Components](/design-system)
- **Purpose**: Reusable UI components and design patterns
- **Technology**: Custom design system with Tailwind CSS
- **Features**: Consistent styling, accessibility, responsive design

### [Icons](/icon)
- **Format**: PNG/ICO
- **Purpose**: Favicon and app icons for different platforms
- **Sizes**: Multiple resolutions for various use cases

---

## 📱 Progressive Web App

### [Manifest](/manifest)
- **Format**: Web App Manifest
- **Purpose**: PWA configuration and app metadata
- **Features**: Offline support, app installation, splash screens

### [Service Worker](/sw.js)
- **Purpose**: Offline functionality and caching
- **Features**: Asset caching, offline fallbacks, background sync

---

## 🔍 SEO & Meta

### [Robots.txt](/robots.txt)
- **Purpose**: Search engine crawling instructions
- **Content**: Allow/disallow directives for crawlers
- **Optimization**: SEO-friendly crawling policies

### [Open Graph](/og)
- **Purpose**: Social media sharing metadata
- **Content**: Title, description, images for social platforms
- **Platforms**: Twitter, Facebook, LinkedIn

---

## 📈 Performance

### [Core Web Vitals](/api/performance)
- **Purpose**: Performance monitoring and optimization
- **Metrics**: LCP, FID, CLS, and other vitals
- **Tools**: Lighthouse integration, real user monitoring

### [Analytics Dashboard](/analytics)
- **Purpose**: Website analytics and performance insights
- **Data**: Traffic sources, user behavior, conversion metrics
- **Visualization**: Charts and performance trends

---

## 🌐 External Links

### [Frontal Labs](https://frontal.dev)
- **Description**: AI-powered business platform
- **Role**: Founder & Lead Developer
- **Technologies**: Next.js, AI/ML, Cloud Infrastructure

### [GitHub Profile](https://github.com/gabfon)
- **Description**: Open source contributions and projects
- **Focus**: Developer tools, AI/ML, web technologies
- **Activity**: Regular commits, issues, and contributions

### [LinkedIn Profile](https://linkedin.com/in/gabriel-p-fonseca)
- **Description**: Professional network and career updates
- **Content**: Work experience, recommendations, professional connections
- **Networking**: Industry connections and professional opportunities

---

## 📝 Content Structure

### Blog Categories
- **Web Development**: Frontend, backend, full-stack tutorials
- **AI/ML**: Machine learning, LLMs, edge AI implementations
- **Performance**: Optimization techniques, best practices
- **DevOps**: Deployment, CI/CD, infrastructure
- **Design**: UI/UX, accessibility, responsive design

### Project Types
- **Open Source**: Community projects and contributions
- **Commercial**: Client work and freelance projects
- **Personal**: Experimental and learning projects
- **Research**: Academic and experimental work

---

## 🔗 Navigation Hierarchy

gabfon.com/
├── / (Home)
├── /about
├── /posts/[slug]
├── /projects/[slug]
├── /contact
├── /api/
│   ├── /github
│   ├── /spotify
│   ├── /strava
│   └── /analytics
├── /design-system
├── /llms.txt
├── /llms-full.txt
├── /llms.md
├── /rss.xml
├── /sitemap.xml
├── /sitemap.md
└── /robots.txt

---

*Last Updated: ${new Date().toISOString().split('T')[0]}*
*Site URL: gabfon.com*
*Contact: hey@gabfon.com*
`;

  return new Response(content, {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
    },
  });
}
