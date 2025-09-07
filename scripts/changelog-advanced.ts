import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import {
  cancel,
  confirm,
  intro,
  isCancel,
  log,
  multiselect,
  outro,
  select,
  spinner,
  text,
} from '@clack/prompts';
import { exec } from './utils.js';

type CommitInfo = {
  hash: string;
  message: string;
  author: string;
  date: string;
  type: string;
  scope?: string;
  description: string;
  breaking?: boolean;
  packages: string[];
  files: string[];
};

type PackageInfo = {
  name: string;
  path: string;
  version: string;
  hasChangelog: boolean;
  dependencies: string[];
  devDependencies: string[];
};

type ChangelogEntry = {
  type: string;
  description: string;
  hash: string;
  author: string;
  date: string;
  breaking?: boolean;
  scope?: string;
};

type ChangelogConfig = {
  format: 'keepachangelog' | 'conventional' | 'custom';
  includeAuthors: boolean;
  includeCommitHashes: boolean;
  groupByScope: boolean;
  sortOrder: 'date' | 'type' | 'scope';
  template?: string;
};

const COMMIT_TYPES = {
  feat: { emoji: '✨', title: 'Features' },
  fix: { emoji: '🐛', title: 'Bug Fixes' },
  docs: { emoji: '📚', title: 'Documentation' },
  style: { emoji: '💄', title: 'Styles' },
  refactor: { emoji: '♻️', title: 'Code Refactoring' },
  perf: { emoji: '⚡', title: 'Performance Improvements' },
  test: { emoji: '🧪', title: 'Tests' },
  build: { emoji: '🔨', title: 'Build System' },
  ci: { emoji: '👷', title: 'Continuous Integration' },
  chore: { emoji: '🔧', title: 'Chores' },
  revert: { emoji: '⏪', title: 'Reverts' },
} as const;

const BREAKING_CHANGE_PATTERN = /^BREAKING CHANGE:/m;
const SCOPE_PATTERN = /^(\w+)(?:\(([^)]+)\))?: (.+)$/;
const FOOTER_PATTERN = /^([A-Z][a-z-]+): (.+)$/m;

const parseCommitMessage = (
  message: string
): {
  type: string;
  scope?: string;
  description: string;
  breaking: boolean;
  footer?: Record<string, string>;
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

  // Parse footer
  const footerMatch = message.match(FOOTER_PATTERN);
  const footer = footerMatch ? { [footerMatch[1]]: footerMatch[2] } : undefined;

  return {
    type: type.toLowerCase(),
    scope,
    description: description.trim(),
    breaking,
    footer,
  };
};

const getAffectedFiles = async (commitHash: string): Promise<string[]> => {
  try {
    const { stdout } = await exec(
      `git show --name-only --pretty=format: ${commitHash}`
    );
    return stdout.trim().split('\n').filter(Boolean);
  } catch (error) {
    log.warn(`Failed to get affected files for commit ${commitHash}: ${error}`);
    return [];
  }
};

const getAffectedPackages = (files: string[]): string[] => {
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
      const files = await getAffectedFiles(hash);
      const packages = getAffectedPackages(files);

      commits.push({
        hash,
        message,
        author,
        date,
        ...parsed,
        packages,
        files,
      });
    }

    return commits;
  } catch (error) {
    log.error(`Failed to get commits: ${error}`);
    return [];
  }
};

const getPackageInfo = async (
  dirPath: string,
  dirName: string
): Promise<PackageInfo | null> => {
  const packagePath = join(dirPath, dirName, 'package.json');
  try {
    const packageJson = JSON.parse(await readFile(packagePath, 'utf8'));
    const changelogPath = join(dirPath, dirName, 'CHANGELOG.md');

    return {
      name: packageJson.name || dirName,
      path: join(dirPath, dirName),
      version: packageJson.version || '0.0.0',
      hasChangelog: await stat(changelogPath)
        .then(() => true)
        .catch(() => false),
      dependencies: Object.keys(packageJson.dependencies || {}),
      devDependencies: Object.keys(packageJson.devDependencies || {}),
    };
  } catch {
    return null;
  }
};

const getPackagesFromDirectory = async (
  dirPath: string
): Promise<PackageInfo[]> => {
  const packages: PackageInfo[] = [];
  try {
    const dirs = await readdir(dirPath);
    for (const dir of dirs) {
      const packageInfo = await getPackageInfo(dirPath, dir);
      if (packageInfo) {
        packages.push(packageInfo);
      }
    }
  } catch {
    // Skip if directory doesn't exist
  }
  return packages;
};

const getPackages = async (): Promise<PackageInfo[]> => {
  const packages = await getPackagesFromDirectory(
    join(process.cwd(), 'packages')
  );
  const apps = await getPackagesFromDirectory(join(process.cwd(), 'apps'));
  return [...packages, ...apps];
};

const formatChangelogEntry = (
  entry: ChangelogEntry,
  config: ChangelogConfig
): string => {
  const breaking = entry.breaking ? ' **BREAKING CHANGE**' : '';
  const HASH_SHORT_LENGTH = 7;
  const hash = config.includeCommitHashes
    ? ` (${entry.hash.substring(0, HASH_SHORT_LENGTH)})`
    : '';
  const author = config.includeAuthors ? ` - ${entry.author}` : '';

  return `- ${entry.description}${breaking}${hash}${author}`;
};

const generatePackageChangelog = (
  packageInfo: PackageInfo,
  commits: CommitInfo[],
  version: string,
  config: ChangelogConfig
): string => {
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
    const typeInfo = COMMIT_TYPES[commit.type as keyof typeof COMMIT_TYPES];
    const type = typeInfo
      ? `${typeInfo.emoji} ${typeInfo.title}`
      : 'Other Changes';

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
      scope: commit.scope,
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
      changelogSections.push(formatChangelogEntry(entry, config));
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
      changelogSections.push(formatChangelogEntry(entry, config));
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

const generateGlobalChangelog = (
  _packages: PackageInfo[],
  commits: CommitInfo[],
  version: string,
  config: ChangelogConfig
): string => {
  const entries: Record<string, ChangelogEntry[]> = {};

  for (const commit of commits) {
    const typeInfo = COMMIT_TYPES[commit.type as keyof typeof COMMIT_TYPES];
    const type = typeInfo
      ? `${typeInfo.emoji} ${typeInfo.title}`
      : 'Other Changes';

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
      scope: commit.scope,
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
      changelogSections.push(formatChangelogEntry(entry, config));
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
      changelogSections.push(formatChangelogEntry(entry, config));
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
    await mkdir(dirname(filePath), { recursive: true });
    await writeFile(filePath, newContent);
  }
};

const getChangelogConfig = async (): Promise<ChangelogConfig> => {
  const format = await select({
    message: 'What changelog format would you like to use?',
    options: [
      { value: 'keepachangelog', label: 'Keep a Changelog format' },
      { value: 'conventional', label: 'Conventional Commits format' },
      { value: 'custom', label: 'Custom format' },
    ],
    initialValue: 'keepachangelog',
  });

  if (isCancel(format)) {
    cancel('Operation cancelled.');
    process.exit(0);
  }

  const includeAuthors = await confirm({
    message: 'Include commit authors in changelog entries?',
    initialValue: false,
  });

  if (isCancel(includeAuthors)) {
    cancel('Operation cancelled.');
    process.exit(0);
  }

  const includeCommitHashes = await confirm({
    message: 'Include commit hashes in changelog entries?',
    initialValue: true,
  });

  if (isCancel(includeCommitHashes)) {
    cancel('Operation cancelled.');
    process.exit(0);
  }

  const groupByScope = await confirm({
    message: 'Group changes by scope when available?',
    initialValue: false,
  });

  if (isCancel(groupByScope)) {
    cancel('Operation cancelled.');
    process.exit(0);
  }

  const sortOrder = await select({
    message: 'How should entries be sorted?',
    options: [
      { value: 'date', label: 'By date (newest first)' },
      { value: 'type', label: 'By type' },
      { value: 'scope', label: 'By scope' },
    ],
    initialValue: 'date',
  });

  if (isCancel(sortOrder)) {
    cancel('Operation cancelled.');
    process.exit(0);
  }

  return {
    format: format as ChangelogConfig['format'],
    includeAuthors: includeAuthors as boolean,
    includeCommitHashes: includeCommitHashes as boolean,
    groupByScope: groupByScope as boolean,
    sortOrder: sortOrder as ChangelogConfig['sortOrder'],
  };
};

const selectPackages = async (
  allPackages: PackageInfo[],
  packagesOption?: string
): Promise<PackageInfo[]> => {
  if (packagesOption) {
    const packageNames = packagesOption.split(',').map((name) => name.trim());
    return allPackages.filter((pkg) => packageNames.includes(pkg.name));
  }

  const packageChoices = allPackages.map((pkg) => ({
    value: pkg.name,
    label: `${pkg.name} (v${pkg.version})`,
  }));

  const selected = await multiselect({
    message: 'Which packages should have changelogs generated?',
    options: packageChoices,
    initialValues: packageChoices.map((p) => p.value),
  });

  if (isCancel(selected)) {
    cancel('Operation cancelled.');
    process.exit(0);
  }

  return allPackages.filter((pkg) => (selected as string[]).includes(pkg.name));
};

const getVersion = async (versionOption?: string): Promise<string> => {
  if (versionOption) {
    return versionOption;
  }

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

  return versionInput.toString();
};

const generatePackageChangelogs = async (options: {
  selectedPackages: PackageInfo[];
  commits: CommitInfo[];
  version: string;
  config: ChangelogConfig;
  dryRun: boolean;
}): Promise<void> => {
  const s = spinner();
  s.start('Generating changelogs...');

  for (const packageInfo of options.selectedPackages) {
    s.message(`Generating changelog for ${packageInfo.name}...`);

    const changelogContent = generatePackageChangelog(
      packageInfo,
      options.commits,
      options.version,
      options.config
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
};

const generateGlobalChangelogIfNeeded = async (options: {
  allPackages: PackageInfo[];
  commits: CommitInfo[];
  version: string;
  config: ChangelogConfig;
  global: boolean;
  dryRun: boolean;
}): Promise<void> => {
  if (options.global === false) {
    return;
  }

  const s = spinner();
  s.message('Generating global changelog...');

  const globalChangelogContent = generateGlobalChangelog(
    options.allPackages,
    options.commits,
    options.version,
    options.config
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
};

export const changelogAdvanced = async (options: {
  since?: string;
  version?: string;
  packages?: string;
  global?: boolean;
  dryRun?: boolean;
  config?: ChangelogConfig;
}) => {
  try {
    intro('Generating advanced changelog...');

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

    // Get configuration
    const config = options.config || (await getChangelogConfig());

    // Select packages and get version
    const selectedPackages = await selectPackages(
      allPackages,
      options.packages
    );
    const version = await getVersion(options.version);

    // Generate changelogs
    await generatePackageChangelogs({
      selectedPackages,
      commits,
      version,
      config,
      dryRun: options.dryRun || false,
    });

    // Generate global changelog
    await generateGlobalChangelogIfNeeded({
      allPackages,
      commits,
      version,
      config,
      global: options.global !== false,
      dryRun: options.dryRun || false,
    });

    s.stop('Advanced changelog generation complete!');

    outro(
      'Changelogs have been generated successfully with advanced configuration.'
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : `${error}`;
    log.error(`Failed to generate changelog: ${message}`);
    process.exit(1);
  }
};
