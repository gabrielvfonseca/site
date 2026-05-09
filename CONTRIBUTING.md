# contributing

We welcome contributions to this project! This guide will help you get started.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors.

### Our Standards

- **Resful**: Treat all individuals with respect
- **Inclusive**: Welcome diverse perspectives and experiences
- **Collaborative**: Work together constructively
- **Supportive**: Help others learn and grow

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the project team.

## Getting Started

### Prerequisites

- **Git** for version control
- **Node.js** 20+ with [nvm](https://github.com/nvm-sh/nvm)
- **pnpm** 8+ for package management
- **VS Code** (recommended) with proper extensions

### Initial Setup

```bash
# 1. Fork the repository
git clone https://github.com/your-username/site.git
cd site

# 2. Add upstream remote
git remote add upstream https://github.com/original-owner/site.git

# 3. Install dependencies
pnpm install

# 4. Create your feature branch
git checkout -b feature/your-feature-name
```

### Development Environment

```bash
# Start development server
pnpm dev

# Run tests in watch mode
pnpm test --watch

# Type checking
pnpm typecheck --watch
```

## Development Workflow

### Branch Strategy

```bash
main                    # Production branch
├── develop             # Development integration
├── feature/*          # Feature branches
├── bugfix/*           # Bug fix branches
└── hotfix/*           # Critical fixes
```

### Daily Workflow

1. **Sync with Main**

```bash
git checkout main
git pull upstream main
git checkout develop
git merge main
```

2. **Create Feature Branch**

```bash
git checkout -b feature/your-feature-name
```

3. **Development Process**

```bash
# Make changes
# Run tests frequently
pnpm test

# Commit with conventional messages
git add .
git commit -m "feat: add user authentication"
```

4. **Keep Updated**

```bash
# Sync with develop regularly
git checkout develop
git pull upstream develop
git checkout feature/your-feature-name
git rebase develop
```

## Pull Request Process

### Before Submitting

1. **Complete Development**
   - Feature is fully implemented
   - Tests are passing
   - Documentation is updated

2. **Quality Checks**

```bash
# Run full test suite
pnpm test

# Type checking
pnpm typecheck

# Linting and formatting
pnpm lint
pnpm format
```

3. **Prepare PR**

```bash
# Update develop branch
git checkout develop
git pull upstream develop

# Merge your feature
git merge feature/your-feature-name

# Push to your fork
git push origin develop
```

### Creating the Pull Request

1. **Title**: Use conventional commit format
   - `feat: add user authentication`
   - `fix: resolve login validation issue`
   - `docs: update API documentation`

2. **Description**: Include:
   - **What**: Clear description of changes
   - **Why**: Reason for the change
   - **How**: Implementation approach
   - **Testing**: How you tested the changes
   - **Screenshots**: If UI changes

3. **Labels**: Add appropriate labels:
   - `type: feature`
   - `type: bugfix`
   - `type: documentation`
   - `priority: high/medium/low`
   - `status: ready for review`

### PR Template

```markdown
## Description
Brief description of the change.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project standards
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
```

## Coding Standards

### TypeScript Guidelines

```typescript
// Good - Explicit typing
interface User {
  id: string;
  name: string;
  email: string;
}

// Bad - Implicit any
const user = {
  id: '123',
  name: 'John'
};
```

### React Guidelines

```typescript
// Good - Functional component
export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant, 
  onClick 
}) => {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Bad - Class component for simple UI
export class Button extends React.Component {
  // Unnecessary complexity
}
```

### CSS and Styling

```typescript
// Good - Design system usage
import { Button } from '@gabfon/ui';

// Bad - Inline styles
<button style={{ backgroundColor: 'blue' }}>
```

## Testing

### Test Structure

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── Button.stories.tsx
│   └── ...
└── __tests__/
    ├── setup.ts
    └── utils.tsx
```

### Writing Tests

```typescript
// Good - Comprehensive test
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Test Coverage

- Aim for **80%+** coverage
- Focus on critical paths
- Test edge cases

```bash
# Generate coverage report
pnpm test --coverage

# View coverage in browser
open coverage/lcov-report/index.html
```

## Documentation

### When to Document

- **New features**: Always document new functionality
- **API changes**: Update API documentation
- **Breaking changes**: Clearly document migration path
- **Bug fixes**: Document fix and affected areas

### Documentation Standards

```markdown
# Good - Clear structure

## Feature Name

Brief description of what this feature does.

### Usage

```typescript
import { Feature } from '@gabfon/feature';

const App = () => {
  return <Feature />;
};
```

### API

#### `feature()`

Description of the main function.

```typescript
const feature = (options: FeatureOptions): void;
```

### Examples

Show common use cases.
```

### Where to Document

- **Package READMEs**: Each package should have comprehensive README
- **API Reference**: Update `/docs/api.md`
- **User Guides**: Add to `/docs/` directory
- **Code Comments**: Complex logic should be commented

## Release Process

### Version Management

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Changesets

We use Changesets for version management:

```bash
# Add changeset
pnpm changeset

# Version packages
pnpm changeset version

# Release
pnpm changeset publish
```

### Release Checklist

- [ ] All tests passing
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version bumped
- [ ] Release notes prepared
- [ ] Security review completed

## Getting Help

### Resources

- **Documentation**: `/docs/` directory
- **API Reference**: `/docs/api.md`
- **Architecture**: `/docs/architecture.md`
- **Examples**: Check package READMEs

### Communication

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and ideas
- **Discord**: For real-time help (if available)

### Reporting Issues

When reporting issues, include:

1. **Environment**: Node.js version, OS, browser
2. **Steps to Reproduce**: Clear, numbered steps
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Error Messages**: Full error messages/stack traces
6. **Additional Context**: Any relevant information

---

## Thank You!

We appreciate all contributions, whether:
- Bug reports
- Feature suggestions
- Documentation improvements
- Test coverage
- Design feedback

Every contribution helps make this project better for everyone.

---

*This contributing guide evolves with the project. Last updated: 2025-03-23*
