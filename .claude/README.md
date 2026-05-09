# Claude Code Configuration

This directory contains comprehensive Claude Code configuration for Frontal Labs Website project.

## Structure

```
.claude/
├── README.md                 # This file - comprehensive configuration documentation
├── config.json              # Main Claude configuration (legacy)
├── settings.json             # Complete Claude Code settings with all options
├── CLAUDE.md                 # Project-level system prompt
├── permissions.json          # Permission rules and security settings
├── attribution.json          # Attribution templates and hook configurations
├── environment.json          # Environment variables management
├── agents/                   # Subagent configurations
│   ├── frontend-specialist.json
│   ├── backend-integrator.json
│   └── testing-qa.json
├── skills/                   # Specialized Claude skills
│   ├── frontend-design/SKILL.md
│   ├── next-best-practices/SKILL.md
│   ├── code-review/SKILL.md
│   └── playwright/SKILL.md
└── workflows/                # Development workflows
    ├── development.md
    ├── testing.md
    ├── deployment.md
    ├── debugging.md
    └── code-review.md
```

## Configuration Overview

### Main Configuration Files

#### `settings.json` - Complete Claude Code Settings
Comprehensive configuration covering all Claude Code features:
- **Permissions**: Detailed allow/ask/deny rules for all operations
- **Attribution**: Git commit and PR templates
- **MCP Integration**: Model Context Protocol server configurations
- **Plugins**: Plugin marketplace and enabled plugins
- **UI Settings**: Interface customization and behavior
- **Development Standards**: Code style, TypeScript rules, testing requirements
- **Integrations**: Next.js, Tailwind, shadcn/ui, Sanity, Vercel configurations

#### `CLAUDE.md` - Project System Prompt
Comprehensive system prompt containing:
- **Project Overview**: Next.js 16 + TypeScript + Sanity CMS stack
- **Architecture Patterns**: File organization and naming conventions
- **Development Standards**: Code quality, testing, security requirements
- **Technology Integration**: Framework-specific best practices
- **Workflow Commands**: Development, testing, deployment procedures
- **Critical Rules**: Security and quality requirements

#### `permissions.json` - Security & Permissions
Detailed permission management:
- **Command Permissions**: Allow/ask/deny for bash commands
- **File Access**: Read/write/edit permissions by file type
- **Network Access**: Allowed domains and URL patterns
- **Context-Specific Rules**: Development, testing, deployment contexts
- **Security Monitoring**: Audit logging and compliance

#### `attribution.json` - Attribution & Hooks
Automation and attribution configuration:
- **Git Attribution**: Commit and PR templates
- **Webhooks**: GitHub, Vercel, Sentry integrations
- **Automation Hooks**: Pre-commit, pre-push, pre-deployment scripts
- **Notifications**: Slack, email, GitHub notifications
- **Reporting**: Daily, weekly, monthly reports

#### `environment.json` - Environment Management
Environment variable configuration:
- **Multi-Environment Support**: Development, testing, production
- **Validation**: Type checking and pattern validation
- **Security**: Encryption and access control
- **Integration**: Vercel, GitHub, Sanity sync

### Specialized Agents

#### `frontend-specialist.json`
- **Focus**: UI/UX design, component architecture, accessibility
- **Capabilities**: Code generation, design systems, performance optimization
- **Tools**: File system, terminal, browser preview

#### `backend-integrator.json`
- **Focus**: API development, CMS integration, security
- **Capabilities**: API routes, data modeling, authentication
- **Tools**: API testing, database integration, security scanning

#### `testing-qa.json`
- **Focus**: Comprehensive testing strategy, quality assurance
- **Capabilities**: Unit tests, E2E tests, accessibility testing
- **Tools**: Test automation, coverage analysis, performance testing

### Specialized Skills

#### `frontend-design`
Creative UI/UX development with distinctive aesthetics
- Avoids generic AI-generated designs
- Focus on typography, color, motion, spatial composition
- Production-grade, visually striking interfaces

#### `next-best-practices`
Next.js 16 expertise with App Router
- Server vs client component decisions
- Performance optimization patterns
- Modern API route patterns

#### `code-review`
Comprehensive code quality assessment
- Correctness, security, performance, quality review
- Severity-based issue classification
- Project-specific standards enforcement

#### `playwright`
Browser automation and E2E testing
- Cross-browser testing, responsive design
- Form testing, authentication flows
- Performance and accessibility testing

## Key Features

### Development Excellence
- **TypeScript Strict Mode**: Enforced throughout project
- **Testing Coverage**: ≥80% requirement with comprehensive strategy
- **Code Quality**: ESLint, Prettier, automated formatting
- **Performance**: Core Web Vitals compliance and optimization

### Security First
- **Permission Management**: Granular control over all operations
- **Environment Security**: Encrypted secrets, access control
- **Input Validation**: Zod schemas for all data
- **Audit Trail**: Complete logging and monitoring

### Design Excellence
- **Component System**: shadcn/ui with Tailwind CSS
- **Accessibility**: WCAG 2.1 AA compliance
- **Responsive Design**: Mobile-first approach
- **Creative Freedom**: Avoids generic AI aesthetics

### Workflow Automation
- **Git Integration**: Automated attribution and hooks
- **CI/CD Pipeline**: Pre-deployment checks and monitoring
- **Notification System**: Multi-channel alerts and reports
- **Performance Monitoring**: Real-time metrics and alerts

### AI-Powered Development
- **Context Awareness**: Project-specific knowledge and patterns
- **Specialized Skills**: Domain-specific expertise
- **Intelligent Assistance**: Code generation and review
- **Learning System**: Continuous improvement from patterns

## Usage

### For Developers
Claude Code automatically loads this configuration providing:
- **Intelligent Code Generation**: Following project patterns
- **Automated Quality Checks**: Linting, testing, security
- **Contextual Assistance**: Framework-specific guidance
- **Workflow Integration**: Seamless development experience

### For Teams
- **Consistent Standards**: Enforced across all contributors
- **Quality Gates**: Automated code review and testing
- **Security Compliance**: Enterprise-grade permission management
- **Documentation**: Always up-to-date project knowledge

### For Operations
- **Deployment Safety**: Pre-deployment validation
- **Monitoring**: Real-time error tracking and performance
- **Incident Response**: Automated alerts and reporting
- **Compliance**: Audit trails and security monitoring

## Configuration Hierarchy

Claude Code loads configuration in this order (highest to lowest priority):

1. **Managed Settings** (`managed-settings.json`) - Organization-wide policies
2. **Command Line Arguments** - Temporary session overrides
3. **Local Settings** (`.claude/settings.local.json`) - Machine-specific
4. **Project Settings** (`.claude/settings.json`) - Team-shared
5. **User Settings** (`~/.claude/settings.json`) - Personal preferences

## Integration Points

### External Services
- **Vercel**: Deployment, analytics, environment management
- **Sentry**: Error tracking and performance monitoring
- **Sanity**: CMS integration and content management
- **GitHub**: Version control and CI/CD

### Development Tools
- **Bun**: Package manager and task runner
- **Vitest**: Unit and integration testing
- **Playwright**: End-to-end testing
- **Storybook**: Component development and documentation

### Quality Assurance
- **ESLint**: Code quality and style enforcement
- **Prettier**: Code formatting and consistency
- **TypeScript**: Type safety and developer experience
- **Accessibility**: WCAG compliance testing

## Customization

### Adding New Skills
1. Create skill directory: `.claude/skills/skill-name/`
2. Add `SKILL.md` with proper frontmatter
3. Include examples and patterns
4. Test with relevant scenarios

### Configuring New Agents
1. Create agent JSON in `.claude/agents/`
2. Define system prompt and capabilities
3. Set appropriate permissions
4. Configure tools and workflows

### Updating Permissions
1. Edit `.claude/permissions.json`
2. Add/modify allow/ask/deny rules
3. Test permission changes
4. Update documentation

## Best Practices

### Security
- Regularly review permission rules
- Monitor audit logs for suspicious activity
- Keep environment variables secure
- Follow principle of least privilege

### Performance
- Optimize hook execution time
- Use async operations where possible
- Monitor automation impact
- Cache frequently used data

### Maintainability
- Keep configuration files organized
- Document custom rules and hooks
- Regular backup of configuration
- Version control all changes

## Support

For issues with this configuration:
1. Check Claude Code documentation: https://code.claude.com/docs
2. Review project-specific documentation
3. Test configuration changes in development
4. Monitor logs for error patterns

---

This configuration represents a production-ready, enterprise-grade Claude Code setup optimized for the Frontal Labs technology stack and development workflow.
