# global types documentation

This directory contains comprehensive TypeScript type definitions for the entire monorepo project.

## Structure

```
types/
├── global.d.ts     # Core project types and interfaces
├── node.d.ts      # Node.js specific types and global declarations
├── react.d.ts     # React component props, hooks, and event types
├── next.d.ts      # Next.js specific types and framework extensions
├── bun.d.ts       # Bun runtime and server types
└── index.d.ts      # Main entry point with utility types
```

## Usage

### Import All Types
```typescript
import * as Types from '@/types';
```

### Import Specific Categories
```typescript
// Core types
import { User, BlogPost, ApiResponse } from '@/types/global';

// Node.js types
import { ProcessEnv } from '@/types/node';

// React types
import { ReactButtonProps, ReactInputProps } from '@/types/react';

// Next.js types
import { NextPageProps, NextMetadata } from '@/types/next';

// Bun types
import { BunFile, BunServer } from '@/types/bun';

// Utility types
import { Optional, PaginatedResult } from '@/types';
```

## Type Categories

### Core Types (`global.d.ts`)
- **User**: Complete user model with preferences and metadata
- **BlogPost**: Blog content structure with author relationships
- **Comment**: Comment system with post relationships
- **ApiResponse**: Generic API response wrapper
- **MockResponse**: Typed mock responses for testing
- **PerformanceResult**: Performance measurement utilities

### Node.js Types (`node.d.ts`)
- **ProcessEnv**: Environment variables with Next.js extensions
- **Global APIs**: Performance, Console, Fetch, Storage, URL, Timer, Crypto

### React Types (`react.d.ts`)
- **Component Props**: Button, Input, Card, Link, Image, Modal, Table
- **Event Handlers**: Complete event handler interfaces
- **Hook Returns**: useState, useEffect, useRef return types
- **Context Types**: React context interface
- **Layout Types**: Layout component configuration

### Next.js Types (`next.d.ts`)
- **App Router**: App Router types and page props
- **Metadata**: SEO metadata interfaces
- **Navigation**: Router navigation methods
- **Components**: Image, Script, Font, Link, Form types
- **Server Actions**: Server action and API route types

### Bun Types (`bun.d.ts`)
- **File System**: BunFile interface with complete file operations
- **Server Types**: BunServer and HTTP serving types
- **Database**: SQLite database interface
- **Runtime**: Bun runtime information and utilities

### Utility Types (`index.d.ts`)
- **Optional/Required**: TypeScript utility types
- **Pagination**: Complete pagination interfaces
- **API Response**: Generic response and error types
- **Validation**: Form validation and error types
- **Configuration**: App configuration interfaces
- **Performance**: Monitoring and metrics types

## Features

### Comprehensive Coverage
- All major frameworks: Node.js, React, Next.js, Bun
- Complete API coverage for each framework
- Extensible structure for future additions

### Type Safety
- Full TypeScript support with proper interfaces
- Generic types for reusable components
- Strict typing for all API responses

### Developer Experience
- Full IntelliSense support across entire project
- Consistent import patterns (`@/types/*`)
- Clear documentation and examples

## Integration

To use these types in your project:

1. **Update tsconfig.json**:
```json
{
  "compilerOptions": {
    "typeRoots": ["./types"],
    "paths": {
      "@/*": ["./src/*", "./types/*"]
    }
  }
}
```

2. **Import in components**:
```typescript
import { ReactButtonProps } from '@/types/react';

const MyButton: React.FC<ReactButtonProps> = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick 
}) => {
  return (
    <button 
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

3. **Use in API routes**:
```typescript
import { NextAPIRoute } from '@/types/next';

export const GET: NextAPIRoute = async (request) => {
  // Type-safe API route implementation
  return Response.json({ success: true, data: [] });
};
```

## Benefits

1. **Consistency**: Unified type definitions across all packages
2. **Maintainability**: Centralized types for easy updates
3. **Developer Experience**: Full IntelliSense and type checking
4. **Framework Support**: Specific types for each major framework
5. **Future-Proof**: Extensible structure for new features

## Best Practices

1. **Use specific imports**: Import only needed types
2. **Prefer utility types**: Use Optional, Required, etc. for common patterns
3. **Extend interfaces**: Use interface extension for custom props
4. **Type guards**: Use provided type guards for runtime checks

This global types system provides comprehensive TypeScript support for the entire monorepo project.
