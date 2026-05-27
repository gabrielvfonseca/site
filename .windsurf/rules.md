# Workspace Rules and Guidelines

## Development Rules

### Code Style

- Use TypeScript for all new code
- Follow the existing code formatting rules
- Use Prettier for formatting (configured in ultracite)
- Maintain consistent naming conventions

### File Organization

- Keep components in their respective packages
- Use proper index.ts exports
- Follow the established monorepo structure
- Place tests in dedicated test folders

### Testing

- Write tests for all new features
- Use Vitest for unit and integration tests
- Use Playwright for E2E tests
- Maintain good test coverage

## Workflow Rules

### Branch Management

- Use feature branches for new development
- Keep main branch stable
- Use conventional commits
- Update changelog with changesets

### Dependencies

- Use Bun as the package manager
- Keep dependencies updated
- Use workspace dependencies for internal packages
- Review security vulnerabilities regularly

### Performance

- Optimize bundle sizes
- Use proper caching strategies
- Monitor Core Web Vitals
- Test performance regularly

## Security Rules

### Code Security

- Review code for security issues
- Use environment variables for secrets
- Implement proper authentication
- Follow security best practices

### Dependency Security

- Scan dependencies for vulnerabilities
- Keep packages updated
- Use Snyk for security monitoring
- Review third-party code

## Quality Rules

### Code Quality

- Use ESLint for linting
- Maintain type safety
- Write clear, documented code
- Use meaningful variable names

### Testing Quality

- Test critical paths thoroughly
- Use meaningful test descriptions
- Mock external dependencies
- Test error conditions

## Documentation Rules

### Code Documentation

- Document complex logic
- Use JSDoc for public APIs
- Keep README files updated
- Document configuration options

### Project Documentation

- Update documentation with changes
- Use clear, concise language
- Include code examples
- Maintain changelog

## Environment Rules

### Development Environment

- Use consistent Node.js version (>=18)
- Use Bun package manager
- Configure IDE properly
- Use recommended extensions

### Production Environment

- Test thoroughly before deployment
- Use environment-specific configurations
- Monitor application performance
- Have rollback procedures

## Communication Rules

### Code Reviews

- Review all pull requests
- Provide constructive feedback
- Check for security issues
- Verify test coverage

### Collaboration

- Communicate changes clearly
- Use descriptive commit messages
- Update team on breaking changes
- Document decisions

## Tooling Rules

### IDE Configuration

- Use Windsurf/VS Code settings
- Install recommended extensions
- Use proper debugging configurations
- Configure tasks correctly

### Build Tools

- Use Turbo for monorepo builds
- Configure proper build scripts
- Optimize build performance
- Use appropriate caching

## Monitoring Rules

### Performance Monitoring

- Monitor application performance
- Track Core Web Vitals
- Set up error tracking
- Monitor API response times

### Security Monitoring

- Use security scanning tools
- Monitor for vulnerabilities
- Track security incidents
- Update security measures

These rules help maintain code quality, security, and collaboration standards across the monorepo project.
