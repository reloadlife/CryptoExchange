# Crypto Exchange Workspace

A modern crypto exchange platform built with Next.js, Hono, and Bun in a monorepo structure.

## Architecture

- **Frontend**: Next.js 15 with React 19 and TypeScript SDK
- **Backend**: Modular Hono API with full TypeScript support
- **API Package**: Type-safe SDK and API client for frontend consumption
- **Shared**: Common utilities and types
- **Tooling**: Turbo for build orchestration, Biome for linting/formatting

## Key Features

- 🏗️ **Modular Backend Architecture** - Organized routes, controllers, services, and middleware
- 📦 **TypeScript SDK** - Full type safety between frontend and backend
- 🔌 **API Package** - Reusable client with error handling and timeout support
- ⚡ **Fast Development** - Hot reload and instant type checking
- 🔒 **Type Safety** - End-to-end TypeScript coverage

## Prerequisites

- Node.js >=18.0.0
- pnpm >=8.0.0
- Bun (for API development)

## Getting Started

### Local Development

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

### Docker Deployment

#### Quick Start with Docker

```bash
# Development environment with hot reloading
./scripts/docker-deploy.sh development

# Production environment
./scripts/docker-deploy.sh production
```

#### Manual Docker Commands

```bash
# Development
docker-compose -f docker-compose.dev.yml up -d

# Production
docker-compose up -d

# Production with Nginx proxy
docker-compose -f docker/docker-compose.prod.yml up -d
```

#### Docker Services

- **API**: http://localhost:3001 (Bun runtime)
- **Web**: http://localhost:3000 (Next.js)
- **Nginx**: http://localhost:80 (Production only)

## Project Structure

```
crypto-exchange/
├── apps/
│   ├── web/                    # Next.js frontend
│   │   ├── src/
│   │   │   ├── app/           # App router pages
│   │   │   ├── components/    # React components
│   │   │   └── lib/           # API client configuration
│   │   └── package.json
│   └── api/                    # Modular Hono backend
│       ├── src/
│       │   ├── controllers/   # Request handlers
│       │   ├── middleware/    # CORS, error handling
│       │   ├── routes/        # Route definitions
│       │   ├── services/      # Business logic
│       │   ├── types/         # Backend types
│       │   └── index.ts       # Main app file
│       └── package.json
├── packages/
│   ├── api/                    # TypeScript SDK package
│   │   ├── src/
│   │   │   ├── types.ts       # API type definitions
│   │   │   ├── client.ts      # SDK client implementation
│   │   │   └── index.ts       # Package exports
│   │   └── package.json
│   └── shared/                 # Shared utilities and types
│       ├── src/
│       │   └── index.ts       # Common utilities
│       └── package.json
├── docker/                     # Docker configurations
└── scripts/                    # Build and deployment scripts
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

The modular backend provides the following endpoints:

### Health

- `GET /` - API status with version info
- `GET /api/health` - Health check with timestamp

### Trades

- `GET /api/trades` - List all trades with calculations
- `GET /api/trades/:id` - Get specific trade by ID
- `POST /api/trades` - Create new trade with validation

### Response Format

All API responses follow a consistent format:

```typescript
{
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

## SDK Usage

The `@crypto-exchange/sdk` package provides a type-safe client:

```typescript
import { createApiClient } from "@crypto-exchange/sdk";

const apiClient = createApiClient({
  baseUrl: "http://localhost:3001",
});

// Type-safe API calls
const trades = await apiClient.getTrades();
const newTrade = await apiClient.createTrade({
  pair: "BTC/USD",
  amount: 0.5,
  price: 45000,
  type: "buy",
});
```

## Development

### Adding New Features

1. **Shared utilities**: Add to `packages/shared/src/`
2. **Frontend components**: Add to `apps/web/src/app/components/`
3. **API types**: Add to `packages/api/src/types.ts`
4. **API routes**: Add controller to `apps/api/src/controllers/` and route to `apps/api/src/routes/`
5. **Business logic**: Add service to `apps/api/src/services/`

### Backend Architecture

The backend follows a modular structure:

- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic and data access
- **Routes**: Define endpoint mappings
- **Middleware**: Handle cross-cutting concerns (CORS, errors)
- **Types**: TypeScript definitions for the backend

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

### Local Docker Deployment

Deploy the entire stack locally using Docker:

```bash
# Build and deploy production environment
./scripts/docker-deploy.sh production

# View logs
./scripts/docker-logs.sh

# Cleanup resources
./scripts/docker-cleanup.sh
```

### CI/CD with GitHub Actions

Automated building and deployment using GitHub Container Registry:

#### Automatic Builds
- **Push to main/master**: Builds and pushes `latest` tag
- **Create tag (v1.2.3)**: Builds and pushes semantic versions
- **Pull requests**: Builds and tests without pushing

#### Deploy Pre-built Images
```bash
# Use remote images from ghcr.io
REGISTRY=ghcr.io TAG=latest ./scripts/docker-deploy.sh production

# Deploy specific version
REGISTRY=ghcr.io TAG=v1.2.3 ./scripts/docker-deploy.sh production

# Or use the dedicated remote deployment script
./scripts/deploy-remote.sh production
```

#### Available Images
- `ghcr.io/[org]/[repo]/api:latest` - Backend API
- `ghcr.io/[org]/[repo]/web:latest` - Frontend Web App

### Individual Services

#### Backend (Bun-compatible platforms)

```bash
pnpm build
pnpm start
```

#### Frontend (Vercel/Node.js platforms)

```bash
vercel deploy
```

### Production with Nginx

For production deployments with SSL and reverse proxy:

```bash
docker-compose -f docker/docker-compose.prod.yml up -d
```

This includes:

- Nginx reverse proxy with SSL support
- Rate limiting and security headers
- Gzip compression and caching
- Health checks and monitoring

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Hono, Bun, TypeScript (modular architecture)
- **API SDK**: TypeScript client with full type safety
- **Tooling**: Turbo, Biome, pnpm
- **Shared**: TypeScript utilities and common types

## Packages

- `@crypto-exchange/web` - Next.js frontend application
- `@crypto-exchange/api` - Hono backend API server
- `@crypto-exchange/sdk` - TypeScript SDK and type definitions
- `@crypto-exchange/shared` - Common utilities and types

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT
