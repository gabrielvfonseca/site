# Site

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Deployment**: [Vercel](https://vercel.com)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics) and [Posthog](https://posthog.com)

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

2. Access the application at `http://localhost:3001`

## Development

### Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application
- `pnpm start` - Start production server
- `pnpm lint` - Linting
- `pnpm format` - Formatting
- `pnpm analyze` - Analyze bundle size
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm clean` - Clean build artifacts and dependencies

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.
# Security scan refresh
