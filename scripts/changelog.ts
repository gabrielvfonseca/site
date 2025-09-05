import { readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import {
  cancel,
  intro,
  isCancel,
  log,
  outro,
  select,
  spinner,
  text,
} from '@clack/prompts';
import { exec } from './utils.js';

interface CommitInfo {
  hash: string;
  message: string;
  author: string;
  date: string;
  type: string;
  scope?: string;
  description: string;
  breaking?: boolean;
  packages: string[];
}

interface PackageInfo {
  name: string;
  path: string;
  version: string;
  hasChangelog: boolean;
}

interface ChangelogEntry {
  type: string;
  description: string;
  hash: string;
  author: string;
  date: string;
  breaking?: boolean;
}

const COMMIT_TYPES = {
  feat: 'Features',
  fix: 'Bug Fixes',
  docs: 'Documentation',
  style: 'Styles',
  refactor: 'Code Refactoring',
  perf: 'Performance Improvements',
  test: 'Tests',
  build: 'Build System',
  ci: 'Continuous Integration',
  chore: 'Chores',
  revert: 'Reverts',
} as const;

const BREAKING_CHANGE_PATTERN = /^BREAKING CHANGE:/m;
const SCOPE_PATTERN = /^(\w+)(?:\(([^)]+)\))?: (.+)$/;

const parseCommitMessage = (
  message: string
): {
  type: string;
  scope?: string;
  description: string;
  breaking: boolean;
} => {
  const match = message.match(SCOPE_PATTERN);
  if (!match) {
    return {
      type: 'chore',
      description: message,
      breaking: false,
    };
  }

  const [, type, scope, description] = match;
  const breaking = BREAKING_CHANGE_PATTERN.test(message);

  return {
    type: type.toLowerCase(),
    scope,
    description: description.trim(),
    breaking,
  };
};

const getAffectedPackages = async (commitHash: string): Promise<string[]> => {
  try {
    const { stdout } = await exec(
      `git show --name-only --pretty=format: ${commitHash}`
    );
    const files = stdout.trim().split('\n').filter(Boolean);

    const packages = new Set<string>();

    for (const file of files) {
      // Check if file is in packages directory
      if (file.startsWith('packages/')) {
        const packageName = file.split('/')[1];
        packages.add(packageName);
      }
      // Check if file is in apps directory
      else if (file.startsWith('apps/')) {
        const appName = file.split('/')[1];
        packages.add(appName);
      }
      // Check if file affects multiple packages (root level changes)
      else if (
        file.includes('package.json') ||
        file.includes('pnpm-lock.yaml') ||
        file.includes('turbo.json')
      ) {
        packages.add('root');
      }
    }

    return Array.from(packages);
  } catch (error) {
    log.warn(
      `Failed to get affected packages for commit ${commitHash}: ${error}`
    );
    return ['root'];
  }
};

const getCommitsSince = async (since: string): Promise<CommitInfo[]> => {
  try {
    const { stdout } = await exec(
      `git log --pretty=format:"%H|%s|%an|%ad" --date=short --since="${since}" --no-merges`
    );

    const commits: CommitInfo[] = [];
    const lines = stdout.trim().split('\n').filter(Boolean);

    for (const line of lines) {
      const [hash, message, author, date] = line.split('|');
      const parsed = parseCommitMessage(message);
      const packages = await getAffectedPackages(hash);

      commits.push({
        hash,
        message,
        author,
        date,
        ...parsed,
        packages,
      });
    }

    return commits;
  } catch (error) {
    log.error(`Failed to get commits: ${error}`);
    return [];
  }
};

const getPackages = async (): Promise<PackageInfo[]> => {
  const packages: PackageInfo[] = [];

  // Get packages from packages directory
  try {
    const packagesDir = join(process.cwd(), 'packages');
    const packageDirs = await readdir(packagesDir);

    for (const dir of packageDirs) {
      const packagePath = join(packagesDir, dir, 'package.json');
      try {
        const packageJson = JSON.parse(await readFile(packagePath, 'utf8'));
        const changelogPath = join(packagesDir, dir, 'CHANGELOG.md');

        packages.push({
          name: packageJson.name || dir,
          path: join(packagesDir, dir),
          version: packageJson.version || '0.0.0',
          hasChangelog: await stat(changelogPath)
            .then(() => true)
            .catch(() => false),
        });
      } catch {
        // Skip if package.json doesn't exist or is invalid
      }
    }
  } catch {
    // Skip if packages directory doesn't exist
  }

  // Get apps from apps directory
  try {
    const appsDir = join(process.cwd(), 'apps');
    const appDirs = await readdir(appsDir);

    for (const dir of appDirs) {
      const packagePath = join(appsDir, dir, 'package.json');
      try {
        const packageJson = JSON.parse(await readFile(packagePath, 'utf8'));
        const changelogPath = join(appsDir, dir, 'CHANGELOG.md');

        packages.push({
          name: packageJson.name || dir,
          path: join(appsDir, dir),
          version: packageJson.version || '0.0.0',
          hasChangelog: await stat(changelogPath)
            .then(() => true)
            .catch(() => false),
        });
      } catch {
        // Skip if package.json doesn't exist or is invalid
      }
    }
  } catch {
    // Skip if apps directory doesn't exist
  }

  return packages;
};

const formatChangelogEntry = (entry: ChangelogEntry): string => {
  const breaking = entry.breaking ? ' **BREAKING CHANGE**' : '';
  return `- ${entry.description}${breaking} (${entry.hash.substring(0, 7)})`;
};

const generatePackageChangelog = async (
  packageInfo: PackageInfo,
  commits: CommitInfo[],
  version: string
): Promise<string> => {
  const packageCommits = commits.filter(
    (commit) =>
      commit.packages.includes(packageInfo.name) ||
      commit.packages.includes('root')
  );

  if (packageCommits.length === 0) {
    return '';
  }

  const entries: Record<string, ChangelogEntry[]> = {};

  for (const commit of packageCommits) {
    const type =
      COMMIT_TYPES[commit.type as keyof typeof COMMIT_TYPES] || 'Other Changes';

    if (!entries[type]) {
      entries[type] = [];
    }

    entries[type].push({
      type: commit.type,
      description: commit.description,
      hash: commit.hash,
      author: commit.author,
      date: commit.date,
      breaking: commit.breaking,
    });
  }

  const changelogSections: string[] = [];

  // Add breaking changes first
  const breakingChanges = Object.values(entries)
    .flat()
    .filter((entry) => entry.breaking);

  if (breakingChanges.length > 0) {
    changelogSections.push('### ⚠️ Breaking Changes');
    for (const entry of breakingChanges) {
      changelogSections.push(formatChangelogEntry(entry));
    }
    changelogSections.push('');
  }

  // Add other sections
  for (const [sectionName, sectionEntries] of Object.entries(entries)) {
    if (
      sectionName === 'Other Changes' ||
      sectionEntries.some((e) => e.breaking)
    ) {
      continue; // Skip if already handled or no entries
    }

    changelogSections.push(`### ${sectionName}`);
    for (const entry of sectionEntries) {
      changelogSections.push(formatChangelogEntry(entry));
    }
    changelogSections.push('');
  }

  const changelogContent = [
    `# ${packageInfo.name} v${version}`,
    `(${new Date().toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })})`,
    '',
    ...changelogSections,
  ].join('\n');

  return changelogContent;
};

const generateGlobalChangelog = async (
  _packages: PackageInfo[],
  commits: CommitInfo[],
  version: string
): Promise<string> => {
  const entries: Record<string, ChangelogEntry[]> = {};

  for (const commit of commits) {
    const type =
      COMMIT_TYPES[commit.type as keyof typeof COMMIT_TYPES] || 'Other Changes';

    if (!entries[type]) {
      entries[type] = [];
    }

    entries[type].push({
      type: commit.type,
      description: commit.description,
      hash: commit.hash,
      author: commit.author,
      date: commit.date,
      breaking: commit.breaking,
    });
  }

  const changelogSections: string[] = [];

  // Add breaking changes first
  const breakingChanges = Object.values(entries)
    .flat()
    .filter((entry) => entry.breaking);

  if (breakingChanges.length > 0) {
    changelogSections.push('### ⚠️ Breaking Changes');
    for (const entry of breakingChanges) {
      changelogSections.push(formatChangelogEntry(entry));
    }
    changelogSections.push('');
  }

  // Add other sections
  for (const [sectionName, sectionEntries] of Object.entries(entries)) {
    if (
      sectionName === 'Other Changes' ||
      sectionEntries.some((e) => e.breaking)
    ) {
      continue; // Skip if already handled or no entries
    }

    changelogSections.push(`### ${sectionName}`);
    for (const entry of sectionEntries) {
      changelogSections.push(formatChangelogEntry(entry));
    }
    changelogSections.push('');
  }

  const changelogContent = [
    `# v${version}`,
    `(${new Date().toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })})`,
    '',
    ...changelogSections,
  ].join('\n');

  return changelogContent;
};

const updateExistingChangelog = async (
  filePath: string,
  newContent: string,
  append = true
): Promise<void> => {
  try {
    const existingContent = await readFile(filePath, 'utf8');

    if (append) {
      // Insert new content after the first heading
      const lines = existingContent.split('\n');
      const firstHeadingIndex = lines.findIndex((line) => line.startsWith('#'));

      if (firstHeadingIndex !== -1) {
        lines.splice(firstHeadingIndex + 1, 0, '', newContent);
        await writeFile(filePath, lines.join('\n'));
      } else {
        await writeFile(filePath, `${existingContent}\n\n${newContent}`);
      }
    } else {
      await writeFile(filePath, newContent);
    }
  } catch {
    // If file doesn't exist, create it
    await writeFile(filePath, newContent);
  }
};

export const changelog = async (options: {
  since?: string;
  version?: string;
  packages?: string;
  global?: boolean;
  dryRun?: boolean;
}) => {
  try {
    intro('Generating changelog...');

    const s = spinner();
    s.start('Analyzing repository...');

    // Get packages
    const allPackages = await getPackages();
    s.message(`Found ${allPackages.length} packages`);

    // Get commits
    const since = options.since || '1 week ago';
    const commits = await getCommitsSince(since);
    s.message(`Found ${commits.length} commits since ${since}`);

    if (commits.length === 0) {
      s.stop('No commits found in the specified time range');
      outro('No changes to document.');
      return;
    }

    s.stop('Analysis complete');

    // Select packages to generate changelogs for
    let selectedPackages = allPackages;
    if (options.packages) {
      const packageNames = options.packages
        .split(',')
        .map((name) => name.trim());
      selectedPackages = allPackages.filter((pkg) =>
        packageNames.includes(pkg.name)
      );
    } else {
      const packageChoices = allPackages.map((pkg) => ({
        value: pkg.name,
        label: `${pkg.name} (v${pkg.version})`,
      }));

      const selected = await select({
        message: 'Which packages should have changelogs generated?',
        options: [{ value: 'all', label: 'All packages' }, ...packageChoices],
        initialValue: 'all',
      });

      if (isCancel(selected)) {
        cancel('Operation cancelled.');
        process.exit(0);
      }

      if (selected !== 'all') {
        selectedPackages = allPackages.filter((pkg) => pkg.name === selected);
      }
    }

    // Get version
    let version = options.version;
    if (!version) {
      const versionInput = await text({
        message: 'What version should be used for the changelog?',
        placeholder: '1.0.0',
        validate(value: string) {
          if (value.length === 0) {
            return 'Please enter a version number.';
          }
        },
      });

      if (isCancel(versionInput)) {
        cancel('Operation cancelled.');
        process.exit(0);
      }

      version = versionInput.toString();
    }

    // Generate changelogs
    s.start('Generating changelogs...');

    for (const packageInfo of selectedPackages) {
      s.message(`Generating changelog for ${packageInfo.name}...`);

      const changelogContent = await generatePackageChangelog(
        packageInfo,
        commits,
        version
      );

      if (changelogContent) {
        const changelogPath = join(packageInfo.path, 'CHANGELOG.md');

        if (options.dryRun) {
          log.info(`Would write to ${changelogPath}:`);
          log.info(changelogContent);
        } else {
          await updateExistingChangelog(changelogPath, changelogContent);
        }
      }
    }

    // Generate global changelog
    if (options.global !== false) {
      s.message('Generating global changelog...');

      const globalChangelogContent = await generateGlobalChangelog(
        allPackages,
        commits,
        version
      );

      if (globalChangelogContent) {
        const globalChangelogPath = join(process.cwd(), 'CHANGELOG.md');

        if (options.dryRun) {
          log.info(`Would write to ${globalChangelogPath}:`);
          log.info(globalChangelogContent);
        } else {
          await updateExistingChangelog(
            globalChangelogPath,
            globalChangelogContent
          );
        }
      }
    }

    s.stop('Changelog generation complete!');

    outro('Changelogs have been generated successfully.');
  } catch (error) {
    const message = error instanceof Error ? error.message : `${error}`;
    log.error(`Failed to generate changelog: ${message}`);
    process.exit(1);
  }
};
