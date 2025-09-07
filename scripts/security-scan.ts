#!/usr/bin/env tsx

import { exec } from 'node:child_process';
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

type SecurityScanOptions = {
  severityThreshold?: 'low' | 'medium' | 'high' | 'critical';
  failOnError?: boolean;
  verbose?: boolean;
  allProjects?: boolean;
};

type ScanResult = {
  path: string;
  name: string;
  success: boolean;
  error?: string;
  output?: string;
};

class SecurityScanner {
  private readonly options: Required<SecurityScanOptions>;

  constructor(options: SecurityScanOptions = {}) {
    this.options = {
      severityThreshold: options.severityThreshold || 'high',
      failOnError: options.failOnError ?? true,
      verbose: options.verbose ?? false,
      allProjects: options.allProjects ?? false,
    };
  }

  private log(message: string, emoji?: string): void {
    if (emoji) {
      console.log(`${emoji} ${message}`);
    } else {
      console.log(message);
    }
  }

  private async runSnyk(
    packagePath: string,
    name: string
  ): Promise<ScanResult> {
    const packageJsonPath = join(packagePath, 'package.json');

    if (!existsSync(packageJsonPath)) {
      return {
        path: packagePath,
        name,
        success: false,
        error: 'No package.json found',
      };
    }

    try {
      this.log(`Scanning ${name}: ${packagePath}`, '📦');

      const command = `npx snyk test --severity-threshold=${this.options.severityThreshold} --file="${packageJsonPath}"`;
      const { stdout } = await execAsync(command);

      if (this.options.verbose) {
        console.log(stdout);
      }

      this.log(`${name} scan completed`, '✅');

      return {
        path: packagePath,
        name,
        success: true,
        output: stdout,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.log(`Security issues found in ${name}`, '⚠️');

      if (this.options.verbose) {
        console.error(errorMessage);
      }

      return {
        path: packagePath,
        name,
        success: false,
        error: errorMessage,
      };
    }
  }

  private getDirectories(path: string): string[] {
    if (!existsSync(path)) {
      return [];
    }

    return readdirSync(path)
      .filter((item) => {
        const fullPath = join(path, item);
        return statSync(fullPath).isDirectory();
      })
      .map((item) => join(path, item));
  }

  private async scanAllProjects(): Promise<ScanResult[]> {
    this.log('Running Snyk with --all-projects flag...', '🔍');

    try {
      const command = `npx snyk test --severity-threshold=${this.options.severityThreshold} --all-projects`;
      const { stdout } = await execAsync(command);

      if (this.options.verbose) {
        console.log(stdout);
      }

      this.log('All projects scan completed', '✅');

      return [
        {
          path: '.',
          name: 'all-projects',
          success: true,
          output: stdout,
        },
      ];
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.log('Security issues found in one or more projects', '⚠️');

      if (this.options.verbose) {
        console.error(errorMessage);
      }

      return [
        {
          path: '.',
          name: 'all-projects',
          success: false,
          error: errorMessage,
        },
      ];
    }
  }

  private async scanIndividualProjects(): Promise<ScanResult[]> {
    const results: ScanResult[] = [];

    // Scan root package.json
    this.log('Scanning root package...', '🏠');
    const rootResult = await this.runSnyk('.', 'root');
    results.push(rootResult);

    // Scan all packages
    this.log('Scanning packages...', '📚');
    const packageDirs = this.getDirectories('packages');
    for (const packageDir of packageDirs) {
      const packageName = packageDir.split('/').pop() || 'unknown';
      const result = await this.runSnyk(packageDir, `package: ${packageName}`);
      results.push(result);
    }

    // Scan all apps
    this.log('Scanning apps...', '🚀');
    const appDirs = this.getDirectories('apps');
    for (const appDir of appDirs) {
      const appName = appDir.split('/').pop() || 'unknown';
      const result = await this.runSnyk(appDir, `app: ${appName}`);
      results.push(result);
    }

    return results;
  }

  async scan(): Promise<ScanResult[]> {
    this.log('Starting security scan...', '🔍');

    const results = this.options.allProjects
      ? await this.scanAllProjects()
      : await this.scanIndividualProjects();

    // Summary
    const successful = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success).length;

    this.log(
      `Security scan completed! ${successful} successful, ${failed} failed`,
      '🎉'
    );

    if (failed > 0 && this.options.failOnError) {
      process.exit(1);
    }

    return results;
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const options: SecurityScanOptions = {};

  // Parse command line arguments
  for (const [i, arg] of args.entries()) {
    switch (arg) {
      case '--severity-threshold':
      case '-s':
        options.severityThreshold = args[
          i + 1
        ] as SecurityScanOptions['severityThreshold'];
        break;
      case '--all-projects':
      case '-a':
        options.allProjects = true;
        break;
      case '--verbose':
      case '-v':
        options.verbose = true;
        break;
      case '--no-fail':
        options.failOnError = false;
        break;
      case '--help':
      case '-h':
        console.log(`
Security Scanner for Monorepo

Usage: tsx security-scan.ts [options]

Options:
  -s, --severity-threshold <level>  Set severity threshold (low, medium, high, critical) [default: high]
  -a, --all-projects               Use Snyk --all-projects flag for faster scanning
  -v, --verbose                    Show detailed output
  --no-fail                        Don't exit with error code on security issues
  -h, --help                       Show this help message

Examples:
  tsx security-scan.ts                    # Standard scan with high severity threshold
  tsx security-scan.ts --all-projects     # Fast scan using --all-projects
  tsx security-scan.ts --verbose          # Detailed output
  tsx security-scan.ts --no-fail          # Don't fail on security issues
        `);
        process.exit(0);
        break;
      default:
        // Ignore unknown arguments
        break;
    }
  }

  const scanner = new SecurityScanner(options);
  await scanner.scan();
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error('Security scan failed:', error);
    process.exit(1);
  });
}

export { SecurityScanner, type SecurityScanOptions, type ScanResult };
