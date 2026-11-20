# Security

This document outlines the security measures implemented in this project and how to report security vulnerabilities.

## Security Scanning

This project uses the following security tooling:

- **GitHub Code Scanning (CodeQL)** — Scans source code for security issues via the `ci.yml` workflow
- **Gitleaks** — Pre-commit secret scanning via Lefthook
- **Dependabot** — Automated dependency vulnerability monitoring and PRs
- **Renovate** — Scheduled dependency updates (every hour, dry-run in CI)

### Security Workflows

#### CI Workflow (`.github/workflows/ci.yml`)

Runs on every push to `main`/`develop` and pull request. Includes lint, typecheck, tests, and a build with `SKIP_ENV_VALIDATION`.

#### Renovate Workflow (`.github/workflows/renovate.yml`)

Runs hourly via schedule. Creates PRs for dependency updates including security patches.

## Vulnerability Severity Levels

- **Critical**: Immediate action required
- **High**: Address within 24-48 hours
- **Medium**: Address within 1-2 weeks
- **Low**: Address when convenient

### Response Process

1. **Detection**: CodeQL, Dependabot alerts, or manual review
2. **Notification**: Team is notified via GitHub Actions and Dependabot alerts
3. **Assessment**: Review vulnerability details and impact
4. **Remediation**: Apply fixes, patches, or workarounds
5. **Verification**: Re-run CI to confirm issues are resolved

## Reporting Security Vulnerabilities

If you discover a security vulnerability, please report it responsibly:

1. **DO NOT** create a public GitHub issue
2. Email security concerns to: [security@gabfon.com](mailto:security@gabfon.com)
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### Response Timeline

- **Acknowledgment**: Within 24 hours
- **Initial Assessment**: Within 72 hours
- **Resolution**: Depends on severity (see severity levels above)

## Security Best Practices

### For Developers

1. **Keep dependencies updated**: Renovate and Dependabot manage this automatically
2. **Review security alerts**: Address CodeQL and Dependabot findings promptly
3. **Use secure coding practices**: Follow OWASP guidelines
4. **Validate inputs**: Always validate and sanitize user inputs
5. **Use HTTPS**: Ensure all communications are encrypted
6. **Implement proper authentication**: Use secure authentication methods
7. **Regular security reviews**: Conduct periodic code reviews

### For CI/CD

1. **Automated scanning**: CodeQL runs on every push and PR
2. **Secret scanning**: Gitleaks runs on every pre-commit
3. **Dependency updates**: Dependabot and Renovate keep dependencies current
4. **Fail on critical issues**: CI blocks deployments with critical vulnerabilities

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)

## Contact

For security-related questions or concerns, please contact:

- Email: [security@gabfon.com](mailto:security@gabfon.com)
- GitHub: [@gabrielvfonseca](https://github.com/gabrielvfonseca)

---

**Last Updated**: November 2025
