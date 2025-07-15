# Crypto Exchange

A modern cryptocurrency exchange platform built with Next.js, Hono, Prisma, and TailwindCSS v4.

## 🏗️ Architecture

This monorepo contains:

- **Frontend** (`apps/frontend`): Next.js 15 application with React 19
- **Backend** (`apps/backend`): Hono API server with Bun runtime
- **UI Library** (`packages/ui`): Shared UI components with ShadcnUI
- **Database**: PostgreSQL with Prisma ORM

## 🚀 Tech Stack

- **Framework**: Next.js 15 + React 19
- **Backend**: Hono + Bun
- **Database**: PostgreSQL + Prisma
- **Styling**: TailwindCSS v4
- **UI Components**: ShadcnUI
- **Linting**: Biome
- **Containerization**: Docker + Docker Compose
- **Package Manager**: Bun

## 📦 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) >= 1.0
- [Docker](https://docker.com/) (for database)
- [Node.js](https://nodejs.org/) >= 18 (fallback)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd crypto-exchange
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Set up the database**

   ```bash
   # Start PostgreSQL with Docker
   docker-compose up postgres -d

   # Set up Prisma
   bun run db:generate
   bun run db:push
   ```

4. **Start development servers**

   ```bash
   # Start all services
   bun run dev

   # Or start individually
   bun run frontend:dev  # Frontend on http://localhost:3000
   bun run backend:dev   # Backend on http://localhost:3001
   ```

## 🛠️ Available Scripts

### Development

- `bun run dev` - Start all development servers
- `bun run frontend:dev` - Start frontend only
- `bun run backend:dev` - Start backend only
- `bun run ui:dev` - Build UI library in watch mode

### Building

- `bun run build` - Build all applications
- `bun run clean` - Clean all build artifacts

### Database

- `bun run db:generate` - Generate Prisma client
- `bun run db:push` - Push schema to database
- `bun run db:migrate` - Run database migrations
- `bun run db:reset` - Reset database
- `bun run db:studio` - Open Prisma Studio

### Code Quality

- `bun run lint` - Lint and fix code with Biome
- `bun run lint:check` - Check code without fixing
- `bun run format` - Format code with Biome
- `bun run type-check` - Type check all packages

### Docker

- `bun run docker:up` - Start all services with Docker
- `bun run docker:down` - Stop all Docker services
- `bun run docker:dev` - Start development environment
- `bun run docker:build` - Build Docker images
- `bun run docker:logs` - View Docker logs

### Setup

- `bun run setup` - Complete setup (install + db setup)

## 📁 Project Structure

```
crypto-exchange/
├── apps/
│   ├── frontend/          # Next.js application
│   │   ├── src/
│   │   ├── public/
│   │   ├── Dockerfile
│   │   └── package.json
│   └── backend/           # Hono API server
│       ├── index.ts
│       ├── Dockerfile
│       └── package.json
├── packages/
│   └── ui/                # Shared UI components
│       ├── src/
│       │   ├── components/
│       │   └── lib/
│       └── package.json
├── prisma/
│   └── schema.prisma      # Database schema
├── docker-compose.yml     # Production Docker setup
├── docker-compose.dev.yml # Development Docker setup
├── biome.json            # Biome configuration
└── package.json          # Workspace configuration
```

## 🐳 Docker Development

### Quick Start with Docker

```bash
# Start the complete development environment
bun run docker:dev

# Or production environment
bun run docker:up
```

### Services

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **Database**: PostgreSQL on port 5432
- **Redis**: Port 6379
- **Adminer**: http://localhost:8080 (Database management)

## 🔧 Development Workflow

1. **Start the development environment**

   ```bash
   bun run dev
   ```

2. **Make changes to code** - Hot reloading is enabled

3. **Run checks before committing**

   ```bash
   bun run lint
   bun run type-check
   ```

4. **Database changes**
   ```bash
   # After modifying schema.prisma
   bun run db:migrate
   ```

## 🧩 UI Components

The shared UI library is built with ShadcnUI and TailwindCSS v4:

```tsx
import { Button } from "@crypto-exchange/ui";

export function MyComponent() {
  return (
    <Button variant="primary" size="lg">
      Trade Now
    </Button>
  );
}
```

## 🛡️ Environment Variables

Copy `.env.example` to `.env` and configure:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/crypto_exchange"
NEXTAUTH_SECRET="your-secret-key"
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Hono Documentation](https://hono.dev/)
- [Prisma Documentation](https://prisma.io/docs)
- [TailwindCSS v4](https://tailwindcss.com/docs)
- [ShadcnUI](https://ui.shadcn.com/)
- [Biome](https://biomejs.dev/)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
