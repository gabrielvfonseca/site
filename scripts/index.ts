#!/usr/bin/env node

import { program } from 'commander';
import { autoChangelog } from './auto-changelog.js';
import { changelog } from './changelog.js';
import { changelogAdvanced } from './changelog-advanced.js';
import { initialize } from './initialize.js';
import { SecurityScanner } from './security-scan.js';
import { update } from './update.js';

program
  .command('init')
  .description('Initialize a new project')
  .option('--name <name>', 'Name of the project')
  .option(
    '--package-manager <manager>',
    'Package manager to use (npm, yarn, bun, pnpm)'
  )
  .option('--disable-git', 'Disable git initialization')
  .action(initialize);

program
  .command('update')
  .description('Update the project from one version to another')
  .option('--from <version>', 'Version to update from e.g. 1.0.0')
  .option('--to <version>', 'Version to update to e.g. 2.0.0')
  .action(update);

program
  .command('changelog')
  .description('Generate changelog files for packages and global project')
  .option(
    '--since <date>',
    'Generate changelog since date (e.g., "1 week ago", "2024-01-01")',
    '1 week ago'
  )
  .option(
    '--version <version>',
    'Version number for the changelog (e.g., "1.0.0")'
  )
  .option(
    '--packages <packages>',
    'Comma-separated list of package names to generate changelogs for'
  )
  .option('--no-global', 'Skip generating global changelog')
  .option('--dry-run', 'Show what would be generated without writing files')
  .action(changelog);

program
  .command('changelog:advanced')
  .description('Generate changelog files with advanced configuration options')
  .option(
    '--since <date>',
    'Generate changelog since date (e.g., "1 week ago", "2024-01-01")',
    '1 week ago'
  )
  .option(
    '--version <version>',
    'Version number for the changelog (e.g., "1.0.0")'
  )
  .option(
    '--packages <packages>',
    'Comma-separated list of package names to generate changelogs for'
  )
  .option('--no-global', 'Skip generating global changelog')
  .option('--dry-run', 'Show what would be generated without writing files')
  .action(changelogAdvanced);

program
  .command('changelog:auto')
  .description('Automatically detect version changes and generate changelogs')
  .option(
    '--since <date>',
    'Generate changelog since date (e.g., "1 week ago", "2024-01-01")',
    '1 week ago'
  )
  .option(
    '--force',
    'Generate changelogs even if no version changes are detected'
  )
  .option(
    '--packages <packages>',
    'Comma-separated list of package names to generate changelogs for'
  )
  .action(autoChangelog);

program
  .command('security')
  .description('Run security vulnerability scan using Snyk')
  .option(
    '-s, --severity-threshold <level>',
    'Set severity threshold (low, medium, high, critical)',
    'high'
  )
  .option(
    '-a, --all-projects',
    'Use Snyk --all-projects flag for faster scanning'
  )
  .option('-v, --verbose', 'Show detailed output')
  .option('--no-fail', "Don't exit with error code on security issues")
  .action(async (options) => {
    const scanner = new SecurityScanner({
      severityThreshold: options.severityThreshold,
      allProjects: options.allProjects,
      verbose: options.verbose,
      failOnError: options.fail !== false,
    });
    await scanner.scan();
  });

program.parse(process.argv);
