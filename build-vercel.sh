#!/bin/bash
set -e

# Enable corepack to use the correct pnpm version
corepack enable

# Install dependencies
pnpm install --frozen-lockfile

# Build only the www app (skip tests)
cd apps/www
pnpm build
