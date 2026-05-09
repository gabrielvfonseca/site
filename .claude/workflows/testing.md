---
description: "Comprehensive testing workflow using Vitest, Testing Library, and Playwright"
---

# Testing Workflow

## 1. Testing Strategy
- Maintain 80%+ test coverage
- Test user behavior, not implementation details
- Use pyramid testing: unit → integration → E2E
- Test accessibility features
- Verify responsive design

## 2. Unit Testing with Vitest
- Write tests alongside source files
- Use descriptive test names
- Test components with React Testing Library
- Mock external dependencies
- Use factory functions for test data

## 3. Component Testing
- Use `@testing-library/react` for components
- Test user interactions and workflows
- Use proper queries (`getByRole`, `getByLabelText`)
- Test loading states and error states
- Verify accessibility attributes

## 4. Integration Testing
- Test component interactions
- Use MSW for API mocking
- Test data flow and state management
- Verify error handling
- Test user workflows end-to-end

## 5. E2E Testing with Playwright
- Test critical user journeys
- Verify cross-browser compatibility
- Test mobile and desktop viewports
- Include accessibility testing
- Test performance scenarios

## 6. Test Organization
```
src/
├── components/
│   └── ComponentName/
│       ├── ComponentName.tsx
│       ├── ComponentName.test.tsx
│       └── ComponentName.stories.tsx
├── lib/
│   └── utils.test.ts
└── tests/
    ├── e2e/
    └── integration/
```

## Testing Commands
```bash
bun run test              # Run all tests
bun run test:watch       # Watch mode
bun run test:coverage    # Coverage report
bun run test:e2e         # E2E tests
bun run test:ui          # Test UI
```

## Mocking Strategies
- Mock API calls with `vi.mock()`
- Use factory functions for test data
- Mock third-party libraries at module level
- Reset mocks between tests
- Use TypeScript for mock definitions

## Coverage Requirements
- Minimum 80% coverage for new code
- Focus on critical business logic
- Test error paths and edge cases
- Review coverage reports regularly
- Address uncovered code blocks

## Best Practices
- Test accessibility with screen readers
- Verify keyboard navigation
- Test error boundaries
- Validate form submissions
- Test loading and error states
- Use semantic HTML in tests
