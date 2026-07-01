# Branching Strategy & Git Policy

## Overview

This project follows a production-grade branching model with strong local automation and remote verification.

## Branch Types

### `main` (Production)
- **Purpose**: Stable, production-ready release branch.
- **Merge Strategy**: Squash-and-merge or Rebase-and-merge only.
- **Protection**: Direct commits and force-pushes are completely blocked. Requires two peer approvals and successful CI runs.

### `develop` (Integration/Staging)
- **Purpose**: Active development integration branch.
- **Source**: Branched from `main`.
- **Protection**: Direct commits are blocked. Requires one peer approval and passing CI.

### Feature Branches
- **Naming Convention**: `feature/TICKET-XXX-short-description` (e.g., `feature/TICKET-101-user-auth`).
- **Source**: Branched from `develop`.
- **Target**: Merges to `develop` via Pull Request.

### Bugfix Branches
- **Naming Convention**: `fix/TICKET-XXX-issue-description` (e.g., `fix/TICKET-402-login-loop`).
- **Source**: Branched from `develop`.
- **Target**: Merges to `develop` via Pull Request.

### Hotfix Branches
- **Naming Convention**: `hotfix/TICKET-XXX-urgent-fix` (e.g., `hotfix/TICKET-911-checkout-crash`).
- **Source**: Branched from `main`.
- **Target**: Merges back to both `main` AND `develop` (via separate PRs).

### Release Branches
- **Naming Convention**: `release/vX.Y.Z` (e.g., `release/v1.4.0`).
- **Source**: Branched from `develop`.
- **Target**: Merges to `main` for release, and back to `develop` if there were release-specific patches.

---

## Commit Guidelines

We enforce **Conventional Commits**. All commit messages must use:

```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

### Commit Types
- `feat`: A new user-facing feature.
- `fix`: A bug fix.
- `docs`: Documentation updates.
- `style`: Formatting, missing semi-colons, etc. (no production code changes).
- `refactor`: Refactoring production code without changing behavior.
- `test`: Adding or correcting tests.
- `ci`: CI configuration files and scripts.
- `chore`: Build process, dependencies, and auxiliary tools.
- `revert`: Reverting a previous commit.

---

## Developer Local Setup

To ensure compliance across all machines, run the Git configuration script:

```bash
chmod +x scripts/configure-git.sh
./scripts/configure-git.sh
```

This enforces:
- Rebase workflows on `pull`.
- Standardized fetch pruning.
- Safe LF line endings checking.
- GPG commit signing recommendations.
