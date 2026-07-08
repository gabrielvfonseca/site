# Organization-Wide Git Hygiene Framework
**Version**: 1.0  
**Purpose**: Standardized audit and implementation across all organization repositories  
**Audience**: Repository maintainers, platform engineers, team leads  

---

## Overview

This framework provides a **production-grade Git standardization system** applicable to any repository type. It defines:
- Audit criteria and scoring methodology
- Implementation requirements for each category
- Enforcement mechanisms and automation
- Rollout strategy for organization-wide adoption

---

## AUDIT SCORING SYSTEM

### Category Weights

| Category | Weight | Critical? | Impact |
|----------|--------|-----------|--------|
| Git Configuration | 10% |  High | Cross-platform consistency |
| Branching Model | 15% |  Critical | Team workflow, deployment safety |
| Conventional Commits | 10% |  Critical | Changelog, bisect, blame readability |
| Pre-commit Automation | 15% |  Critical | Prevent bad commits from being made |
| CI/CD Pipeline | 20% |  Critical | Deployment safety, quality gates |
| Security Controls | 15% |  Critical | Prevent breaches, compliance |
| Documentation | 10% |  High | Onboarding, knowledge sharing |
| **TOTAL** | **100%** | | |

### Grade Scale

| Score | Grade | Status | Action Required |
|-------|-------|--------|-----------------|
| 90-100% | A |  Excellent | Maintain; minor improvements |
| 80-89% | B |  Good | Address medium-priority gaps |
| 70-79% | C |  Partial | Implement high-priority items |
| 60-69% | D |  Poor | Major work needed; escalate |
| <60% | F |  Failing | Immediate remediation required |

---

## AUDIT CHECKLIST

### 1. GIT CONFIGURATION (10%)

#### 1.1 .gitattributes (2%)
**Requirement**: File must exist with LF normalization rules

```bash
test -f .gitattributes && echo "PASS" || echo "FAIL"
grep -q "text eol=lf" .gitattributes && echo "PASS" || echo "FAIL"
```

**Minimum viable config**:
```
* text=auto
*.ts text eol=lf
*.js text eol=lf
*.json text eol=lf
*.md text eol=lf
# ... other text files
```

**Score**:
-  2%: File exists with LF rules for key file types
-  1%: File exists but incomplete
-  0%: Missing

#### 1.2 .editorconfig (2%)
**Requirement**: File must exist with editor consistency rules

```bash
test -f .editorconfig && echo "PASS" || echo "FAIL"
grep -q "indent_size" .editorconfig && echo "PASS" || echo "FAIL"
```

**Minimum viable config**:
```
root = true
[*]
charset = utf-8
end_of_line = lf
indent_size = 2
```

**Score**:
-  2%: File exists with indent, EOL, charset settings
-  1%: File exists but incomplete
-  0%: Missing

#### 1.3 Global Git Configuration (3%)
**Requirement**: Developers have user.name, user.email configured

```bash
git config --global user.name > /dev/null && echo "PASS" || echo "FAIL"
git config --global user.email > /dev/null && echo "PASS" || echo "FAIL"
```

**Verification per developer**:
```bash
# Each team member should have:
git config user.name "Developer Name"
git config user.email "developer@company.com"
```

**Score**:
-  3%: All developers have proper config
-  2%: ≥75% of developers configured
-  1%: ≥50% of developers configured
-  0%: <50% or undocumented

#### 1.4 Repo-Specific Git Config (3%)
**Requirement**: Safe defaults configured

```bash
git config core.safecrlf && echo "PASS" || echo "FAIL"
git config pull.rebase | grep -q "true" && echo "PASS" || echo "FAIL"
git config fetch.prune | grep -q "true" && echo "PASS" || echo "FAIL"
```

**Required settings**:
```bash
git config core.safecrlf true
git config core.autocrlf false  # Since we use .gitattributes
git config pull.rebase true
git config fetch.prune true
git config rebase.autosquash true
```

**Score**:
-  3%: All settings configured
-  2%: ≥60% configured
-  1%: ≥30% configured
-  0%: None or missing

---

### 2. BRANCHING MODEL (15%)

#### 2.1 Documentation (3%)
**Requirement**: BRANCH_POLICY.md or equivalent exists

```bash
( test -f BRANCH_STRATEGY.md || test -f .github/BRANCH_POLICY.md ) && echo "PASS" || echo "FAIL"
```

**Score**:
-  3%: Documented branching model with examples
-  2%: Basic documentation present
-  1%: Mentioned in README
-  0%: No documentation

#### 2.2 Main Branch Protection (5%)
**Requirement**: `main` branch has protection rules at GitHub level

**Verification**: Manual check in GitHub Settings

```
Require:  Pull request reviews (≥2)
Require:  Status checks pass
Require:  Branches up-to-date
Require:  Code owners review
Allow:    Force pushes
Allow:    Deletions
```

**Score**:
-  5%: All protections enabled
-  4%: ≥5 of 6 protections
-  3%: ≥4 of 6 protections
-  2%: ≥2 of 6 protections
-  0%: No protections

#### 2.3 Branch Naming Convention (4%)
**Requirement**: Feature/fix/hotfix branches follow naming pattern

**Pattern validation** (automated check):
```bash
# Should enforce pattern like:
# feature/TICKET-XXX-description
# fix/TICKET-XXX-description
# hotfix/TICKET-XXX-description

git for-each-ref --format='%(refname:short)' refs/heads/ | \
  grep -E "^(feature|fix|hotfix|release)/[A-Z]+-[0-9]+" && echo "PASS" || echo "FAIL"
```

**Score**:
-  4%: Enforced via pre-commit or branch protection
-  3%: Consistently followed (≥90% of branches)
-  2%: Mostly followed (≥70% of branches)
-  1%: Loosely followed (≥50% of branches)
-  0%: No naming convention

#### 2.4 Merge Strategy (3%)
**Requirement**: Squash or rebase merges (not merge commits)

**Verification**: Check Git history
```bash
# Should show linear history, not merge commits
git log --oneline --graph --all | head -20
```

**Score**:
-  3%: Enforced at GitHub (squash/rebase required)
-  2%: Mostly followed (≥80% of merges)
-  1%: Inconsistently applied
-  0%: Merge commits present

---

### 3. CONVENTIONAL COMMITS (10%)

#### 3.1 Commitlint Configuration (3%)
**Requirement**: commitlint enforces Conventional Commits

```bash
( test -f commitlint.config.js || test -f commitlint.config.ts ) && echo "PASS" || echo "FAIL"
grep -q "type-enum" commitlint.config.js && echo "PASS" || echo "FAIL"
```

**Minimum viable config**:
```javascript
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'chore', 'refactor', 'test', 'style', 'revert', 'ci', 'perf', 'build']],
  },
};
```

**Score**:
-  3%: commitlint installed and enforced
-  2%: commitlint configured but not enforced
-  1%: Custom validation present
-  0%: No validation

#### 3.2 Commit-msg Hook (4%)
**Requirement**: Pre-commit hook validates message format

```bash
grep -r "commitlint" .husky/commit-msg && echo "PASS" || echo "FAIL"
test -x .husky/commit-msg && echo "PASS" || echo "FAIL"
```

**Score**:
-  4%: Husky hook enforces commitlint
-  3%: Hook exists but not enforced
-  2%: Manual validation only
-  0%: No enforcement

#### 3.3 Format Compliance (3%)
**Requirement**: Recent commits follow format

**Verification**:
```bash
# Check last 20 commits
git log --oneline -20 | grep -E "^[a-f0-9]+ (feat|fix|docs|chore|refactor|test|style|revert|ci|perf|build)(\(.+\))?:" | wc -l
# Should show ≥18 out of 20 (90%)
```

**Scoring**:
```
 3%: ≥90% compliance (18/20)
 2%: ≥75% compliance (15/20)
 1%: ≥50% compliance (10/20)
 0%: <50% compliance
```

---

### 4. PRE-COMMIT AUTOMATION (15%)

#### 4.1 Husky Installation (2%)
**Requirement**: Husky hooks manager is installed

```bash
test -d .husky && echo "PASS" || echo "FAIL"
grep -q "husky" package.json && echo "PASS" || echo "FAIL"
```

**Score**:
-  2%: Husky installed and configured
-  1%: Husky installed but hooks missing
-  0%: Not installed

#### 4.2 Pre-commit Hook (4%)
**Requirement**: Comprehensive pre-commit validation

**Verification**:
```bash
test -x .husky/pre-commit && echo "PASS" || echo "FAIL"
# Check contents
cat .husky/pre-commit | wc -l  # Should be >10 lines
```

**Must run**:
-  Linting (Biome, ESLint, Prettier)
-  Format checking
-  Secret scanning (optional but recommended)

**Score**:
-  4%: Comprehensive checks (lint + format + secrets)
-  3%: Lint and format only
-  2%: Lint only
-  1%: Hook exists but minimal
-  0%: Missing

#### 4.3 Lint-staged Configuration (3%)
**Requirement**: Targeted linting via lint-staged

```bash
grep -q "lint-staged" package.json && echo "PASS" || echo "FAIL"
# Should cover all file types
grep -q "\.{js,jsx,ts,tsx}" package.json && echo "PASS" || echo "FAIL"
```

**Minimum coverage**:
```json
"lint-staged": {
  "*.{js,jsx,ts,tsx}": ["eslint", "prettier"],
  "*.{json,yaml,yml,md}": ["prettier"]
}
```

**Score**:
-  3%: Covers ≥4 file types
-  2%: Covers 2-3 file types
-  1%: Covers 1 file type
-  0%: Not configured

#### 4.4 Pre-push Hook (3%)
**Requirement**: Pre-push validation prevents bad pushes

```bash
test -x .husky/pre-push && echo "PASS" || echo "FAIL"
# Check if not empty
wc -l .husky/pre-push | awk '{print $1}' | grep -qv "^1$" && echo "PASS" || echo "FAIL"
```

**Must check before push**:
-  TypeScript compilation (pnpm typecheck)
-  Unit tests (pnpm test)
-  Merge conflicts detection

**Score**:
-  3%: Comprehensive pre-push checks (≥2)
-  2%: Basic checks present
-  1%: Hook exists but minimal
-  0%: Missing or empty

#### 4.5 Commit-msg Hook (3%)
**Requirement**: Message format validation (Conventional Commits)

```bash
test -x .husky/commit-msg && echo "PASS" || echo "FAIL"
```

**Score**:
-  3%: Enforced via commitlint
-  2%: Hook exists
-  0%: Missing

---

### 5. CI/CD PIPELINE (20%)

#### 5.1 Lint Workflow (3%)
**Requirement**: GitHub Actions lint workflow exists

```bash
test -f .github/workflows/lint.yml && echo "PASS" || echo "FAIL"
grep -q "run:" .github/workflows/lint.yml && echo "PASS" || echo "FAIL"
```

**Must include**:
- Code linting (Biome, ESLint, etc.)
- Format checking
- Type checking (if TypeScript)

**Score**:
-  3%: Complete lint workflow
-  2%: Basic lint workflow
-  1%: Partial
-  0%: Missing

#### 5.2 Test Workflow (3%)
**Requirement**: Unit and E2E tests run in CI

```bash
test -f .github/workflows/test.yml && echo "PASS" || echo "FAIL"
grep -q "test" .github/workflows/test.yml && echo "PASS" || echo "FAIL"
```

**Must include**:
- Unit tests execution
- Coverage reporting
- E2E tests (if applicable)

**Score**:
-  3%: Complete test workflow with coverage
-  2%: Test workflow present
-  1%: Partial
-  0%: Missing

#### 5.3 Build Workflow (3%)
**Requirement**: Build process automated in CI

```bash
test -f .github/workflows/build.yml && echo "PASS" || echo "FAIL"
grep -q "build\|compile" .github/workflows/*.yml && echo "PASS" || echo "FAIL"
```

**Must verify**:
- Build succeeds
- Artifacts generated
- No build warnings treated as errors

**Score**:
-  3%: Complete build workflow
-  2%: Build included in main workflow
-  1%: Build process incomplete
-  0%: Missing

#### 5.4 Security Scanning (3%)
**Requirement**: Dependency and code security scanning

```bash
test -f .github/workflows/security.yml && echo "PASS" || echo "FAIL"
grep -q "snyk\|dependabot\|codeql" .github/workflows/*.yml && echo "PASS" || echo "FAIL"
```

**Must include at least one**:
- Snyk (dependency vulnerabilities)
- Dependabot (automated updates)
- CodeQL (code analysis)
- OWASP Dependency-Check

**Score**:
-  3%: Multiple security tools (≥2)
-  2%: One security tool
-  1%: Partial setup
-  0%: Missing

#### 5.5 Status Checks (3%)
**Requirement**: Branch protection requires CI status checks

```bash
# Manual check: GitHub Settings → Branches → Branch protection rules
# Should require:
#  build
#  test
#  lint
```

**Score**:
-  3%: All CI checks required
-  2%: ≥2 checks required
-  1%: ≥1 check required
-  0%: Not required

#### 5.6 PR Status Reporting (2%)
**Requirement**: CI reports back to PRs with status

```bash
# Check: GitHub PR should show status checks
# Example:  All checks passed or  Some checks failed
```

**Score**:
-  2%: Comprehensive status reporting
-  1%: Basic status reporting
-  0%: Missing

---

### 6. SECURITY CONTROLS (15%)

#### 6.1 SECURITY.md Documentation (2%)
**Requirement**: Vulnerability disclosure policy documented

```bash
test -f SECURITY.md && echo "PASS" || echo "FAIL"
grep -q "vulnerability\|security" SECURITY.md && echo "PASS" || echo "FAIL"
```

**Must include**:
- How to report vulnerabilities
- Response timeline
- Supported versions
- Contact information

**Score**:
-  2%: Complete SECURITY.md
-  1%: Basic information
-  0%: Missing

#### 6.2 Secret Scanning (3%)
**Requirement**: Gitleaks or equivalent prevents secrets

```bash
# Check if Gitleaks is installed
which gitleaks && echo "PASS" || echo "FAIL"
# Check if integrated in pre-commit
grep -r "gitleaks" .husky/ && echo "PASS" || echo "FAIL"
```

**Score**:
-  3%: Gitleaks enforced in pre-commit
-  2%: Gitleaks configured but not enforced
-  1%: Secret scanning in CI only
-  0%: No secret scanning

#### 6.3 Dependabot/Renovate (4%)
**Requirement**: Automated dependency updates

```bash
( test -f renovate.json || test -f .github/dependabot.yml ) && echo "PASS" || echo "FAIL"
grep -q "schedule" renovate.json || grep -q "schedule" .github/dependabot.yml && echo "PASS" || echo "FAIL"
```

**Must include**:
- Dependency updates enabled
- Security fixes prioritized
- Schedule defined (e.g., weekly)

**Score**:
-  4%: Full Renovate/Dependabot setup
-  3%: Basic setup
-  2%: Partially configured
-  0%: Missing

#### 6.4 Dependency Lock Files (3%)
**Requirement**: Lock files checked in for reproducibility

```bash
( test -f package-lock.json || test -f pnpm-lock.yaml || test -f yarn.lock ) && echo "PASS" || echo "FAIL"
git ls-files | grep -E "lock\.yaml|lock\.json" && echo "PASS" || echo "FAIL"
```

**Scoring**:
-  3%: Lock file committed, single package manager
-  2%: Lock file present
-  1%: Partially tracked
-  0%: Missing or ignored

#### 6.5 Signed Commits (2%)
**Requirement**: Commit signing enforced or recommended

```bash
# Check if signing is required
git config commit.gpgsign || echo "Not required (but recommended)"
```

**Score**:
-  2%: GPG signing required at repo level
-  1%: Signing recommended
-  0%: No signing

#### 6.6 Code Review Requirement (1%)
**Requirement**: No direct commits to main

```bash
# Check branch protection
# Manual verification: GitHub Settings
```

**Score**:
-  1%: Code owner review required
-  0.5%: Review recommended
-  0%: Not enforced

---

### 7. DOCUMENTATION (10%)

#### 7.1 README.md (2%)
**Requirement**: Project README exists with setup instructions

```bash
test -f README.md && echo "PASS" || echo "FAIL"
grep -q -i "installation\|setup\|getting started" README.md && echo "PASS" || echo "FAIL"
```

**Must include**:
- Project description
- Prerequisites
- Installation steps
- Basic usage
- Contributing link

**Score**:
-  2%: Comprehensive README
-  1%: Basic README
-  0%: Missing

#### 7.2 CONTRIBUTING.md (2%)
**Requirement**: Developer contribution guide exists

```bash
test -f CONTRIBUTING.md && echo "PASS" || echo "FAIL"
grep -q "pull request\|development" CONTRIBUTING.md && echo "PASS" || echo "FAIL"
```

**Must include**:
- Setup instructions
- Development workflow
- Code standards
- PR process
- Testing requirements

**Score**:
-  2%: Comprehensive guide
-  1%: Basic guide
-  0%: Missing

#### 7.3 Branch Policy Documentation (2%)
**Requirement**: Branching strategy documented

```bash
( test -f .github/BRANCH_POLICY.md || grep -q "branch\|workflow" CONTRIBUTING.md ) && echo "PASS" || echo "FAIL"
```

**Must cover**:
- Branch types and naming
- Merge strategy
- Protection rules
- Workflow examples

**Score**:
-  2%: Dedicated documentation
-  1%: Mentioned in CONTRIBUTING
-  0%: Not documented

#### 7.4 Development Guide (2%)
**Requirement**: Setup and development workflow documented

```bash
test -f .github/DEVELOPMENT.md && echo "PASS" || echo "FAIL"
```

**Must include**:
- Prerequisites
- Setup steps
- Common commands
- Debugging tips
- Testing strategy

**Score**:
-  2%: Comprehensive guide
-  1%: Basic information in README
-  0%: Missing

#### 7.5 API/Architecture Documentation (2%)
**Requirement**: Key components documented

**Scoring**:
-  2%: Architecture documented (README or ARCHITECTURE.md)
-  1%: Comments in code
-  0%: No documentation

---

## QUICK AUDIT SCRIPT

```bash
#!/bin/bash
# git-hygiene-audit.sh - Quick audit script

echo "=== Git Hygiene Audit ==="
echo

# 1. Git Configuration
echo "1. Git Configuration"
test -f .gitattributes && echo "   .gitattributes" || echo "   .gitattributes missing"
test -f .editorconfig && echo "   .editorconfig" || echo "   .editorconfig missing"
git config core.safecrlf > /dev/null && echo "   core.safecrlf" || echo "   core.safecrlf not set"
echo

# 2. Branching
echo "2. Branching Model"
git rev-parse --verify main > /dev/null 2>&1 && echo "   main branch" || echo "   main branch missing"
grep -q "BRANCH" .github/*.md 2>/dev/null && echo "   Branch policy documented" || echo "   Branch policy not documented"
echo

# 3. Conventional Commits
echo "3. Conventional Commits"
( test -f commitlint.config.js || test -f commitlint.config.ts ) && echo "   commitlint config" || echo "   commitlint config missing"
test -x .husky/commit-msg && echo "   commit-msg hook" || echo "   commit-msg hook missing"
echo

# 4. Pre-commit Hooks
echo "4. Pre-commit Automation"
test -d .husky && echo "   Husky installed" || echo "   Husky not installed"
test -x .husky/pre-commit && echo "   pre-commit hook" || echo "   pre-commit hook missing"
test -x .husky/pre-push && [ $(wc -l < .husky/pre-push) -gt 3 ] && echo "   pre-push hook" || echo "    pre-push hook empty/missing"
grep -q "lint-staged" package.json && echo "   lint-staged configured" || echo "   lint-staged not configured"
echo

# 5. CI/CD
echo "5. CI/CD Pipeline"
test -f .github/workflows/lint.yml && echo "   Lint workflow" || echo "   Lint workflow missing"
test -f .github/workflows/test.yml && echo "   Test workflow" || echo "   Test workflow missing"
test -f .github/workflows/build.yml && echo "   Build workflow" || echo "   Build workflow missing"
( test -f .github/workflows/security.yml || grep -q "snyk" .github/workflows/*.yml 2>/dev/null ) && echo "   Security scanning" || echo "   Security scanning missing"
echo

# 6. Security
echo "6. Security Controls"
test -f SECURITY.md && echo "   SECURITY.md" || echo "   SECURITY.md missing"
( test -f renovate.json || test -f .github/dependabot.yml ) && echo "   Dependency management" || echo "   Dependency management missing"
( test -f package-lock.json || test -f pnpm-lock.yaml || test -f yarn.lock ) && echo "   Lock file" || echo "   Lock file missing"
which gitleaks > /dev/null && echo "   Gitleaks installed" || echo "   Gitleaks not installed"
echo

# 7. Documentation
echo "7. Documentation"
test -f README.md && echo "   README.md" || echo "   README.md missing"
test -f CONTRIBUTING.md && echo "   CONTRIBUTING.md" || echo "   CONTRIBUTING.md missing"
( test -f .github/BRANCH_POLICY.md || grep -q "branch" CONTRIBUTING.md ) && echo "   Branch policy" || echo "   Branch policy not documented"
test -f .github/DEVELOPMENT.md && echo "   Development guide" || echo "   Development guide missing"
echo

echo "=== End Audit ==="
```

**Usage**:
```bash
chmod +x git-hygiene-audit.sh
./git-hygiene-audit.sh
```

---

## ORG-WIDE ROLLOUT STRATEGY

### Phase 1: Pilot (Week 1)
1. Apply to 1-2 critical repositories
2. Gather feedback from developers
3. Refine framework based on learnings
4. Document exceptions and deviations

### Phase 2: Early Adopters (Week 2-3)
1. Identify teams willing to adopt early
2. Provide hands-on support
3. Capture success metrics
4. Address team-specific needs

### Phase 3: Broad Rollout (Week 4-6)
1. Apply to all repositories
2. Provide training sessions
3. Document common issues
4. Support lagging repositories

### Phase 4: Enforcement (Week 7+)
1. Audit all repositories quarterly
2. Report compliance metrics
3. Escalate non-compliant repos
4. Continuous improvement

---

## SUCCESS METRICS

### Quantitative
- % of repositories at grade B or higher
- % of developers with Git configured
- % of commits following Conventional Commits format
- % of PRs with pre-commit checks passing
- Reduction in commits with secrets
- Reduction in failed deployments

### Qualitative
- Developer satisfaction with Git workflow
- Time saved through automation
- Reduction in review cycles
- Improved code quality
- Better security posture

### Reporting
```bash
# Quarterly audit report
for repo in repos/*; do
  score=$(./git-hygiene-audit.sh "$repo" | calculate_score)
  echo "$repo: $score%"
done
```

---

## CUSTOMIZATION PER REPO TYPE

### JavaScript/Node.js Repositories
```
+ Lint.js files with ESLint/Biome
+ Test with Jest/Vitest/Mocha
+ Build with Webpack/Vite/esbuild
+ Scan with Snyk
+ Use pnpm/yarn (not npm alone)
```

### Python Repositories
```
+ Lint with Ruff/Flake8
+ Format with Black/Autopep8
+ Type check with Mypy/Pyright
+ Test with Pytest/unittest
+ Scan with Bandit/Semgrep
+ Use Poetry/Pipenv
```

### Go Repositories
```
+ Lint with golangci-lint
+ Test with Go test
+ Build with Make
+ Scan with gosec
+ Use Go modules
```

### Monorepos
```
+ Enforce single package manager
+ Shared config for hooks/linting
+ Workspace-aware build/test scripts
+ Aggregate dependency scanning
+ Unified changelog generation
```

---

## TROUBLESHOOTING COMMON ISSUES

### Issue: Developers bypassing pre-commit hooks
**Root Cause**: Hooks are too strict or slow  
**Solution**:
1. Profile hook execution time
2. Optimize slow checks
3. Allow skipping with --no-verify (with approval)
4. Provide clear error messages

### Issue: CI builds failing for committed secrets
**Root Cause**: Gitleaks not installed locally  
**Solution**:
1. Add Gitleaks to onboarding checklist
2. Provide installation scripts
3. Add pre-push hook enforcement
4. Document secret reporting process

### Issue: Merge conflicts in lock files
**Root Cause**: Multiple developers updating simultaneously  
**Solution**:
1. Add pre-merge script to auto-resolve
2. Use Renovate for atomic lock file updates
3. Educate on branch coordination

---

## MAINTENANCE & EVOLUTION

### Quarterly Reviews
- Audit all repositories
- Collect feedback from developers
- Update documentation
- Refine automation scripts
- Address pain points

### Annual Updates
- Review industry best practices
- Update tool versions
- Incorporate new security tools
- Assess team needs
- Plan improvements

### Escalation Path
```
Individual → Team Lead → Platform Engineering → CTO
    (local issues) → (team adoption) → (org policy) → (strategic)
```

---

## REFERENCES

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- [Husky](https://husky.sh/)
- [commitlint](https://commitlint.js.org/)
- [Renovate](https://www.whitesourcesoftware.com/free-developer-tools/renovate/)
- [Gitleaks](https://github.com/gitleaks/gitleaks)

---

**Last Updated**: 2026-05-23  
**Version**: 1.0  
**Status**: Ready for organization-wide rollout
