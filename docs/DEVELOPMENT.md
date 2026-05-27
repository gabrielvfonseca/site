# development guide

This guide covers the development workflow, coding standards, and best practices for contributing to this project.

## Development Environment Setup

### Prerequisites

- **Node.js** 20+ with [nvm](https://github.com/nvm-sh/nvm)
- **pnpm** 8+ for package management
- **Git** for version control
- **VS Code** (recommended) with extensions

### VS Code Extensions

Recommended extensions for optimal development:

```json
{
  "recommendations": [
    "biomejs.biome",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-json"
  ]
}
```

## Coding Standards

### TypeScript Guidelines

#### Type Safety

Always use TypeScript with strict mode:

```typescript
// ✅ Good - Explicit types
interface User {
  id: string;
  name: string;
  email: string;
}

const user: User = {
  id: '123',
  name: 'John',
  email: 'john@example.com'
};

// ❌ Bad - Implicit any
const user = {
  id: '123',
  name: 'John',
  email: 'john@example.com'
};
```

#### Component Types

Use proper component typing:

```typescript
// ✅ Good - Proper component typing
interface ButtonProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary';
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  onClick
}) => {
  return (
    <button className={variant} onClick={onClick}>
      {children}
    </button>
  );
};

// ❌ Bad - No typing
export const Button = ({ children, variant, onClick }) => {
  return (
    <button className={variant} onClick={onClick}>
      {children}
    </button>
  );
};
```

### React Guidelines

#### Functional Components

Use functional components with hooks:

```typescript
// ✅ Good - Functional component with hooks
export const UserProfile: React.FC<{ userId: string }> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};
```

#### Custom Hooks

Create reusable custom hooks:

```typescript
// ✅ Good - Custom hook with proper typing
export const useUser = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchUser(userId)
      .then(setUser)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [userId]);

  return { user, loading, error };
};
```

### CSS and Styling Guidelines

#### Tailwind CSS Usage

Use Tailwind CSS classes consistently:

```typescript
// ✅ Good - Semantic Tailwind classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-gray-900">Title</h2>
  <p className="text-gray-600 mt-2">Description</p>
</div>

// ❌ Bad - Arbitrary values without reason
<div className="flex items-center justify-between p-[16px] bg-[#ffffff] rounded-[8px] shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
  <h2 className="text-[20px] font-[600] text-[#111827]">Title</h2>
</div>
```

#### Design System Components

Use design system components when available:

```typescript
// ✅ Good - Using design system
import { Button, Card, Input } from '@gabfon/ui';

export const LoginForm = () => {
  return (
    <Card className="p-6">
      <Input placeholder="Email" type="email" />
      <Input placeholder="Password" type="password" />
      <Button variant="primary">Login</Button>
    </Card>
  );
};

// ❌ Bad - Inline styling
export const LoginForm = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <input className="w-full p-2 border rounded" placeholder="Email" />
      <input className="w-full p-2 border rounded" placeholder="Password" />
      <button className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
    </div>
  );
};
```

## File Naming Conventions

### Components

```
components/
├── Button/
│   ├── Button.tsx          # Component file
│   ├── Button.test.tsx     # Test file
│   ├── Button.stories.tsx   # Storybook stories
│   └── index.ts            # Export barrel
├── Form/
│   ├── Form.tsx
│   ├── Form.test.tsx
│   └── index.ts
└── index.ts                # Components barrel export
```

### Utilities

```
utils/
├── api.ts                 # API utilities
├── format.ts              # Formatting functions
├── validation.ts           # Validation utilities
└── index.ts               # Utilities barrel export
```

### Types

```
types/
├── api.ts                 # API types
├── user.ts                # User-related types
├── common.ts              # Shared types
└── index.ts               # Types barrel export
```

## Git Workflow

### Branch Strategy

```bash
main                      # Production branch
├── develop                # Development branch
├── feature/user-auth       # Feature branches
├── feature/blog-system     # Feature branches
└── hotfix/critical-bug    # Hotfix branches
```

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Features
git commit -m "feat: add user authentication system"

# Bug fixes
git commit -m "fix: resolve login form validation issue"

# Documentation
git commit -m "docs: update API documentation"

# Style changes
git commit -m "style: improve button hover states"

# Refactoring
git commit -m "refactor: simplify user service logic"

# Performance
git commit -m "perf: optimize image loading"

# Tests
git commit -m "test: add unit tests for user service"
```

### Pull Request Process

1. **Create Feature Branch**

```bash
git checkout -b feature/your-feature-name
```

2. **Make Changes**

3. **Run Tests**

```bash
pnpm test
pnpm typecheck
pnpm lint
```

4. **Commit Changes**

```bash
git add .
git commit -m "feat: implement your feature"
```

5. **Push and Create PR**

```bash
git push origin feature/your-feature-name
# Create PR on GitHub
```

## Testing Guidelines

### Unit Testing

Use Vitest for unit tests:

```typescript
// ✅ Good - Comprehensive unit test
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    screen.getByRole('button', { name: 'Click me' }).click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct variant classes', () => {
    render(<Button variant="primary">Primary</Button>);
    const button = screen.getByRole('button');
    
    expect(button).toHaveClass('bg-blue-500', 'text-white');
  });
});
```

### Integration Testing

Test component interactions:

```typescript
// ✅ Good - Integration test
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

describe('LoginForm Integration', () => {
  it('submits form with valid data', async () => {
    render(<LoginForm />);
    
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    });
  });
});
```

## Code Quality Tools

### Biome Configuration

The project uses Biome for linting and formatting:

```json
{
  "formatter": {
    "enabled": true,
    "formatWithErrors": false,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 80
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  }
}
```

### Pre-commit Hooks

Husky runs these checks before commits:

```bash
# .husky/pre-commit
pnpm lint
pnpm format
pnpm typecheck
```

## Performance Guidelines

### React Performance

```typescript
// ✅ Good - Optimized component
export const UserList: React.FC<{ users: User[] }> = React.memo(({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
});

// ❌ Bad - Unoptimized re-renders
export const UserList = ({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};
```

### Bundle Optimization

```typescript
// ✅ Good - Dynamic imports
const AdminPanel = lazy(() => import('./AdminPanel'));

// ❌ Bad - Static imports
import AdminPanel from './AdminPanel';
```

## Security Guidelines

### Input Validation

```typescript
// ✅ Good - Proper validation
import { z } from 'zod';

const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const createUser = async (data: unknown) => {
  const validated = UserSchema.parse(data);
  // Process validated data
};
```

### Environment Variables

```typescript
// ✅ Good - Environment validation
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  API_KEY: z.string().min(1),
});

const env = envSchema.parse(process.env);
```

## Debugging

### VS Code Debugging

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Next.js",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/apps/www/node_modules/.bin/next",
      "args": ["dev"],
      "cwd": "${workspaceFolder}/apps/www",
      "runtimeArgs": ["--inspect"],
      "env": {
        "NODE_OPTIONS": "--inspect"
      }
    }
  ]
}
```

### Browser DevTools

Use React DevTools and Redux DevTools for debugging component state and props.

## Documentation

### Code Comments

```typescript
/**
 * Calculates the total price including tax
 * @param price - Base price before tax
 * @param taxRate - Tax rate as decimal (0.1 for 10%)
 * @returns Total price including tax
 * @example
 * ```typescript
 * calculateTotal(100, 0.1); // Returns 110
 * ```
 */
export const calculateTotal = (price: number, taxRate: number): number => {
  return price * (1 + taxRate);
};
```

### README Files

Each package should have a README.md with:

- Purpose and description
- Installation instructions
- Usage examples
- API documentation
- Contributing guidelines

---

*This development guide evolves with the project. Last updated: 2025-03-23*
