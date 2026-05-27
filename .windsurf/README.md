# Windsurf Configuration

This directory contains the Windsurf workspace configuration for the gabfon-site monorepo.

## Configuration Files

### `workspace.json`
Main workspace configuration that defines:
- Project metadata and repository information
- All applications and packages in the monorepo
- Available scripts and commands
- Technologies and features used

### `settings.json`
IDE settings and preferences:
- Editor formatting and behavior
- TypeScript preferences and IntelliSense
- File associations and exclusions
- Recommended extensions
- Terminal and Git configuration

### `launch.json`
Debugging configurations for:
- Next.js applications (www and studio)
- Vitest test runner
- Playwright E2E tests
- Turbo build process
- Compound configurations for multiple apps

### `tasks.json`
VS Code tasks for common operations:
- Development server startup
- Build and test commands
- Linting and formatting
- Individual app development
- Dependency management
- Security scanning

### `extensions.json`
Recommended VS Code extensions:
- TypeScript and JavaScript support
- React and Next.js tooling
- Markdown and MDX editing
- Testing frameworks
- Git workflow enhancements
- Productivity tools
- Monorepo support

## Usage

### Development
1. Open the workspace in Windsurf/VS Code
2. Install recommended extensions
3. Use the integrated terminal for commands
4. Run tasks from the command palette (`Cmd+Shift+P`)

### Debugging
- Use the "Run and Debug" panel (`Cmd+Shift+D`)
- Select appropriate configuration from the dropdown
- Set breakpoints in your code
- Start debugging with `F5`

### Tasks
- Open command palette (`Cmd+Shift+P`)
- Type "Tasks: Run Task"
- Select from available tasks:
  - "Start Development" - Starts all apps
  - "Build All" - Builds entire monorepo
  - "Run Tests" - Executes test suite
  - "Type Check" - TypeScript validation
  - "Lint" - Code quality checks

## Key Features

### Monorepo Support
- Proper workspace configuration for Turbo monorepo
- Individual app and package configurations
- Cross-package IntelliSense and navigation

### Development Workflow
- Hot reloading for Next.js apps
- Integrated testing with Vitest and Playwright
- Type checking across all packages
- Automated formatting and linting

### Debugging
- Multi-app debugging support
- Test runner debugging
- Build process debugging
- Browser debugging integration

### Productivity
- Recommended extensions for optimal development
- Pre-configured tasks for common operations
- Proper file associations and exclusions
- Git workflow enhancements

## Customization

To customize the configuration:
1. Edit the respective JSON files
2. Restart Windsurf/VS Code for changes to take effect
3. Test changes with your development workflow

## Notes

- Configuration is optimized for Bun package manager
- Uses Turbo for monorepo management
- Includes comprehensive testing setup
- Supports both development and production workflows
