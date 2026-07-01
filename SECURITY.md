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

We may adjust this timeline based on security and complexity.

## Security Contact

- **Email**: security@gabfon.com
- **Response time**: Within 48 hours (business days)
- **Language**: English preferred

## Supported Versions

| Version | Status | Supported Until |
|---------|--------|-----------------|
| Latest | ✅ Supported | Ongoing |
| Previous Major | ✅ Supported | 12 months |
| Older versions | ❌ Unsupported | Not supported |

Only the latest and previous major versions receive security patches.

## Security Best Practices

### Credentials & Secrets
- Never commit credentials, API keys, or tokens.
- Use environment variables for sensitive data.
- Pre-commit hooks scan for secrets automatically using Gitleaks (if installed).

### Dependencies
- Keep dependencies up-to-date.
- Review dependency updates in PRs.
- Report security issues in dependencies to maintainers first.

### Code Review
- All changes require peer review before merging.
- Security-sensitive code gets additional review.
- Automated security scanning runs on all PRs in CI/CD.

---

**Last Updated**: 2026-05-23
