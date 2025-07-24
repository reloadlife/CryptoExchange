# Crypto Exchange Workspace

A modern crypto exchange platform built with Next.js, Hono, and Bun in a monorepo structure.

## Architecture

- **Frontend**: Next.js 15 with React 19
- **Backend**: Hono API with Bun runtime
- **Shared**: Common utilities and types
- **Tooling**: Turbo for build orchestration, Biome for linting/formatting

## Prerequisites

- Node.js >=18.0.0
- pnpm >=8.0.0
- Bun (for API development)

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Start development servers:

```bash
pnpm dev
```

This will start:

- Frontend (Next.js) on http://localhost:3000
- Backend (Hono) on http://localhost:3001

## Project Structure

```
crypto-exchange/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # Hono backend
├── packages/
│   └── shared/       # Shared utilities and types
├── docker/           # Docker configurations
└── scripts/          # Build and deployment scripts
```

## Available Scripts

### Root Level

- `pnpm dev` - Start all development servers
- `pnpm build` - Build all packages and apps
- `pnpm lint` - Run linting across all packages
- `pnpm format` - Format code using Biome
- `pnpm type-check` - Run TypeScript checking

### Frontend (apps/web)

- `pnpm dev` - Start Next.js development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server

### Backend (apps/api)

- `pnpm dev` - Start Hono development server with hot reload
- `pnpm build` - Build for production
- `pnpm start` - Start production server

## API Endpoints

The backend provides the following endpoints:

- `GET /` - API status
- `GET /api/health` - Health check
- `GET /api/trades` - List all trades
- `GET /api/trades/:id` - Get specific trade
- `POST /api/trades` - Create new trade

## Development

### Adding New Features

1. **Shared utilities**: Add to `packages/shared/src/`
2. **Frontend pages**: Add to `apps/web/src/app/`
3. **API routes**: Add to `apps/api/src/`

### Code Quality

The project uses:

- **Biome** for fast linting and formatting
- **TypeScript** for type safety
- **Turbo** for fast builds and caching

Run quality checks:

```bash
pnpm lint        # Check for issues
pnpm format      # Auto-fix formatting
pnpm type-check  # Verify types
```

## Deployment

### Frontend (Vercel)

The Next.js app is ready for deployment on Vercel:

```bash
vercel deploy
```

### Backend (Any Bun-compatible platform)

The Hono API can be deployed to any platform supporting Bun:

```bash
pnpm build
pnpm start
```

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Hono, Bun, TypeScript
- **Tooling**: Turbo, Biome, pnpm
- **Shared**: TypeScript utilities and types

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT
