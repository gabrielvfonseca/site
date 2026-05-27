import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { log, spinner } from '@clack/prompts';
import { changelog } from './changelog.js';
import { exec } from './utils.js';

type PackageVersion = {
  name: string;
  path: string;
  oldVersion: string;
  newVersion: string;
  hasChanges: boolean;
};

const getPackageVersions = async (): Promise<PackageVersion[]> => {
  const packages: PackageVersion[] = [];

  // Get packages from packages directory
  try {
    const packagesDir = join(process.cwd(), 'packages');
    const packageDirs = await readdir(packagesDir);

    for (const dir of packageDirs) {
      const packagePath = join(packagesDir, dir, 'package.json');
      try {
        const packageJson = JSON.parse(await readFile(packagePath, 'utf8'));

        packages.push({
          name: packageJson.name || dir,
          path: join(packagesDir, dir),
          oldVersion: packageJson.version || '0.0.0',
          newVersion: packageJson.version || '0.0.0',
          hasChanges: false,
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

        packages.push({
          name: packageJson.name || dir,
          path: join(appsDir, dir),
          oldVersion: packageJson.version || '0.0.0',
          newVersion: packageJson.version || '0.0.0',
          hasChanges: false,
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

const getLastTag = async (): Promise<string | null> => {
  try {
    const { stdout } = await exec('git describe --tags --abbrev=0');
    return stdout.trim();
  } catch {
    return null;
  }
};

const getCommitsSinceTag = async (tag: string): Promise<string[]> => {
  try {
    const { stdout } = await exec(`git log --pretty=format:"%H" ${tag}..HEAD`);
    return stdout.trim().split('\n').filter(Boolean);
  } catch {
    return [];
  }
};

const hasPackageChanges = async (
  packagePath: string,
  commits: string[]
): Promise<boolean> => {
  try {
    for (const commit of commits) {
      const { stdout } = await exec(
        `git show --name-only --pretty=format: ${commit}`
      );
      const files = stdout.trim().split('\n').filter(Boolean);

      const hasChanges = files.some(
        (file) =>
          file.startsWith(packagePath) ||
          file.includes('package.json') ||
          file.includes('pnpm-lock.yaml')
      );

      if (hasChanges) {
        return true;
      }
    }
    return false;
  } catch {
    return false;
  }
};

const detectVersionChanges = async (): Promise<PackageVersion[]> => {
  const packages = await getPackageVersions();
  const lastTag = await getLastTag();

  if (!lastTag) {
    log.warn('No git tags found. Cannot detect version changes.');
    return packages;
  }

  const commits = await getCommitsSinceTag(lastTag);

  if (commits.length === 0) {
    log.info('No commits since last tag. No version changes detected.');
    return packages;
  }

  log.info(`Found ${commits.length} commits since last tag: ${lastTag}`);

  // Check which packages have changes
  for (const pkg of packages) {
    const relativePath = pkg.path.replace(`${process.cwd()}/`, '');
    pkg.hasChanges = await hasPackageChanges(relativePath, commits);
  }

  return packages.filter((pkg) => pkg.hasChanges);
};

const generateChangelogForPackage = async (
  packageInfo: PackageVersion,
  since: string
): Promise<void> => {
  const s = spinner();
  s.start(`Generating changelog for ${packageInfo.name}...`);

  try {
    await changelog({
      since,
      version: packageInfo.newVersion,
      packages: packageInfo.name,
      global: false,
      dryRun: false,
    });

    s.stop(`Changelog generated for ${packageInfo.name}`);
  } catch (error) {
    s.stop(`Failed to generate changelog for ${packageInfo.name}: ${error}`);
  }
};

const generateGlobalChangelog = async (
  packages: PackageVersion[],
  since: string
): Promise<void> => {
  const s = spinner();
  s.start('Generating global changelog...');

  try {
    // Get the highest version among changed packages
    const versions = packages.map((pkg) => pkg.newVersion);
    const globalVersion = versions.sort((a, b) => {
      const [aMajor, aMinor, aPatch] = a.split('.').map(Number);
      const [bMajor, bMinor, bPatch] = b.split('.').map(Number);

      if (aMajor !== bMajor) {
        return bMajor - aMajor;
      }
      if (aMinor !== bMinor) {
        return bMinor - aMinor;
      }
      return bPatch - aPatch;
    })[0];

    await changelog({
      since,
      version: globalVersion,
      packages: packages.map((pkg) => pkg.name).join(','),
      global: true,
      dryRun: false,
    });

    s.stop('Global changelog generated');
  } catch (error) {
    s.stop(`Failed to generate global changelog: ${error}`);
  }
};

export const autoChangelog = async (options: {
  since?: string;
  force?: boolean;
  packages?: string;
}) => {
  try {
    const s = spinner();
    s.start('Detecting version changes...');

    const changedPackages = await detectVersionChanges();
    s.stop(`Found ${changedPackages.length} packages with changes`);

    if (changedPackages.length === 0 && !options.force) {
      log.info(
        'No packages with changes detected. Use --force to generate changelogs anyway.'
      );
      return;
    }

    const since = options.since || '1 week ago';

    // Filter packages if specified
    let packagesToProcess = changedPackages;
    if (options.packages) {
      const packageNames = options.packages
        .split(',')
        .map((name) => name.trim());
      packagesToProcess = changedPackages.filter((pkg) =>
        packageNames.includes(pkg.name)
      );
    }

    if (packagesToProcess.length === 0) {
      log.info('No packages to process after filtering.');
      return;
    }

    log.info(`Processing ${packagesToProcess.length} packages:`);
    for (const pkg of packagesToProcess) {
      log.info(`  - ${pkg.name} (${pkg.oldVersion} → ${pkg.newVersion})`);
    }

    // Generate changelogs for individual packages
    for (const packageInfo of packagesToProcess) {
      await generateChangelogForPackage(packageInfo, since);
    }

    // Generate global changelog
    await generateGlobalChangelog(packagesToProcess, since);

    log.success('Auto changelog generation complete!');
  } catch (error) {
    const message = error instanceof Error ? error.message : `${error}`;
    log.error(`Failed to generate auto changelog: ${message}`);
    process.exit(1);
  }
};
