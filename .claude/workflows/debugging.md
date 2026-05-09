---
description: "Systematic debugging workflow for issue resolution and performance optimization"
---

# Debugging Workflow

## 1. Issue Identification
- Reproduce the issue consistently
- Gather error messages and stack traces
- Check Sentry for related error patterns
- Identify affected components and user flows
- Document steps to reproduce

## 2. Root Cause Analysis
- Examine recent code changes
- Check environment configuration
- Review network requests and responses
- Analyze component state and props
- Verify data flow and transformations

## 3. Debugging Tools
- Use browser dev tools for frontend issues
- Check Next.js dev server logs
- Review Sentry error tracking
- Use React DevTools for component state
- Test with different user roles and permissions

## 4. Common Issue Categories
- **TypeScript errors**: Check types and interfaces
- **Styling issues**: Verify Tailwind classes and responsive design
- **Data fetching**: Check API endpoints and error handling
- **Performance**: Analyze bundle size and loading times
- **Accessibility**: Test with screen readers and keyboard navigation

## 5. Debugging Commands
```bash
# Development debugging
bun run dev:inspect
bun run build --debug

# Testing specific scenarios
bun run test -- --grep "specific test"
bun run test:coverage

# Performance analysis
bun run analyze
bun run build && bun run start
```

## 6. Verification Steps
- Test fix across different browsers
- Verify responsive design
- Check accessibility compliance
- Ensure no regressions in existing functionality
- Validate error handling and edge cases

## 7. Documentation
- Document root cause and solution
- Add preventive measures if applicable
- Update test cases to cover the scenario
- Share learnings with team

## Performance Debugging
- Use Lighthouse for performance audits
- Analyze Core Web Vitals
- Check bundle size with webpack-bundle-analyzer
- Monitor memory usage
- Test on different network conditions

## Error Handling Patterns
- Implement proper error boundaries
- Use Sentry for error tracking
- Provide meaningful error messages
- Log errors appropriately
- Handle edge cases gracefully

## Testing Fixes
- Write regression tests for fixed issues
- Test across different environments
- Verify fix doesn't break other functionality
- Test with various data sets
- Check performance impact

## Common Debugging Scenarios
- **Component not rendering**: Check imports, exports, and dependencies
- **State not updating**: Verify React hooks and dependencies
- **API errors**: Check endpoints, headers, and error handling
- **Styling issues**: Verify CSS classes, specificity, and responsive design
- **Performance issues**: Analyze bundle, images, and rendering
