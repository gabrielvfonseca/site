---
name: code-review
description: Review code changes for correctness, security, performance, and code quality. Use when the user asks to review a diff, review code changes, review commits, or perform a code review. Input can be: (1) a text diff pasted directly, (2) one or more git commit hashes to extract the diff from, or (3) a git range like abc123..def456. The user may also provide task description or requirements that motivated the change.
license: Complete terms in LICENSE.txt
---

This skill provides comprehensive code review capabilities for maintaining high-quality, secure, and performant code.

The user requests a code review: diff analysis, commit review, or general code quality assessment.

## Code Review Framework

### Review Categories

**Correctness**
- Logic errors and bug potential
- Edge case handling
- Data validation and type safety
- Error handling completeness

**Security**
- Input validation and sanitization
- Authentication and authorization
- Sensitive data exposure
- Dependency vulnerabilities

**Performance**
- Algorithmic efficiency
- Memory usage patterns
- Network request optimization
- Bundle size impact

**Code Quality**
- Readability and maintainability
- Adherence to project standards
- TypeScript best practices
- Testing coverage

### Review Process

1. **Understand Context**: Review the task description and requirements
2. **Analyze Changes**: Examine the diff for each category
3. **Identify Issues**: Flag problems with severity levels
4. **Suggest Improvements**: Provide actionable recommendations
5. **Validate Fixes**: Ensure solutions don't introduce new issues

### Severity Levels

**Critical**: Must fix before merge
- Security vulnerabilities
- Breaking changes
- Performance regressions
- Logic errors affecting core functionality

**Major**: Should fix before merge
- Code quality issues
- Missing error handling
- Incomplete implementations
- Test coverage gaps

**Minor**: Nice to fix
- Style inconsistencies
- Documentation gaps
- Optimization opportunities
- Code organization improvements

### Common Review Patterns

**TypeScript Reviews**:
```typescript
// Bad: Implicit any
function processData(data) {
  return data.map(item => item.value)
}

// Good: Explicit typing
interface DataItem {
  value: string
  id: number
}

function processData(data: DataItem[]): Array<{value: string; id: number}> {
  return data.map(item => ({ value: item.value, id: item.id }))
}
```

**React Component Reviews**:
```tsx
// Bad: Missing props interface
export default function Button(props) {
  return <button {...props}>{props.children}</button>
}

// Good: Proper typing and accessibility
interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn('button', variant)}
      aria-disabled={disabled}
    >
      {children}
    </button>
  )
}
```

**API Route Reviews**:
```typescript
// Bad: No validation or error handling
export async function POST(request: Request) {
  const body = await request.json()
  return NextResponse.json({ data: body })
}

// Good: Validation and error handling
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = CreatePostSchema.parse(body)
    
    // Process data
    const result = await createPost(validatedData)
    
    return NextResponse.json({ data: result }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }
    
    Sentry.captureException(error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### Project-Specific Standards

**Frontend Lab Requirements**:
- TypeScript strict mode compliance
- Absolute imports with @/ prefix
- shadcn/ui component usage
- Tailwind CSS styling
- Accessibility (WCAG 2.1 AA)
- Test coverage ≥80%

**Security Requirements**:
- Environment variable usage via @/config/env
- Input validation with Zod schemas
- CSRF protection for forms
- No hardcoded secrets
- Proper error handling with Sentry

**Performance Standards**:
- Next.js Image component usage
- Code splitting with dynamic imports
- Proper caching strategies
- Bundle size optimization
- Core Web Vitals compliance

### Review Output Format

```markdown
# Code Review Summary

## Good Changes
- Well-structured component architecture
- Proper TypeScript typing
- Comprehensive error handling

## Critical Issues
- Security vulnerability in API route
- Missing input validation

## Major Issues  
- Incomplete test coverage
- Performance regression in data fetching

## Suggestions
- Consider using React.memo for optimization
- Add JSDoc comments for complex functions
- Extract constants to separate file

## Approval Criteria
- [ ] Fix security issues
- [ ] Add missing tests
- [ ] Address performance concerns
- [ ] Update documentation
```

### Integration with Workflows

This skill integrates with:
- **Development Workflow**: Ensure code quality during development
- **Testing Workflow**: Validate test coverage and quality
- **Deployment Workflow**: Final quality gate before production

Remember: A good code review is constructive, educational, and focused on improving both the code and the developer. Provide specific, actionable feedback with clear examples and explanations.
