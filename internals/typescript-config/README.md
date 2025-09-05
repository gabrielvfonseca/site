# @gabfon/typescript-config

Shared TypeScript configuration for the monorepo.

## Overview

This package provides standardized TypeScript configurations for different project types within the monorepo, ensuring consistent type checking and compilation settings across all packages.

## Features

- **Standardized Configs**: Pre-configured TypeScript settings for different project types
- **Monorepo Support**: Optimized configurations for workspace packages
- **Consistent Rules**: Unified TypeScript rules across all packages
- **Easy Maintenance**: Centralized configuration management

## Installation

```bash
pnpm add -D @gabfon/typescript-config
```

## Usage

### Next.js Projects

```json
{
  "extends": "@gabfon/typescript-config/nextjs.json"
}
```

### React Libraries

```json
{
  "extends": "@gabfon/typescript-config/react-library.json"
}
```

### Base Configuration

```json
{
  "extends": "@gabfon/typescript-config/base.json"
}
```

## Available Configurations

- `base.json` - Base TypeScript configuration
- `nextjs.json` - Next.js specific configuration
- `react-library.json` - React library configuration

## Development

```bash
# Type checking
pnpm typecheck

# Clean build artifacts
pnpm clean
```