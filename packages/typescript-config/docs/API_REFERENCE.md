# @gabfon/typescript-config API Reference

## Installation

```bash
npm install @gabfon/typescript-config
```

## Configuration Files

### Base Configuration

#### `base.json`

Foundation TypeScript configuration with modern standards and strict type checking.

##### Usage

```json
// tsconfig.json
{
  "extends": "@gabfon/typescript-config/base.json",
  "compilerOptions": {
    // Package-specific overrides
  }
}
```

##### Configuration

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Default",
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "incremental": false,
    "isolatedModules": true,
    "lib": ["es2022", "DOM", "DOM.Iterable"],
    "module": "NodeNext",
    "moduleDetection": "force",
    "moduleResolution": "NodeNext",
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "strict": true,
    "target": "ES2022",
    "strictNullChecks": true
  }
}
```

##### Compiler Options

| Option | Value | Description |
|--------|-------|-------------|
| `declaration` | `true` | Generate declaration files |
| `declarationMap` | `true` | Generate source maps for declarations |
| `esModuleInterop` | `true` | Enable ES module interop |
| `forceConsistentCasingInFileNames` | `true` | Enforce consistent file naming |
| `incremental` | `false` | Disable incremental compilation |
| `isolatedModules` | `true` | Treat each file as a separate module |
| `lib` | `["es2022", "DOM", "DOM.Iterable"]` | Include ES2022 and DOM libraries |
| `module` | `NodeNext` | Use NodeNext module system |
| `moduleDetection` | `force` | Force module detection |
| `moduleResolution` | `NodeNext` | Use NodeNext module resolution |
| `resolveJsonModule` | `true` | Allow importing JSON files |
| `skipLibCheck` | `true` | Skip type checking of declaration files |
| `strict` | `true` | Enable all strict type checking options |
| `target` | `ES2022` | Target ES2022 JavaScript |
| `strictNullChecks` | `true` | Enable strict null checking |

### Next.js Configuration

#### `nextjs.json`

Specialized configuration for Next.js applications with path aliases and Next.js plugin support.

##### Usage

```json
// tsconfig.json
{
  "extends": "@gabfon/typescript-config/nextjs.json",
  "compilerOptions": {
    // App-specific overrides
  }
}
```

##### Configuration

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Next.js",
  "extends": "./base.json",
  "compilerOptions": {
    "plugins": [{ "name": "next" }],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "allowJs": true,
    "jsx": "preserve",
    "noEmit": true,
    "paths": {
      "@/*": ["./*"],
      "@gabfon/*": ["../../packages/*"]
    }
  },
  "exclude": ["node_modules"]
}
```

##### Next.js Specific Options

| Option | Value | Description |
|--------|-------|-------------|
| `plugins` | `[{ "name": "next" }]` | Next.js TypeScript plugin |
| `module` | `ESNext` | Use ESNext module system |
| `moduleResolution` | `Bundler` | Use bundler module resolution |
| `allowJs` | `true` | Allow JavaScript files |
| `jsx` | `preserve` | Preserve JSX for Next.js |
| `noEmit` | `true` | Next.js handles compilation |
| `paths.@/*` | `[ "./*" ]` | Local path alias |
| `paths.@gabfon/*` | `[ "../../packages/*" ]` | Monorepo path alias |

### React Library Configuration

#### `react-library.json`

Configuration for React component libraries with modern JSX transform and bundler optimization.

##### Usage

```json
// tsconfig.json
{
  "extends": "@gabfon/typescript-config/react-library.json",
  "compilerOptions": {
    // Library-specific overrides
  }
}
```

##### Configuration

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "React Library",
  "extends": "./base.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "lib": ["es2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "Bundler"
  }
}
```

##### React Library Options

| Option | Value | Description |
|--------|-------|-------------|
| `jsx` | `react-jsx` | Use modern JSX transform |
| `lib` | `["es2022", "DOM", "DOM.Iterable"]` | Include ES2022 and DOM libraries |
| `module` | `ESNext` | Use ESNext module system |
| `moduleResolution` | `Bundler` | Use bundler module resolution |

### Turbo Configuration

#### `turbo.json`

Configuration for Turbo build system with incremental compilation support.

##### Usage

```json
// tsconfig.json
{
  "extends": "@gabfon/typescript-config/turbo.json",
  "compilerOptions": {
    // Turbo-specific overrides
  }
}
```

##### Configuration

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Turbo",
  "extends": "./base.json",
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": ".tsbuildinfo"
  }
}
```

##### Turbo Options

| Option | Value | Description |
|--------|-------|-------------|
| `incremental` | `true` | Enable incremental compilation |
| `tsBuildInfoFile` | `".tsbuildinfo"` | TypeScript build info file |

## Usage Examples

### Next.js Application

```json
// apps/web/tsconfig.json
{
  "extends": "@gabfon/typescript-config/nextjs.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/styles/*": ["./styles/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules",
    ".next",
    "dist"
  ]
}
```

### React Component Library

```json
// packages/design-system/tsconfig.json
{
  "extends": "@gabfon/typescript-config/react-library.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "__tests__",
    "**/*.test.ts",
    "**/*.test.tsx",
    "**/*.stories.tsx"
  ]
}
```

### API Package

```json
// packages/github/tsconfig.json
{
  "extends": "@gabfon/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "__tests__",
    "**/*.test.ts"
  ]
}
```

### Turbo Monorepo

```json
// tsconfig.json (root)
{
  "extends": "@gabfon/typescript-config/turbo.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@gabfon/*": ["./packages/*"]
    }
  },
  "include": [
    "packages/**/*",
    "apps/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    ".next"
  ]
}
```

## Advanced Configuration

### Custom Overrides

```json
// tsconfig.json with custom settings
{
  "extends": "@gabfon/typescript-config/base.json",
  "compilerOptions": {
    // Custom target
    "target": "ES2021",
    
    // Custom module resolution
    "moduleResolution": "node",
    
    // Custom path aliases
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/components/*": ["./src/components/*"]
    },
    
    // Custom output
    "outDir": "./build",
    "rootDir": "./src"
  },
  "include": [
    "src/**/*",
    "types/**/*"
  ],
  "exclude": [
    "node_modules",
    "build",
    "**/*.test.ts",
    "**/*.test.tsx"
  ]
}
```

### Environment-Specific Configurations

```json
// tsconfig.json for development
{
  "extends": "@gabfon/typescript-config/nextjs.json",
  "compilerOptions": {
    "sourceMap": true,
    "inlineSourceMap": true
  },
  "include": [
    "**/*.ts",
    "**/*.tsx"
  ]
}
```

```json
// tsconfig.build.json for production
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "sourceMap": false,
    "removeComments": true,
    "noEmit": false,
    "outDir": "./dist"
  },
  "exclude": [
    "**/*.test.ts",
    "**/*.test.tsx",
    "**/*.stories.tsx"
  ]
}
```

### Multiple Configurations

```json
// tsconfig.json (main)
{
  "extends": "@gabfon/typescript-config/base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

```json
// tsconfig.eslint.json (for ESLint)
{
  "extends": "./tsconfig.json",
  "include": [
    "src/**/*",
    "tests/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```

```json
// tsconfig.jest.json (for Jest)
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "CommonJS",
    "allowJs": true,
    "esModuleInterop": true
  },
  "include": [
    "src/**/*",
    "tests/**/*",
    "__tests__/**/*"
  ]
}
```

## Path Aliases

### Monorepo Path Mapping

```json
{
  "compilerOptions": {
    "paths": {
      "@gabfon/ai": ["../../packages/ai/src"],
      "@gabfon/analytics": ["../../packages/analytics/src"],
      "@gabfon/design-system": ["../../packages/design-system/src"],
      "@gabfon/email": ["../../packages/email/src"],
      "@gabfon/github": ["../../packages/github/src"],
      "@gabfon/next-config": ["../../packages/next-config/src"],
      "@gabfon/observability": ["../../packages/observability/src"],
      "@gabfon/rate-limit": ["../../packages/rate-limit/src"],
      "@gabfon/security": ["../../packages/security/src"],
      "@gabfon/seo": ["../../packages/seo/src"],
      "@gabfon/spotify": ["../../packages/spotify/src"],
      "@gabfon/strava": ["../../packages/strava/src"],
      "@gabfon/testing": ["../../packages/testing/src"],
      "@gabfon/typescript-config": ["../../packages/typescript-config"]
    }
  }
}
```

### Local Path Aliases

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/types/*": ["./src/types/*"],
      "@/utils/*": ["./src/utils/*"],
      "@/styles/*": ["./src/styles/*"],
      "@/assets/*": ["./src/assets/*"]
    }
  }
}
```

## Best Practices

### 1. Configuration Inheritance

```json
// Good: Extend base configuration
{
  "extends": "@gabfon/typescript-config/base.json",
  "compilerOptions": {
    // Only necessary overrides
  }
}

// Bad: Duplicate configuration
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "module": "NodeNext",
    // ... many duplicated options
  }
}
```

### 2. Path Aliases

```json
// Good: Consistent path aliases
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"]
    }
  }
}

// Bad: Inconsistent paths
{
  "compilerOptions": {
    "paths": {
      "components": ["./src/components"],
      "utils": ["./src/utils"]
    }
  }
}
```

### 3. Include/Exclude Patterns

```json
// Good: Specific patterns
{
  "include": [
    "src/**/*",
    "types/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.ts",
    "**/*.test.tsx"
  ]
}

// Bad: Too broad patterns
{
  "include": ["**/*"],
  "exclude": ["node_modules"]
}
```

## Troubleshooting

### Common Issues

#### Path Resolution

```json
// Issue: Cannot find module
{
  "extends": "@gabfon/typescript-config/nextjs.json",
  "compilerOptions": {
    "baseUrl": ".",  // Add baseUrl for relative paths
    "paths": {
      "@/*": ["./*"]  // Ensure correct path mapping
    }
  }
}
```

#### Module Resolution

```json
// Issue: Module resolution errors
{
  "extends": "@gabfon/typescript-config/base.json",
  "compilerOptions": {
    "moduleResolution": "NodeNext",  // Use NodeNext for modern projects
    "module": "NodeNext",
    "esModuleInterop": true
  }
}
```

#### Declaration Files

```json
// Issue: Missing declaration files
{
  "extends": "@gabfon/typescript-config/react-library.json",
  "compilerOptions": {
    "declaration": true,           // Enable declarations
    "declarationMap": true,        // Enable declaration maps
    "outDir": "./dist"              // Specify output directory
  }
}
```

### Performance Issues

```json
// Issue: Slow compilation
{
  "extends": "@gabfon/typescript-config/base.json",
  "compilerOptions": {
    "incremental": true,            // Enable incremental builds
    "skipLibCheck": true,           // Skip library checking
    "tsBuildInfoFile": ".tsbuildinfo"  // Build info file
  }
}
```

## Integration Examples

### With Package.json Scripts

```json
{
  "name": "my-package",
  "scripts": {
    "build": "tsc",
    "build:watch": "tsc --watch",
    "type-check": "tsc --noEmit",
    "lint": "eslint src --ext .ts,.tsx",
    "test": "jest"
  },
  "devDependencies": {
    "@gabfon/typescript-config": "workspace:*",
    "typescript": "^5.0.0",
    "eslint": "^8.0.0",
    "jest": "^29.0.0"
  }
}
```

### With ESLint

```json
// .eslintrc.json
{
  "extends": [
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json",
    "tsconfigRootDir": __dirname
  },
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn"
  }
}
```

### With Jest

```json
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
  ],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
```

### With Vite

```json
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@gabfon': path.resolve(__dirname, '../../packages'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'MyLibrary',
      fileName: (format) => `my-library.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
```
