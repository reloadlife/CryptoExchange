# Crypto Exchange Deployment Guide

This guide covers the deployment process for the Crypto Exchange application using clean Docker builds and Kubernetes.

## Prerequisites

- **Bun** - For package management and builds
- **Docker** - For containerization
- **Kubernetes** - For orchestration
- **kubectl** - For Kubernetes management

## Project Structure

```
crypto-exchange/
├── packages/           # Shared packages
│   ├── api/           # API utilities
│   └── ui/            # UI components
├── apps/              # Applications
│   ├── backend/       # Backend API
│   └── frontend/      # Frontend web app
├── k8s/               # Kubernetes manifests
└── scripts/           # Build and deployment scripts
```

## Build Process

### 1. Package Builds

The project uses a monorepo structure with workspace dependencies. Packages must be built before apps.

```bash
# Build all packages
bun run build:packages

# Build individual package
cd packages/ui && bun run build
cd packages/api && bun run build
```

### 2. Application Builds

```bash
# Build all applications (packages will be built first)
bun run build

# Build individual apps
cd apps/backend && bun run build
cd apps/frontend && bun run build
```

### 3. Clean Builds

```bash
# Clean and rebuild everything
bun run build:clean
```

## Docker Builds

### Multi-stage Build Process

The project uses a multi-stage Docker build that:

1. Installs dependencies
2. Builds packages
3. Builds applications
4. Creates optimized runtime images

### Building Docker Images

```bash
# Build all services using root Dockerfile
bun run build:docker

# Build specific service
./scripts/docker-build.sh backend
./scripts/docker-build.sh frontend

# Build individual service using app Dockerfile
docker build -f apps/backend/Dockerfile -t crypto-exchange-backend:latest .
docker build -f apps/frontend/Dockerfile -t crypto-exchange-frontend:latest .
```

### Docker Compose

```bash
# Start all services
bun run docker:up

# Build and start
bun run docker:build && bun run docker:up

# Development mode
bun run docker:dev

# Stop services
bun run docker:down
```

## Kubernetes Deployment

### Prerequisites

1. **Kubernetes cluster** - Ensure you have access to a Kubernetes cluster
2. **kubectl** - Configured to connect to your cluster
3. **NGINX Ingress Controller** - For ingress (optional)
4. **cert-manager** - For SSL certificates (optional)

### Environment Variables

Set the following environment variables before deployment:

```bash
export DATABASE_URL="postgresql://user:password@host:port/database"
```

### Deploy to Kubernetes

```bash
# Deploy everything
bun run k8s:deploy

# Manual deployment
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
kubectl apply -f k8s/ingress.yaml
```

### Managing Secrets

Update the secrets manually if DATABASE_URL wasn't set:

```bash
kubectl create secret generic crypto-exchange-secrets \
  --namespace=crypto-exchange \
  --from-literal=database-url="postgresql://user:password@host:port/database"
```

### Check Deployment Status

```bash
# Check pods
kubectl get pods -n crypto-exchange

# Check services
kubectl get services -n crypto-exchange

# Check ingress
kubectl get ingress -n crypto-exchange

# View logs
kubectl logs -f deployment/crypto-exchange-backend -n crypto-exchange
kubectl logs -f deployment/crypto-exchange-frontend -n crypto-exchange
```

### Remove Deployment

```bash
# Remove everything
bun run k8s:remove
```

## Configuration

### Environment Variables

#### Backend

- `NODE_ENV` - Environment (production/development)
- `PORT` - Server port (default: 3001)
- `DATABASE_URL` - PostgreSQL connection string

#### Frontend

- `NODE_ENV` - Environment (production/development)
- `PORT` - Server port (default: 3000)
- `NEXT_PUBLIC_API_URL` - Backend API URL

### Ingress Configuration

The default ingress configuration expects:

- Frontend: `crypto-exchange.example.com`
- Backend API: `api.crypto-exchange.example.com`

Update `k8s/ingress.yaml` with your actual domain names.

### Local Testing

For local testing, add to your `/etc/hosts`:

```
127.0.0.1 crypto-exchange.example.com api.crypto-exchange.example.com
```

## Monitoring

### Health Checks

Both services include health check endpoints:

- Backend: `GET /health`
- Frontend: `GET /` (Next.js default)

### Scaling

Scale deployments as needed:

```bash
# Scale backend
kubectl scale deployment crypto-exchange-backend --replicas=5 -n crypto-exchange

# Scale frontend
kubectl scale deployment crypto-exchange-frontend --replicas=3 -n crypto-exchange
```

### Resource Limits

Current resource allocations:

- **Requests**: 256Mi memory, 250m CPU
- **Limits**: 512Mi memory, 500m CPU

Adjust in the deployment manifests as needed.

## Troubleshooting

### Common Issues

1. **Build failures**: Ensure packages are built before apps
2. **Docker build context**: Run docker builds from the root directory
3. **Workspace dependencies**: Check that package.json exports are correct
4. **Kubernetes secrets**: Ensure DATABASE_URL is properly set

### Debug Commands

```bash
# Check build logs
docker build --progress=plain -f apps/backend/Dockerfile .

# Check pod logs
kubectl logs -f <pod-name> -n crypto-exchange

# Describe pod for events
kubectl describe pod <pod-name> -n crypto-exchange

# Check service endpoints
kubectl get endpoints -n crypto-exchange
```

## Security Considerations

1. **Secrets**: Never commit sensitive data to version control
2. **TLS**: Configure proper SSL certificates for production
3. **Network policies**: Implement appropriate network isolation
4. **Resource limits**: Set appropriate CPU and memory limits
5. **Image scanning**: Regularly scan Docker images for vulnerabilities

## Performance Optimization

1. **Multi-stage builds**: Reduces final image size
2. **Layer caching**: Optimize Dockerfile for better caching
3. **Resource allocation**: Monitor and adjust CPU/memory limits
4. **Horizontal scaling**: Use multiple replicas for high availability
5. **CDN**: Consider using a CDN for frontend assets
