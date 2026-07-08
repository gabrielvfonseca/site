import { CONFIG } from '@/constants/config';

export function GET() {
  const content = `# Gabriel Fonseca

> Software Developer & Founder • [gabfon.com](https://gabfon.com)

---

##  About Me

Lisbon-based software developer, founder of [Frontal Labs](https://frontal.dev), and Computer Engineering student at [NOVA FCT](https://www.fct.unl.pt). Passionate about building innovative solutions, edge-AI, and creating meaningful digital experiences.

-  **Location**: ${CONFIG.location}
-  **Email**: [${CONFIG.email.replace('mailto:', '')}](${CONFIG.email})
-  **Education**: Computer Engineering at NOVA FCT

---

##  Key Projects

### [Frontal Labs](https://frontal.dev) - Founder & Lead Developer
AI-powered platform designed to streamline business operations and enhance decision-making processes through intelligent automation and data-driven insights.

**Technologies**: Next.js, AI/ML, Cloud Infrastructure  
**Status**: Active Development

### [Fluent Theme](https://marketplace.visualstudio.com/items?itemName=gabfon.fluent-theme) - Creator
A clean, modern VS Code theme designed for optimal developer experience and reduced eye strain during long coding sessions.

**Platform**: Visual Studio Code Marketplace  
**Downloads**: 1000+ active users

### Open Source Contributions
Active contributor to various open source projects with a focus on developer tools and AI applications.

**GitHub**: [${CONFIG.social.github}](${CONFIG.social.github})  
**Focus Areas**: Developer Tools, AI/ML, Web Technologies

---

##  Technical Expertise

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

---

##  Connect & Collaborate

### Professional Networks
- **X**: [${CONFIG.social.x}](${CONFIG.social.x})
- **LinkedIn**: [${CONFIG.social.linkedin}](${CONFIG.social.linkedin})
- **GitHub**: [${CONFIG.social.github}](${CONFIG.social.github})
- **Email**: [${CONFIG.email.replace('mailto:', '')}](${CONFIG.email})

### Collaboration
 **Open to**: Technical consulting, freelance projects, speaking opportunities  
 **Schedule**: [${CONFIG.schedule}](${CONFIG.schedule})  
 **Interests**: AI/ML projects, web development, startup advisory

---

##  Site Philosophy & Approach

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

---

##  Recent Achievements

### Technical
 Launched multiple production applications with modern tech stack  
 Contributed to open source projects with 1000+ downloads  
 Implemented edge-AI solutions using WebLLM and WebGPU  
 Optimized web performance achieving Core Web Vitals scores

### Community
 Active contributor to developer community through open source  
 Speaker at local tech meetups and conferences  
 Mentor for junior developers through various platforms  
 Writer of technical articles and tutorials

---

##  Future Goals

### Short Term (2024)
-  Complete Computer Engineering degree
-  Scale Frontal Labs to serve more businesses
-  Expand open source contributions
-  Launch additional developer tools

### Long Term (2025+)
-  Build a successful tech company
-  Contribute to major open source projects
-  Speak at international conferences
-  Mentor the next generation of developers

---

*Last Updated: ${new Date().toISOString().split('T')[0]}*  
*Portfolio: [gabfon.com](https://gabfon.com)*
`;

  return new Response(content, {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
    },
  });
}
