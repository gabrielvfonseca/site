# Support Guide

## Getting Help

We're here to help! Here are the best ways to get support for gabfon.com.

## Emergency Issues

For critical production issues or security vulnerabilities:
- **Security Issues**: [hey@gabfon.com](mailto:hey@gabfon.com)
- **Production Issues**: [hey@gabfon.com](mailto:hey@gabfon.com)
- **Emergency Contact**: [hey@gabfon.com](mailto:hey@gabfon.com)

## Documentation & Resources

### Official Documentation

- **Main Documentation**: [gabfon.com](https://gabfon.com)
- **GitHub Repository**: [github.com/gabrielvfonseca/site](https://github.com/gabrielvfonseca/site)
- **README**: [Project README](https://github.com/gabrielvfonseca/site/blob/main/README.md)
- **Contributing Guide**: [CONTRIBUTING.md](https://github.com/gabrielvfonseca/site/blob/main/.github/CONTRIBUTING.md)

### Community Resources

- **Issues**: GitHub Issues for bug reports
- **Discussions**: GitHub Discussions for questions
- **Contact**: [hey@gabfon.com](mailto:hey@gabfon.com)

## Bug Reports

### Before Reporting

1. **Search existing issues** to avoid duplicates
2. **Check the documentation** for solutions
3. **Verify the issue** on the latest version
4. **Provide minimal reproduction** steps

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g. macOS, Windows, Linux]
 - Node.js Version: [e.g. 18.17.0]
 - pnpm Version: [e.g. 8.6.0]
 - Browser: [e.g. Chrome, Safari, Firefox]

**Additional context**
Add any other context about the problem here.
```

## Feature Requests

### Before Requesting

1. **Check existing requests** to avoid duplicates
2. **Search discussions** for similar ideas
3. **Consider the scope** and impact
4. **Provide use cases** and examples

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
A clear description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
```

## Getting Started

### Quick Start

```bash
# Clone the repository
git clone https://github.com/gabrielvfonseca/site.git
cd site

# Install dependencies
pnpm install

# Build packages
pnpm build

# Start development
pnpm dev
```

### Development Setup

- **Prerequisites**: Node.js 18+, pnpm 8+
- **Environment**: Copy `.env.example` to `.env.local`
- **Database**: PostgreSQL 14+ with required extensions
- **Tools**: Git, Docker (optional)

## Troubleshooting

### Common Issues

#### Build Failures

```bash
# Clear caches
pnpm store prune
rm -rf .turbo
rm -rf node_modules

# Reinstall dependencies
pnpm install

# Rebuild
pnpm build
```

#### Test Failures

```bash
# Run specific test types
pnpm test:unit
pnpm test:e2e
pnpm test:integration

# Check test coverage
pnpm test:coverage
```

#### Dependency Issues

```bash
# Update dependencies
pnpm update

# Check for vulnerabilities
pnpm audit

# Fix security issues
pnpm audit --fix
```

### Performance Issues

- **Bundle Analysis**: `pnpm analyze`
- **Performance Tests**: `pnpm test:performance`
- **Lighthouse**: `pnpm lighthouse`

## Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Run tests**: `pnpm test`
5. **Submit a pull request**

### Code Quality

- **Linting**: `pnpm lint`
- **Formatting**: `pnpm format`
- **Type Checking**: `pnpm typecheck`
- **Pre-commit Hooks**: Automatic quality checks

### Testing Guidelines

- **Unit Tests**: For individual functions/components
- **Integration Tests**: For component interactions
- **E2E Tests**: For user workflows
- **Accessibility Tests**: For WCAG compliance

## Community Channels

### Events

- **Community Meetups**: Monthly virtual meetups
- **Conference Talks**: Industry conferences and events
- **Workshops**: Hands-on learning sessions

## Contact Information

### General Support

- **Email**: [hey@gabfon.com](mailto:hey@gabfon.com)
- **Website**: [gabfon.com](https://gabfon.com)
- **GitHub**: [github.com/gabrielvfonseca](https://github.com/gabrielvfonseca)

### Contact

- **Main Contact**: [hey@gabfon.com](mailto:hey@gabfon.com)
- **GitHub**: [@gabrielvfonseca](https://github.com/gabrielvfonseca)

### Response Times

- **Critical Issues**: Within 2 hours
- **High Priority**: Within 24 hours
- **Normal Priority**: Within 3 business days
- **Feature Requests**: Within 1 week

## Getting the Most Out of Support

### Provide Context

- **Version information** (Node.js, pnpm, OS)
- **Error messages** and stack traces
- **Steps to reproduce** the issue
- **Expected vs actual behavior**

### Be Patient

- **Complex issues** may take time to investigate
- **Time zones** may affect response times
- **Community support** is often faster than direct contact

### Follow Up

- **Update issues** with new information
- **Close resolved issues** promptly
- **Provide feedback** on solutions

## Additional Resources

### Learning Materials

- **Tutorials**: Step-by-step guides
- **Examples**: Code examples and demos
- **Videos**: Video tutorials and walkthroughs
- **Books**: Recommended reading materials

### Tools & Integrations

- **VS Code Extensions**: Development tools
- **CLI Tools**: Command-line utilities
- **API Clients**: Testing and integration tools
- **Monitoring**: Performance and error tracking

---

**Need immediate help?** Open a [GitHub Issue](https://github.com/gabrielvfonseca/site/issues) or contact [hey@gabfon.com](mailto:hey@gabfon.com)!

**Last Updated**: August 2025
**Support Hours**: 24/7 for critical issues, 9 AM - 6 PM UTC for general support
