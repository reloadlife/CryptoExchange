# GitHub Actions CI/CD

This directory contains GitHub Actions workflows for automated testing, building, and deployment of the Crypto Exchange platform.

## Workflows Overview

### 1. `test-and-lint.yml` - Quality Assurance

**Triggers**: Push to main/master/develop, Pull Requests

**Jobs**:

- **Test**: Runs on Node.js 18 & 20
  - Install dependencies with pnpm
  - Build packages (shared, api)
  - Run linting with Biome
  - Run TypeScript type checking
  - Build applications
- **Docker Test**:
  - Test Docker builds without pushing
  - Validate Dockerfiles work correctly

### 2. `build-and-push.yml` - Container Registry

**Triggers**: Push to main/master/develop, Tags (v\*), Pull Requests

**Features**:

- **Multi-platform builds**: linux/amd64, linux/arm64
- **Smart tagging**:
  - Branch names for pushes
  - PR numbers for pull requests
  - Semantic versioning for tags (v1.2.3 → 1.2.3, 1.2, 1)
  - SHA prefixes for commits
  - `latest` tag for default branch
- **Registry**: GitHub Container Registry (ghcr.io)
- **Caching**: GitHub Actions cache for faster builds

**Images produced**:

- `ghcr.io/[org]/[repo]/api:latest`
- `ghcr.io/[org]/[repo]/web:latest`

### 3. `deploy.yml` - Production Deployment

**Triggers**: Tags (v\*), Manual workflow dispatch

**Features**:

- **Environment selection**: staging, production
- **Deployment manifest**: Auto-generated docker-compose.deploy.yml
- **Artifact upload**: Deployment manifests for download
- **Server deployment**: Ready for SSH deployment (commented)

## Image Tagging Strategy

| Trigger         | Example Tag         | Description           |
| --------------- | ------------------- | --------------------- |
| Push to main    | `latest`            | Latest stable build   |
| Push to feature | `feature-branch`    | Branch-specific build |
| Pull Request    | `pr-123`            | PR-specific build     |
| Tag v1.2.3      | `1.2.3`, `1.2`, `1` | Semantic versioning   |
| Commit          | `main-abc1234`      | SHA-based tag         |

## Using the Images

### Pull from Registry

```bash
# Pull latest images
docker pull ghcr.io/[org]/[repo]/api:latest
docker pull ghcr.io/[org]/[repo]/web:latest

# Pull specific version
docker pull ghcr.io/[org]/[repo]/api:v1.2.3
docker pull ghcr.io/[org]/[repo]/web:v1.2.3
```

### Deploy with Scripts

```bash
# Use remote images if available
REGISTRY=ghcr.io TAG=latest ./scripts/docker-deploy.sh production

# Deploy specific version
REGISTRY=ghcr.io TAG=v1.2.3 ./scripts/docker-deploy.sh production
```

## Manual Deployment

### From Workflow Artifacts

1. Go to GitHub Actions → Deploy → Download deployment manifest
2. Extract `docker-compose.deploy.yml`
3. Run: `docker-compose -f docker-compose.deploy.yml up -d`

### With Deployment Script

```bash
# Set environment variables
export REGISTRY=ghcr.io
export TAG=v1.2.3
export GITHUB_REPOSITORY=org/repo

# Deploy
./scripts/docker-deploy.sh production
```

## Server Deployment Setup

To enable automatic server deployment, uncomment and configure the SSH deployment step in `deploy.yml`:

### Required Secrets

- `DEPLOY_HOST`: Server hostname or IP
- `DEPLOY_USER`: SSH username
- `DEPLOY_KEY`: SSH private key

### Server Requirements

- Docker and docker-compose installed
- SSH access configured
- Deployment directory created

## Development Workflow

### 1. Feature Development

```bash
git checkout -b feature/new-feature
# Make changes
git push origin feature/new-feature
# Creates PR → triggers test-and-lint.yml
```

### 2. Testing & Review

- **Automatic**: Tests run on push
- **Manual**: Review code and approve PR

### 3. Release

```bash
git checkout main
git tag v1.2.3
git push origin v1.2.3
# Triggers build-and-push.yml + deploy.yml
```

## Security

### Registry Access

- **Public images**: Readable by anyone
- **Private images**: Require GitHub token
- **Push access**: Requires repository write permissions

### Authentication

```bash
# Login to ghcr.io
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin

# Or use personal access token
echo $PAT | docker login ghcr.io -u USERNAME --password-stdin
```

## Monitoring & Troubleshooting

### View Workflow Status

- GitHub → Actions tab
- Check workflow runs and logs
- Download artifacts from successful deployments

### Debug Failed Builds

1. Check workflow logs in GitHub Actions
2. Test Docker builds locally:
   ```bash
   docker build -f apps/api/Dockerfile .
   docker build -f apps/web/Dockerfile .
   ```

### Registry Issues

```bash
# List images in registry
gh api /user/packages/container/[repo]/versions

# Delete specific version
gh api -X DELETE /user/packages/container/[repo]/versions/[version-id]
```

## Cost Optimization

- **Cache strategy**: GitHub Actions cache reduces build time
- **Multi-platform**: Built only when needed
- **Cleanup**: Automatic cleanup of old PR images
- **Registry**: GitHub provides free container storage for public repos
