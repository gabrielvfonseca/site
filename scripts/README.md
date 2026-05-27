# CLI Scripts

This directory contains CLI scripts for managing the project, including initialization, updates, and changelog generation.

## Available Commands

### `init`
Initialize a new project from the template.

```bash
site init [options]
```

**Options:**
- `--name <name>` - Name of the project
- `--package-manager <manager>` - Package manager to use (npm, yarn, bun, pnpm)
- `--disable-git` - Disable git initialization

### `update`
Update the project from one version to another.

```bash
site update [options]
```

**Options:**
- `--from <version>` - Version to update from (e.g., 1.0.0)
- `--to <version>` - Version to update to (e.g., 2.0.0)

### `changelog`
Generate changelog files for packages and global project.

```bash
site changelog [options]
```

**Options:**
- `--since <date>` - Generate changelog since date (e.g., "1 week ago", "2024-01-01") (default: "1 week ago")
- `--version <version>` - Version number for the changelog (e.g., "1.0.0")
- `--packages <packages>` - Comma-separated list of package names to generate changelogs for
- `--no-global` - Skip generating global changelog
- `--dry-run` - Show what would be generated without writing files

### `changelog:advanced`
Generate changelog files with advanced configuration options.

```bash
site changelog:advanced [options]
```

**Options:**
- `--since <date>` - Generate changelog since date (e.g., "1 week ago", "2024-01-01") (default: "1 week ago")
- `--version <version>` - Version number for the changelog (e.g., "1.0.0")
- `--packages <packages>` - Comma-separated list of package names to generate changelogs for
- `--no-global` - Skip generating global changelog
- `--dry-run` - Show what would be generated without writing files

### `changelog:auto`
Automatically detect version changes and generate changelogs.

```bash
site changelog:auto [options]
```

**Options:**
- `--since <date>` - Generate changelog since date (e.g., "1 week ago", "2024-01-01") (default: "1 week ago")
- `--force` - Generate changelogs even if no version changes are detected
- `--packages <packages>` - Comma-separated list of package names to generate changelogs for

## Changelog System

The changelog system automatically generates changelog files based on conventional commit messages. It supports:

### Features

- **Automatic Package Detection**: Automatically detects which packages are affected by commits
- **Conventional Commits**: Follows conventional commit standards for parsing commit messages
- **Multiple Formats**: Supports Keep a Changelog, Conventional Commits, and custom formats
- **Breaking Changes**: Automatically detects and highlights breaking changes
- **Per-Package Changelogs**: Generates individual changelog files for each package
- **Global Changelog**: Combines all changes into a root-level changelog
- **GitHub Integration**: Automated generation via GitHub Actions

### Commit Message Format

The system expects commit messages to follow the conventional commit format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to our CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit

**Breaking Changes:**
Include `BREAKING CHANGE:` in the commit body or footer to indicate breaking changes.

### Configuration

The system can be configured using `.changelogrc.json`:

```json
{
  "format": "keepachangelog",
  "includeAuthors": false,
  "includeCommitHashes": true,
  "groupByScope": false,
  "sortOrder": "date",
  "sections": {
    "feat": "✨ Features",
    "fix": "🐛 Bug Fixes",
    "docs": "📚 Documentation"
  },
  "breakingChangeLabel": "⚠️ Breaking Changes",
  "ignorePatterns": [
    "chore: update dependencies",
    "chore: bump version"
  ]
}
```

### GitHub Actions Integration

The system includes a GitHub Actions workflow (`.github/workflows/changelog.yml`) that:

- Automatically generates changelogs on push to main
- Creates pull requests with changelog updates
- Comments on pull requests with changelog previews
- Supports manual triggering with custom parameters

### Examples

**Generate changelog for all packages since last week:**
```bash
site changelog
```

**Generate changelog for specific packages:**
```bash
site changelog --packages "design-system,analytics" --version "1.2.0"
```

**Generate changelog since specific date:**
```bash
site changelog --since "2024-01-01" --version "2.0.0"
```

**Auto-detect changes and generate changelogs:**
```bash
site changelog:auto
```

**Dry run to preview changes:**
```bash
site changelog --dry-run
```

## Development

To build the CLI:

```bash
pnpm build
```

To test locally:

```bash
node dist/index.js --help
```
