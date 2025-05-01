# Site

A modern web application built with Next.js, TypeScript, and pnpm.

<div>
  <img src="https://img.shields.io/github/license/gabrielvfonseca/site" alt="License" />
  <img src="https://img.shields.io/github/package-json/v/gabrielvfonseca/site" alt="Version" />
  <img src="https://img.shields.io/github/last-commit/gabrielvfonseca/site" alt="Last commit" />
</div>

## Features

- 🚀 Next.js 14 with App Router
- ⚡️ TurboRepo for monorepo management
- 📦 pnpm for fast, disk space efficient package management
- 🐳 Docker support for development and production
- 🔒 Security best practices and automated updates
- 📝 Conventional commits and automated changelog
- 🧪 Testing setup with Jest and React Testing Library
- 💅 Styled with Tailwind CSS and shadcn/ui
- 📱 Fully responsive design

## Getting Started

### Prerequisites

- Node.js 20 or later
- pnpm 8 or later
- Docker and Docker Compose (optional)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gabrielvfonseca/site.git
   cd site
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

### Docker Setup

1. Build and start the containers:
   ```bash
   docker-compose up -d
   ```

2. Access the application at `http://localhost:3000`

## Project Structure

```
site/
├── apps/              # Applications
│   ├── web/          # Main web application
│   └── storybook/    # Component documentation
├── packages/         # Shared packages
│   ├── design-system # UI components and styles
│   ├── email/        # Email templates and services
│   └── ...          # Other shared packages
├── .github/          # GitHub configurations
├── .husky/           # Git hooks
└── .vscode/          # VSCode settings
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
