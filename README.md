# Crypto Exchange

A modern, secure crypto exchange platform built with a monorepo architecture.

## 🚀 Quick Start

```bash
# Setup project
bun install
bun run setup

# Setup CI/CD scripts
bun run setup:scripts

# Setup Telegram notifications (optional)
bun run setup:telegram

# Development
bun run dev
```

## 🏗️ Architecture

### 📦 Monorepo Structure

```
crypto-exchange/
├── packages/           # Shared packages
│   ├── api/           # API utilities and types
│   └── ui/            # Shared UI components
├── apps/              # Applications
│   ├── backend/       # Backend API (Hono + Bun)
│   └── frontend/      # Frontend (Next.js + React)
└── k8s/               # Kubernetes manifests
```

### 🧱 Tech Stack

- **Runtime**: Bun (fast JavaScript runtime)
- **Backend**: Hono (lightweight web framework)
- **Frontend**: Next.js 15 + React 19
- **UI**: shadcn/ui + Tailwind CSS
- **Database**: PostgreSQL + Prisma
- **DevOps**: Docker + Kubernetes
- **CI/CD**: GitHub Actions + GHCR

## 🛠️ Development

### Prerequisites

- **Bun** >= 1.0
- **Docker** >= 20.10
- **Kubernetes** (for deployment)

### Commands

#### 🏗️ Building

```bash
bun run build              # Build everything
bun run build:packages     # Build packages only
bun run build:apps         # Build apps only
bun run build:clean        # Clean and rebuild
bun run build:docker       # Build Docker images
```

#### 🧪 Testing & Quality

```bash
bun run test              # Run tests
bun run lint              # Lint and fix
bun run lint:check        # Lint check only
bun run type-check        # TypeScript check
```

#### 🐳 Docker

```bash
bun run docker:up         # Start services
bun run docker:down       # Stop services
bun run docker:build      # Build images
bun run docker:dev        # Development mode
```

#### ☸️ Kubernetes

```bash
bun run k8s:deploy        # Deploy to Kubernetes
bun run k8s:remove        # Remove deployment
```

## 🔄 CI/CD Pipeline

### ✨ Features

- **🔍 Smart Change Detection**: Only builds what changed
- **🚀 Multi-platform Builds**: AMD64 + ARM64 support
- **🛡️ Security Scanning**: Trivy, CodeQL, dependency checks
- **📱 Telegram Notifications**: Real-time build/deploy status
- **🌍 Multi-environment**: Staging + Production with approval gates
- **♻️ Auto-cleanup**: Weekly cleanup of old container images
- **🔄 Auto-rollback**: Automatic rollback on deployment failure

### 📊 Workflows

| Workflow           | Trigger              | Purpose                         |
| ------------------ | -------------------- | ------------------------------- |
| **CI/CD Pipeline** | Push to main/develop | Build, test, push to GHCR       |
| **PR Validation**  | Pull requests        | Optimized validation checks     |
| **Deploy**         | Manual               | Deploy to Kubernetes            |
| **Security**       | Weekly + manual      | Comprehensive security scanning |
| **Cleanup**        | Weekly               | Remove old container images     |

### 🔐 Security

- **Multi-layer scanning**: Code, dependencies, containers
- **Secret management**: GitHub secrets with environment protection
- **Vulnerability gates**: Blocks deployment on critical issues
- **Minimal permissions**: Least privilege principle
- **Environment protection**: Production requires approvals

## 📦 Container Images

Images are automatically built and pushed to GitHub Container Registry:

```bash
# Backend
ghcr.io/your-username/crypto-exchange/backend:latest
ghcr.io/your-username/crypto-exchange/backend:main-{sha}

# Frontend
ghcr.io/your-username/crypto-exchange/frontend:latest
ghcr.io/your-username/crypto-exchange/frontend:main-{sha}
```

## 🚀 Deployment

### 🔧 Setup Required

1. **GitHub Secrets**: Configure in repository settings

   ```
   TELEGRAM_BOT_TOKEN=your_bot_token
   TELEGRAM_CHAT_ID=your_chat_id
   DATABASE_URL=postgresql://...
   KUBE_CONFIG=base64_encoded_kubeconfig
   ```

2. **Environment Protection**: Set up staging/production environments

3. **Telegram Bot**: Use `bun run setup:telegram` for guided setup

### 📱 Telegram Notifications

Get real-time notifications for:

- ✅ Successful builds and deployments
- ❌ Failed builds and deployments
- 🚨 Security vulnerabilities
- 🧹 Cleanup operations

Example notification:

```
✅ Build and Push Successful!

Repository: username/crypto-exchange
Branch: main
Commit: abc1234
Actor: username

Images pushed to GHCR:
ghcr.io/username/crypto-exchange/backend:main-abc1234
ghcr.io/username/crypto-exchange/frontend:main-abc1234
```

### 🎯 Deployment Process

#### Automatic (CI/CD)

1. Push to `main` or `develop`
2. Pipeline builds and pushes images
3. Images tagged with branch + commit SHA

#### Manual (Production)

1. Go to GitHub Actions → "Deploy to Kubernetes"
2. Select environment (staging/production)
3. Enter image tag to deploy
4. Approve deployment (if required)
5. Monitor rollout and get notifications

## 📚 Documentation

- **[CI-CD-SETUP.md](CI-CD-SETUP.md)** - Complete CI/CD setup guide
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Docker and Kubernetes deployment
- **[.github/SECURITY.md](.github/SECURITY.md)** - Security policy and guidelines

## 🛡️ Security

This project follows security best practices:

- Automated vulnerability scanning
- Container image security
- Secret management
- Environment isolation
- Incident response procedures

Report security issues to: security@crypto-exchange.example.com

## 📈 Performance

### 🏃‍♂️ Build Times

- **PR Validation**: 3-5 minutes
- **Full CI/CD**: 8-12 minutes
- **Security Scan**: 10-15 minutes
- **Deployment**: 5-8 minutes

### ⚡ Optimizations

- Docker layer caching
- Parallel job execution
- Smart change detection
- Conditional workflow steps

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure tests pass
5. Create a pull request

All contributions go through:

- Automated testing
- Security scanning
- Code review
- PR validation checks

## 📄 License

[MIT License](LICENSE)

---

Built with ❤️ using modern DevOps practices
