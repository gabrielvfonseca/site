# Git Hygiene Implementation Plan
**Status**: Ready for Implementation  
**Effort**: ~4-6 hours initial setup + 1-2 hours per developer for one-time config  
**Risk Level**: Low (all changes are additive)  

---

## PHASE 1: CRITICAL FIXES (Day 1-2)

### Task 1.1: Create .gitattributes

**File**: `.gitattributes`

```
# Auto detect text files and normalize line endings to LF
* text=auto

# Source code - Force LF
*.ts text eol=lf diff=typescript
*.tsx text eol=lf diff=typescript
*.js text eol=lf diff=javascript
*.jsx text eol=lf diff=javascript
*.json text eol=lf diff=json
*.yaml text eol=lf
*.yml text eol=lf
*.md text eol=lf diff=markdown
*.mdx text eol=lf
*.css text eol=lf
*.scss text eol=lf
*.sass text eol=lf
*.less text eol=lf
*.html text eol=lf
*.xml text eol=lf
*.svg text eol=lf diff=svg

# Shell scripts
*.sh text eol=lf
*.bash text eol=lf
*.zsh text eol=lf

# Binary files
*.png binary
*.jpg binary
*.jpeg binary
*.gif binary
*.ico binary
*.webp binary
*.mp4 binary
*.webm binary
*.mp3 binary
*.wav binary
*.ogg binary
*.gz binary
*.zip binary
*.7z binary
*.rar binary
*.woff binary
*.woff2 binary
*.ttf binary
*.otf binary
*.eot binary
*.pdf binary
*.exe binary
*.dll binary
```

**Implementation**:
```bash
# Verify it doesn't already exist
test -f .gitattributes && echo "File exists" || echo "Safe to create"

# Create the file
cat > .gitattributes << 'EOF'
# Auto detect text files and normalize line endings to LF
* text=auto

# Source code - Force LF
*.ts text eol=lf diff=typescript
*.tsx text eol=lf diff=typescript
*.js text eol=lf diff=javascript
*.jsx text eol=lf diff=javascript
*.json text eol=lf diff=json
*.yaml text eol=lf
*.yml text eol=lf
*.md text eol=lf diff=markdown
*.mdx text eol=lf
*.css text eol=lf
*.scss text eol=lf
*.sass text eol=lf
*.less text eol=lf
*.html text eol=lf
*.xml text eol=lf
*.svg text eol=lf diff=svg

# Shell scripts
*.sh text eol=lf
*.bash text eol=lf
*.zsh text eol=lf

# Binary files
*.png binary
*.jpg binary
*.jpeg binary
*.gif binary
*.ico binary
*.webp binary
*.mp4 binary
*.webm binary
*.mp3 binary
*.wav binary
*.ogg binary
*.gz binary
*.zip binary
*.7z binary
*.rar binary
*.woff binary
*.woff2 binary
*.ttf binary
*.otf binary
*.eot binary
*.pdf binary
*.exe binary
*.dll binary
EOF

# Verify
git status

# Stage and commit
git add .gitattributes
git commit -m "docs: add .gitattributes for cross-platform consistency"
```

**Verification**:
```bash
# Check that file is tracked
git ls-files | grep gitattributes

# Show attributes for a file
git check-attr -a src/app/page.tsx
```

---

### Task 1.2: Create .editorconfig

**File**: `.editorconfig`

```
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_size = 2
indent_style = space

[*.{ts,tsx,js,jsx}]
indent_style = space
indent_size = 2
trim_trailing_whitespace = true

[*.{json,json5}]
indent_style = space
indent_size = 2

[*.{yaml,yml}]
indent_style = space
indent_size = 2

[*.{css,scss,sass,less}]
indent_style = space
indent_size = 2

[*.{html,htm}]
indent_style = space
indent_size = 2

[*.md]
trim_trailing_whitespace = false
max_line_length = off

[Makefile]
indent_style = tab

[.editorconfig]
indent_style = space
indent_size = 2
```

**Implementation**:
```bash
cat > .editorconfig << 'EOF'
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_size = 2
indent_style = space

[*.{ts,tsx,js,jsx}]
indent_style = space
indent_size = 2
trim_trailing_whitespace = true

[*.{json,json5}]
indent_style = space
indent_size = 2

[*.{yaml,yml}]
indent_style = space
indent_size = 2

[*.{css,scss,sass,less}]
indent_style = space
indent_size = 2

[*.{html,htm}]
indent_style = space
indent_size = 2

[*.md]
trim_trailing_whitespace = false
max_line_length = off

[Makefile]
indent_style = tab

[.editorconfig]
indent_style = space
indent_size = 2
EOF

# Stage and commit
git add .editorconfig
git commit -m "docs: add .editorconfig for editor consistency"
```

---

### Task 1.3: Create SECURITY.md

**File**: `SECURITY.md`

```markdown
# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, **please do NOT open a public GitHub issue or discussion**.

Instead, please report it confidentially by emailing **security@gabfon.com** with the following information:

- **Vulnerability description**: What is the security issue?
- **Affected component**: Which file, package, or feature is affected?
- **Steps to reproduce**: Clear instructions to reproduce the vulnerability
- **Potential impact**: What could an attacker do with this?
- **Suggested fix** (optional): Any ideas on how to fix it

## Our Commitment

Upon receipt of a vulnerability report, we commit to:

1. **Within 48 hours**: Acknowledge receipt of your report
2. **Within 7 days**: Provide severity assessment and initial response
3. **Within 30 days**: Release a fix or security patch (target)
4. **At publication**: Credit the reporter (unless they request anonymity)

## Responsible Disclosure Timeline

| Timeline | Action |
|----------|--------|
| Day 0 | Vulnerability reported |
| Day 2 | Acknowledgment sent |
| Day 7 | Severity assessment & response |
| Day 30 | Fix release target |
| Day 45 | Public disclosure (after patch is available) |

We may adjust this timeline based on severity and complexity.

## Security Contact

- **Email**: security@gabfon.com
- **Response time**: Within 48 hours (business days)
- **Language**: English preferred

## Supported Versions

| Version | Status | Supported Until |
|---------|--------|-----------------|
| Latest |  Supported | Ongoing |
| Previous Major |  Supported | 12 months |
| Older versions |  Unsupported | Not supported |

Only the latest and previous major versions receive security patches.

## Security Best Practices

When working with this project:

### Credentials & Secrets
- Never commit credentials, API keys, or tokens
- Use environment variables for sensitive data
- Pre-commit hooks scan for secrets automatically

### Dependencies
- Keep dependencies up-to-date
- Review dependency updates in PRs
- Report security issues in dependencies to maintainers first

### Code Review
- All changes require peer review
- Security-sensitive code gets additional review
- Automated security scanning runs on all PRs

## Known Security Limitations

None currently documented. Please report any security concerns.

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [npm Security Advisories](https://www.npmjs.com/advisories)

## Recognition

We thank security researchers who responsibly disclose vulnerabilities. If you report a security issue, we'll acknowledge you in our release notes (unless you prefer anonymity).

---

**Last Updated**: 2026-05-23  
**Next Review**: 2026-08-23
```

**Implementation**:
```bash
cat > SECURITY.md << 'EOF'
# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, **please do NOT open a public GitHub issue or discussion**.

Instead, please report it confidentially by emailing **security@gabfon.com** with the following information:

- **Vulnerability description**: What is the security issue?
- **Affected component**: Which file, package, or feature is affected?
- **Steps to reproduce**: Clear instructions to reproduce the vulnerability
- **Potential impact**: What could an attacker do with this?
- **Suggested fix** (optional): Any ideas on how to fix it

## Our Commitment

Upon receipt of a vulnerability report, we commit to:

1. **Within 48 hours**: Acknowledge receipt of your report
2. **Within 7 days**: Provide severity assessment and initial response
3. **Within 30 days**: Release a fix or security patch (target)
4. **At publication**: Credit the reporter (unless they request anonymity)

## Responsible Disclosure Timeline

| Timeline | Action |
|----------|--------|
| Day 0 | Vulnerability reported |
| Day 2 | Acknowledgment sent |
| Day 7 | Severity assessment & response |
| Day 30 | Fix release target |
| Day 45 | Public disclosure (after patch is available) |

We may adjust this timeline based on severity and complexity.

## Security Contact

- **Email**: security@gabfon.com
- **Response time**: Within 48 hours (business days)
- **Language**: English preferred

## Supported Versions

| Version | Status | Supported Until |
|---------|--------|-----------------|
| Latest |  Supported | Ongoing |
| Previous Major |  Supported | 12 months |
| Older versions |  Unsupported | Not supported |

Only the latest and previous major versions receive security patches.

## Security Best Practices

When working with this project:

### Credentials & Secrets
- Never commit credentials, API keys, or tokens
- Use environment variables for sensitive data
- Pre-commit hooks scan for secrets automatically

### Dependencies
- Keep dependencies up-to-date
- Review dependency updates in PRs
- Report security issues in dependencies to maintainers first

### Code Review
- All changes require peer review
- Security-sensitive code gets additional review
- Automated security scanning runs on all PRs

## Known Security Limitations

None currently documented. Please report any security concerns.

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [npm Security Advisories](https://www.npmjs.com/advisories)

## Recognition

We thank security researchers who responsibly disclose vulnerabilities. If you report a security issue, we'll acknowledge you in our release notes (unless you prefer anonymity).

---

**Last Updated**: 2026-05-23
EOF

git add SECURITY.md
git commit -m "docs: add SECURITY.md for vulnerability disclosure"
```

---

### Task 1.4: Fix commitlint Duplicates

**Current**: `commitlint.config.js` has duplicate entries in type-enum  
**File**: `commitlint.config.js`

```javascript
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'chore', 'refactor', 'test', 'style', 'revert', 'ci', 'perf', 'build']
    ],
    'type-case': [2, 'always', 'lowercase'],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-case': [2, 'always', 'lower-case'],
    'scope-case': [2, 'always', 'kebab-case'],
  },
};
```

**Implementation**:
```bash
cat > commitlint.config.js << 'EOF'
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'chore', 'refactor', 'test', 'style', 'revert', 'ci', 'perf', 'build']
    ],
    'type-case': [2, 'always', 'lowercase'],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-case': [2, 'always', 'lower-case'],
    'scope-case': [2, 'always', 'kebab-case'],
  },
};
EOF

git add commitlint.config.js
git commit -m "chore: remove duplicate type definitions in commitlint config"
```

---

### Task 1.5: Implement Pre-push Hook

**File**: `.husky/pre-push`

Currently empty. Replace with comprehensive validation.

**Implementation**:
```bash
cat > .husky/pre-push << 'EOF'
#!/usr/bin/env sh
set -e

echo " Pre-push validation starting..."

# 1. Check for unresolved merge conflicts
echo "   Checking for merge conflicts..."
if git diff --name-only --diff-filter=U | grep -q .; then
  echo " Merge conflicts detected. Resolve and commit changes."
  exit 1
fi

# 2. Run type checking
echo "   Running TypeScript checks..."
if ! pnpm typecheck; then
  echo " TypeScript compilation errors detected"
  exit 1
fi

# 3. Run tests (only if they exist)
if [ -f "package.json" ] && grep -q '"test"' package.json; then
  echo "   Running tests..."
  if ! pnpm test 2>/dev/null; then
    echo "  Tests failed. Push aborted."
    echo "   Fix test failures and try again."
    exit 1
  fi
fi

echo " Pre-push validation passed!"
EOF

chmod +x .husky/pre-push

git add .husky/pre-push
git commit -m "chore(husky): implement pre-push validation hook"
```

**Testing**:
```bash
# Test the hook manually
.husky/pre-push

# Create a test commit and attempt push (to origin, not remote)
git log -1 --format='%h - %s'
```

---

## PHASE 2: HIGH PRIORITY (Days 3-7)

### Task 2.1: Create Branch Policy Documentation

**File**: `.github/BRANCH_POLICY.md`

```markdown
# Branching Strategy

## Overview

This project follows a modified GitFlow branching model with strong enforcement via Git hooks and GitHub branch protection rules.

## Branch Types

### `main` (Production)
- **Purpose**: Production-ready, deployable code
- **Source**: Created from, can only receive PRs
- **Merge strategy**: Squash + rebase (1 commit per feature)
- **Lifetime**: Permanent
- **Protection Rules**:
  -  Require pull request reviews (≥2 approvals)
  -  Require status checks pass (lint, test, build)
  -  Require branches up-to-date before merge
  -  Require CODEOWNERS review
  -  Dismiss stale PR approvals
  -  Require commit signatures (recommended)
  -  Allow force pushes
  -  Allow deletions

### `develop` (Integration)
- **Purpose**: Integration branch for features, staging area
- **Source**: Created from `main`
- **Merge strategy**: Squash or rebase
- **Lifetime**: Permanent
- **Protection Rules**:
  -  Require pull request reviews (≥1 approval)
  -  Require status checks pass
  -  Require branches up-to-date
  -  Allow force pushes
  -  Allow deletions

### Feature Branches
- **Naming**: `feature/TICKET-XXX-short-description`
  - Example: `feature/TICKET-123-add-user-auth`
  - Keep names short and descriptive
  - Use kebab-case for readability
- **Source**: Branch from `develop`
- **Target**: Merge back to `develop` via PR
- **Lifetime**: Delete after merge
- **Commits**: Can be messy; will be squashed on merge

### Bugfix Branches
- **Naming**: `fix/TICKET-XXX-issue-description`
  - Example: `fix/TICKET-456-handle-null-error`
- **Source**: Branch from `develop`
- **Target**: Merge to `develop` via PR
- **Lifetime**: Delete after merge

### Hotfix Branches
- **Naming**: `hotfix/TICKET-XXX-urgent-fix`
  - Example: `hotfix/TICKET-789-production-outage`
- **Source**: Branch from `main`
- **Target**: Merge to both `main` AND `develop` (separate PRs)
- **Lifetime**: Delete after merge
- **Priority**: Emergency fixes only; requires immediate review

### Release Branches
- **Naming**: `release/v1.2.3`
  - Example: `release/v2.0.0`
  - Follow semantic versioning
- **Source**: Branch from `develop`
- **Target**: Merge to `main` for release
- **Lifetime**: Keep for patch releases
- **Commits**: Version bumps and hotfixes only

## Commit Message Format

All commits MUST follow Conventional Commits format. Enforced by commitlint.

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type (Required)
One of: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `style`, `revert`, `ci`, `perf`, `build`

### Scope (Optional)
Component or package affected (lowercase, kebab-case):
- `api`, `ui`, `database`, `auth`, `payment`, etc.

### Subject (Required)
- Imperative mood: "add" not "added" or "adds"
- Don't capitalize first letter
- No period at end
- Max 50 characters

### Body (Optional)
- Wrap at 72 characters
- Explain WHAT and WHY, not HOW
- Separate from subject with blank line

### Footer (Optional)
- Link issues: `Closes #123`, `Fixes #456`
- Breaking changes: `BREAKING CHANGE: description`

### Examples
```
feat(auth): add two-factor authentication

Allow users to enable 2FA via authenticator apps.
Implements TOTP with configurable issuer name.

Closes #123

feat(api): refactor user endpoints

BREAKING CHANGE: /api/users/:id now returns 404 instead of null
```

## Workflow

### Creating a Feature

```bash
# Update develop and create branch
git checkout develop
git pull origin develop
git checkout -b feature/TICKET-123-my-feature

# Work and commit (messages can be rough, will be squashed)
git add .
git commit -m "feat: working on feature"
git commit -m "fix: addressing review comment"
git commit -m "refactor: cleanup"

# Push and create PR
git push origin feature/TICKET-123-my-feature
# Open PR on GitHub
```

### Merging a Feature

1. **Ensure PR requirements are met**:
   -  2 approvals (from `main` branch rules)
   -  CI passing (lint, test, build)
   -  Branch is up-to-date with develop
   -  No merge conflicts

2. **Merge with GitHub UI**:
   - Select "Squash and merge"
   - Edit commit message to follow Conventional Commits
   - Confirm

3. **Delete branch**:
   - GitHub prompts to delete after merge
   - Accept the prompt

### Hotfixing Production

```bash
# Only for critical production issues
git checkout main
git pull origin main
git checkout -b hotfix/TICKET-999-prod-issue

# Make minimal fix
git add src/...
git commit -m "fix(critical): handle production outage"

# Create PR to main
git push origin hotfix/TICKET-999-prod-issue
# Open PR, get 2 approvals

# Merge to main
git checkout main
git merge --ff-only hotfix/TICKET-999-prod-issue

# Also merge back to develop
git checkout develop
git pull origin develop
git merge --no-ff hotfix/TICKET-999-prod-issue

# Delete hotfix branch
git branch -d hotfix/TICKET-999-prod-issue
```

## Local Git Configuration

Set these once per developer:

```bash
# Basic identity (required)
git config --global user.name "Your Name"
git config --global user.email "your.email@company.com"

# Recommended for this project
git config core.safecrlf true
git config pull.rebase true
git config rebase.autosquash true
git config fetch.prune true
```

## Local Pre-commit Checks

Husky automatically runs these before commit:
-  commitlint validates message format
-  Biome lints and formats code
-  Secrets scanning (if Gitleaks installed)

No manual action needed; hooks run automatically.

## Protected Branches Overview

| Branch | Protection Level | Review Required | CI Required | Force Push |
|--------|------------------|-----------------|-------------|-----------|
| main | **Maximum** | 2 approvals | Yes |  No |
| develop | **High** | 1 approval | Yes |  No |
| feature/* | None | None | No |  Yes |
| fix/* | None | None | No |  Yes |
| hotfix/* | None | None | No |  Yes |

## Troubleshooting

### "Cannot force push to main"
This is intentional. Use a feature branch instead.

### "PR requires 2 approvals"
Two different reviewers must approve. Code owner approval required.

### "Branch is out of date"
Click "Update branch" on GitHub, or:
```bash
git checkout develop && git pull
git rebase develop
git push origin feature/... --force-with-lease
```

### Merge conflicts
```bash
# Update from develop
git fetch origin
git rebase origin/develop

# Resolve conflicts in editor
git add .
git rebase --continue
git push --force-with-lease
```

## Reference

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [GitFlow](https://nvie.com/posts/a-successful-git-branching-model/)
```

**Implementation**:
```bash
cat > .github/BRANCH_POLICY.md << 'EOF'
[Paste the content from above]
EOF

git add .github/BRANCH_POLICY.md
git commit -m "docs: add branching strategy and workflow documentation"
```

---

### Task 2.2: Create Pull Request Template

**File**: `.github/pull_request_template.md`

```markdown
## Description

<!-- Briefly describe the changes in this PR -->

## Type of Change

- [ ] Bug fix (fixes an existing issue)
- [ ] New feature (adds functionality)
- [ ] Breaking change (may impact existing functionality)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring (no feature changes)
- [ ] Test addition or update
- [ ] Dependency update

## Related Issues

<!-- Link issues this PR addresses -->
Closes #123

## Changes Made

<!-- List the key changes -->
- 
- 
- 

## Testing

<!-- How was this tested? Include specific test cases -->

### Test Cases
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed
- [ ] E2E tests passing

### Testing Steps
1. 
2. 
3. 

## Screenshots / Demos

<!-- If UI changes, add screenshots -->

## Breaking Changes

<!-- If there are breaking changes, document them -->

## Checklist

- [ ] Code follows style guidelines
- [ ] TypeScript: No `any` types, strict mode
- [ ] Tests added/updated (≥80% coverage for new code)
- [ ] Documentation updated
- [ ] Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/)
- [ ] No new console.log statements (except dev-only)
- [ ] No hardcoded secrets or API keys
- [ ] No dependency downgrades without justification
- [ ] Changes are backward compatible (or documented as breaking)

## Reviewer Notes

<!-- Any special considerations for reviewers? -->

## Performance Impact

<!-- Document any performance implications -->
- Load time impact: 
- Bundle size impact: 
- Memory usage: 

## Security Considerations

<!-- Document any security implications -->

---

**Author**: @username  
**Created**: YYYY-MM-DD
```

**Implementation**:
```bash
cat > .github/pull_request_template.md << 'EOF'
[Paste the content from above]
EOF

git add .github/pull_request_template.md
git commit -m "docs: add pull request template for standardized reviews"
```

---

### Task 2.3: Extend lint-staged Configuration

**File**: Update `package.json` lint-staged section

**Current**:
```json
"lint-staged": {
  "*.{js,jsx,ts,tsx}": ["ultracite lint", "ultracite format"]
}
```

**Updated**:
```json
"lint-staged": {
  "*.{js,jsx,ts,tsx}": ["ultracite lint", "ultracite format"],
  "*.{json,json5}": ["ultracite format"],
  "*.{yaml,yml}": ["ultracite format"],
  "*.md": ["ultracite format"],
  "*.{css,scss}": ["ultracite format"]
}
```

**Implementation**:
```bash
# Use sed to update the lint-staged section
sed -i '' 's/"lint-staged": {$/&\n    "lint-staged": {/' package.json

# Or manually with a script:
node << 'SCRIPT'
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

pkg['lint-staged'] = {
  "*.{js,jsx,ts,tsx}": ["ultracite lint", "ultracite format"],
  "*.{json,json5}": ["ultracite format"],
  "*.{yaml,yml}": ["ultracite format"],
  "*.md": ["ultracite format"],
  "*.{css,scss}": ["ultracite format"]
};

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
console.log('Updated package.json lint-staged config');
SCRIPT

git add package.json
git commit -m "chore: extend lint-staged to cover all file types"
```

---

### Task 2.4: Add Gitleaks Secret Scanning (Optional for Phase 2)

**Installation & Setup**:
```bash
# Install Gitleaks
brew install gitleaks  # macOS
# or for Linux/Windows, see: https://github.com/gitleaks/gitleaks

# Verify installation
gitleaks version

# Create a pre-commit hook for Gitleaks
npx husky add .husky/pre-commit '
#!/bin/bash
gitleaks protect --verbose --redact --staged || exit 1
'

# Test it
git add sample-file.ts
git commit -m "test: verify gitleaks hook"
```

**Configuration**: Create `.gitleaksignore` (optional) for false positives

---

## PHASE 3: MEDIUM PRIORITY (Week 2)

### Task 3.1: Configure GitHub Branch Protection Rules

**Manual step in GitHub settings** (cannot be automated via repo files):

Navigate to: `Settings → Branches → Add rule`

**For `main` branch**:
```
Branch name pattern: main

 Require a pull request before merging
    Require approvals: 2
    Dismiss stale pull request approvals when new commits are pushed
    Require review from Code Owners

 Require status checks to pass before merging
    Require branches to be up to date before merging
    Require the following status checks:
     - build
     - lint-and-typecheck
     - test

 Require signed commits

 Allow force pushes
 Allow deletions
```

**For `develop` branch**:
```
Branch name pattern: develop

 Require a pull request before merging
    Require approvals: 1
    Dismiss stale PR approvals

 Require status checks to pass
    Require branches to be up to date

 Allow force pushes
 Allow deletions
```

---

### Task 3.2: Create Development Guide

**File**: `.github/DEVELOPMENT.md`

```markdown
# Development Guide

## Prerequisites

- **Node.js** 20+ (see `.nvmrc`)
- **pnpm** 9+ (single package manager)
- **Git** 2.35+ (with Husky support)

## Setup

```bash
# 1. Clone and navigate
git clone https://github.com/gabrielvfonseca/site.git
cd site

# 2. Install Node version (if using nvm)
nvm use

# 3. Install dependencies
pnpm install

# 4. Setup Git hooks
npx husky install

# 5. Configure Git (one-time)
git config user.name "Your Name"
git config user.email "your.email@company.com"
```

## Common Commands

### Development
```bash
pnpm dev        # Start dev server
pnpm build      # Build for production
pnpm start      # Run production build
```

### Code Quality
```bash
pnpm lint       # Check code style
pnpm format     # Auto-format code
pnpm typecheck  # TypeScript validation
pnpm test       # Run tests
pnpm test:watch # Watch mode
pnpm test:coverage # Coverage report
```

### Security
```bash
pnpm security       # Basic security scan
pnpm security:all   # Comprehensive scan
pnpm security:detailed # Verbose output
```

## Git Workflow

See [BRANCH_POLICY.md](.github/BRANCH_POLICY.md) for detailed branching workflow.

### Quick Start
```bash
# Create feature branch
git checkout develop
git pull origin develop
git checkout -b feature/TICKET-123-my-feature

# Work and commit
# (messages can be rough, will be squashed on merge)

# Push and create PR
git push origin feature/TICKET-123-my-feature
# Open PR on GitHub
```

## Pre-commit Hooks

The following run automatically before commit:
-  commitlint - validates commit message format
-  Biome linter - catches code style issues
-  Secret scanning - prevents committing credentials

If a check fails, fix the issue and try committing again.

## Testing Strategy

### Unit Tests
```bash
pnpm test                 # Run all tests once
pnpm test:watch         # Watch mode for development
pnpm test:coverage      # Generate coverage report
```

Targets: ≥80% coverage for new code

### E2E Tests
```bash
pnpm test:e2e           # Run Playwright tests
```

### Before Pushing
```bash
pnpm typecheck && pnpm test && pnpm lint
```

## Code Standards

### TypeScript
- Strict mode enabled (`"strict": true`)
- No `any` types
- Explicit typing for function parameters and returns
- Use discriminated unions for type safety

### Components
- Functional components only
- PascalCase for component files
- Props interface required
- PropTypes or similar validation

### Imports
- Absolute paths with `@/` prefix
- Group imports: externals, then internals
- Organize alphabetically within groups

### Naming
- camelCase for variables/functions
- PascalCase for classes/components
- CONSTANT_CASE for constants
- Use descriptive names

## Performance Optimization

### Images
- Use Next.js Image component
- Optimize with external tools
- Lazy load non-critical images

### Bundles
```bash
pnpm analyze              # Check bundle size
pnpm build --profile      # Profile build times
```

### Code Splitting
- Use dynamic imports for large components
- Keep bundle size under control

## Debugging

### VS Code
- Install extensions from `.vscode/extensions.json`
- Use launch configurations in `.vscode/launch.json`

### Browser DevTools
- React DevTools extension
- Network tab for API debugging
- Lighthouse for performance

### Logs
```bash
# Debug output in development
DEBUG=* pnpm dev
```

## Troubleshooting

### Node modules issues
```bash
pnpm clean              # Clean build artifacts
pnpm install           # Reinstall dependencies
```

### Git hook failures
```bash
# See hook output
cat .husky/pre-commit

# Manually run checks
pnpm lint
pnpm typecheck
pnpm test
```

### Build failures
```bash
pnpm clean
pnpm install
pnpm build
```

## Contributing

Before submitting a PR:

1.  All tests pass: `pnpm test`
2.  No TypeScript errors: `pnpm typecheck`
3.  Code is formatted: `pnpm format`
4.  Lint passes: `pnpm lint`
5.  Commit messages follow format
6.  Update documentation

See [CONTRIBUTING.md](../CONTRIBUTING.md) for more details.

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
```

**Implementation**:
```bash
cat > .github/DEVELOPMENT.md << 'EOF'
[Paste the content from above]
EOF

git add .github/DEVELOPMENT.md
git commit -m "docs: add comprehensive development guide"
```

---

## PHASE 4: ONGOING IMPROVEMENTS

### Task 4.1: Add CodeQL Workflow (Optional)

```yaml
# .github/workflows/codeql.yml
name: CodeQL

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
  schedule:
    - cron: '0 0 * * 0'

jobs:
  analyze:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      security-events: write

    steps:
      - uses: actions/checkout@v4
      - uses: github/codeql-action/init@v2
        with:
          languages: ['typescript']
      - uses: github/codeql-action/autobuild@v2
      - uses: github/codeql-action/analyze@v2
```

---

## VERIFICATION CHECKLIST

After implementing each phase, verify:

```bash
# Phase 1 Verification
test -f .gitattributes && echo " .gitattributes" || echo " Missing"
test -f .editorconfig && echo " .editorconfig" || echo " Missing"
test -f SECURITY.md && echo " SECURITY.md" || echo " Missing"
grep -q "export default" commitlint.config.js && echo " Commitlint fixed" || echo " Check needed"
test -x .husky/pre-push && echo " Pre-push hook" || echo " Check needed"

# Phase 2 Verification
test -f .github/BRANCH_POLICY.md && echo " Branch policy" || echo " Missing"
test -f .github/pull_request_template.md && echo " PR template" || echo " Missing"
grep -q "yaml" package.json && echo " Lint-staged extended" || echo " Check needed"

# Test Git hooks
git add -A
git commit -m "test: verify git hooks" --no-verify || echo "  Hooks triggered"

# Show status
git log --oneline -5
git status
```

---

## TIMELINE & EFFORT ESTIMATE

| Phase | Tasks | Duration | Effort | Risk |
|-------|-------|----------|--------|------|
| 1 (Critical) | 5 | 1-2 days | 2-3 hours | **Low** |
| 2 (High) | 4 | 3-7 days | 3-4 hours | **Low** |
| 3 (Medium) | 2 | 1 week | 2-3 hours | **Low** |
| 4 (Ongoing) | 1+ | Continuous | Varies | **Low** |
| **Total** | **12+** | **2-3 weeks** | **~10 hours** | **Low** |

---

## TEAM ONBOARDING

After setup, each team member should:

```bash
# One-time setup (5 min)
git config user.name "Your Name"
git config user.email "your.email@company.com"
git config --global pull.rebase true  # Recommended

# Verify hooks are working
npm install  # or pnpm install

# Test a commit
echo "test" >> test.txt
git add test.txt
git commit -m "test: verify hooks"  # Should fail if message is wrong

# Clean up
git reset HEAD test.txt
rm test.txt
```

---

## ROLLBACK PLAN

If any change causes issues:

```bash
# Revert entire commit
git revert [commit-hash]

# Or remove specific file
git rm [file]
git commit -m "chore: remove [file]"

# Update Husky hooks (no code changes needed)
# Simply delete or modify .husky/[hook-name]
```

All changes are non-breaking and can be reverted individually.
