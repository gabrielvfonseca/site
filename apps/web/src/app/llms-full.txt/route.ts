import { CONFIG } from '@/constants/config';

export function GET() {
  const content = `# Gabriel Fonseca - Comprehensive Portfolio (gabfon.com)

## Personal Information
**Name**: Gabriel Fonseca
**Title**: Software Developer & Founder
**Location**: ${CONFIG.location}
**Email**: ${CONFIG.email.replace('mailto:', '')}
**Status**: Computer Engineering Student at NOVA FCT

## Professional Summary
Lisbon-based software developer, founder of Frontal Labs, and Computer Engineering student at NOVA FCT. Passionate about building innovative solutions, edge-AI, and creating meaningful digital experiences. Believes in building in public and sharing knowledge with the community.

## Key Projects

### Frontal Labs
AI-powered platform designed to streamline business operations and enhance decision-making processes through intelligent automation and data-driven insights.
- **Role**: Founder & Lead Developer
- **Technologies**: Next.js, AI/ML, Cloud Infrastructure
- **Status**: Active Development

### Fluent Theme
A clean, modern VS Code theme designed for optimal developer experience and reduced eye strain during long coding sessions.
- **Role**: Creator & Maintainer
- **Platform**: Visual Studio Code Marketplace
- **Downloads**: 1000+ active users

### Open Source Contributions
Active contributor to various open source projects with a focus on developer tools and AI applications.
- **GitHub**: ${CONFIG.social.github}
- **Focus Areas**: Developer Tools, AI/ML, Web Technologies
- **Languages**: TypeScript, Go, Rust

## Technical Expertise

### Core Technologies
- **Frontend**: React, Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, Go, Rust, PostgreSQL
- **AI/ML**: WebLLM, WebGPU, LangChain, OpenAI APIs
- **DevOps**: Docker, Vercel, GitHub Actions
- **Mobile**: React Native, Progressive Web Apps

### Specializations
- **Edge-AI**: Browser-based AI implementations using WebLLM and WebGPU
- **LLMs**: Integration and fine-tuning of large language models
- **Micro-animations**: Subtle UI animations for enhanced user experience
- **Product Development**: Full-stack development from concept to deployment
- **Performance Optimization**: Web performance and Core Web Vitals

## Current Activities (/now)

### Academic
- **Studying**: Computer Engineering at NOVA FCT
- **Focus**: Software Engineering, AI/ML, Distributed Systems
- **Expected Graduation**: 2025

### Professional
- **Building**: Frontal Labs - AI-powered business platform
- **Consulting**: Freelance development and technical advisory
- **Open Source**: Maintaining several active projects

### Personal
- **Running**: Regular training and events (Strava)
- **Music**: Continuous discovery and sharing (Spotify/Last.fm)
- **Learning**: Exploring new technologies and frameworks

## Tools & Workflow (/use)

### Development Environment
- **Editors**: VS Code, Cursor
- **Browsers**: Arc Browser
- **OS Tools**: Raycast for productivity automation
- **Version Control**: Git, GitHub

### AI & Automation
- **AI Tools**: WebLLM, WebGPU for client-side AI
- **Automation**: Custom scripts and workflow optimization
- **Testing**: Vitest, Playwright for comprehensive testing

### Design & Productivity
- **Design**: Figma, Tailwind CSS
- **Productivity**: Notion, Linear, Slack
- **Communication**: Email, Twitter, LinkedIn

## Connect & Collaborate

### Professional Networks
- **Twitter**: ${CONFIG.social.twitter}
- **LinkedIn**: ${CONFIG.social.linkedin}
- **GitHub**: ${CONFIG.social.github}
- **Email**: ${CONFIG.email}

### Collaboration
- **Open to**: Technical consulting, freelance projects, speaking opportunities
- **Schedule**: ${CONFIG.schedule}
- **Interests**: AI/ML projects, web development, startup advisory

## Site Philosophy & Approach

### Technical Philosophy
A minimal, fast, and 100% static portfolio website designed with modern web standards. No backend required—uses client-side fetches and browser-based AI (WebLLM) for dynamic functionality.

### Development Principles
- **Performance First**: Optimized for speed and Core Web Vitals
- **Accessibility**: WCAG compliant with semantic HTML
- **Modern Stack**: Next.js, TypeScript, Tailwind CSS
- **Static Generation**: Build-time optimization for maximum performance
- **Progressive Enhancement**: Works without JavaScript, enhanced with it

### Content Strategy
- **Building in Public**: Sharing development journey and insights
- **Knowledge Sharing**: Regular blog posts and tutorials
- **Community Engagement**: Active participation in open source
- **Continuous Learning**: Documenting new technologies and patterns

## Recent Achievements

### Technical
- Launched multiple production applications with modern tech stack
- Contributed to open source projects with 1000+ downloads
- Implemented edge-AI solutions using WebLLM and WebGPU
- Optimized web performance achieving Core Web Vitals scores

### Community
- Active contributor to developer community through open source
- Speaker at local tech meetups and conferences
- Mentor for junior developers through various platforms
- Writer of technical articles and tutorials

## Future Goals

### Short Term (2024)
- Complete Computer Engineering degree
- Scale Frontal Labs to serve more businesses
- Expand open source contributions
- Launch additional developer tools

### Long Term (2025+)
- Build a successful tech company
- Contribute to major open source projects
- Speak at international conferences
- Mentor the next generation of developers

---

*Last Updated: ${new Date().toISOString().split('T')[0]}*
*Portfolio URL: https://gabfon.com*
`;

  return new Response(content, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
    },
  });
}
