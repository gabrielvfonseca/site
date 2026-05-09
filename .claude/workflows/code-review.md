---
description: "Code review process for maintaining quality standards and best practices"
---

# Code Review Workflow

## 1. Review Preparation
- Ensure all tests pass locally
- Check test coverage meets ≥80% requirement
- Verify linting and type checking pass
- Review changes in context of the entire PR
- Understand the purpose and scope of changes

## 2. Code Quality Checks
- **TypeScript**: Verify strict mode compliance and proper typing
- **Components**: Check shadcn/ui usage and accessibility
- **Styling**: Validate Tailwind classes and responsive design
- **Performance**: Review bundle impact and optimization opportunities
- **Security**: Check for potential vulnerabilities and data exposure

## 3. Architecture Review
- Verify adherence to established patterns
- Check component structure and naming conventions
- Validate import organization with `@/` prefix
- Review error handling and loading states
- Ensure proper separation of concerns

## 4. Testing Review
- Validate test coverage for new code
- Check test quality and edge case coverage
- Review integration tests for user flows
- Verify accessibility testing inclusion
- Check Storybook stories for UI components

## 5. Documentation Review
- Ensure component documentation is updated
- Verify usage examples are provided
- Check for environment variable documentation
- Review README updates if API changes were made
- Validate inline code comments

## Review Commands
```bash
# Quality checks
bun run lint:fix
bun run typecheck
bun run test:coverage

# Build verification
bun run build
bun run storybook

# Performance analysis
bun run analyze
bun run build && bun run start
```

## Approval Criteria
- [ ] All tests pass with adequate coverage
- [ ] Code follows project conventions
- [ ] No security vulnerabilities
- [ ] Performance impact is acceptable
- [ ] Documentation is complete
- [ ] Accessibility standards met

## Common Review Points
- **Import organization**: Follow established order
- **Component patterns**: Use functional components with hooks
- **Error handling**: Implement proper boundaries and messages
- **Performance**: Optimize images, use code splitting
- **Accessibility**: Include ARIA labels, semantic HTML
- **Testing**: Cover user scenarios, not implementation details

## Review Feedback Template
### Positive Feedback
- Good use of [specific pattern/technique]
- Well-structured component with proper TypeScript types
- Comprehensive test coverage including edge cases
- Excellent documentation with clear examples

### Improvement Suggestions
- Consider using [specific component/pattern] instead
- Add error handling for [specific scenario]
- Extract [logic] into separate utility function
- Improve accessibility by adding [specific feature]

## Security Review Checklist
- [ ] Input validation implemented
- [ ] No hardcoded secrets or API keys
- [ ] Proper error handling without information leakage
- [ ] CSRF protection where applicable
- [ ] Environment variables used correctly

## Performance Review Checklist
- [ ] Images optimized with Next.js Image component
- [ ] Code splitting implemented for large components
- [ ] Bundle size impact assessed
- [ ] Memory usage considered
- [ ] Loading states implemented appropriately

## Accessibility Review Checklist
- [ ] Semantic HTML5 elements used
- [ ] ARIA labels and roles properly set
- [ ] Keyboard navigation supported
- [ ] Color contrast meets WCAG standards
- [ ] Screen reader compatibility tested
