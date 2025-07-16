# CI/CD Setup Guide

This guide walks you through setting up the complete CI/CD pipeline for the Crypto Exchange project with GitHub Actions, GHCR, and Telegram notifications.

## 🔧 Prerequisites

- GitHub repository with admin access
- Telegram bot for notifications
- Kubernetes cluster (for deployment)
- Container registry access (GHCR is used by default)

## 📋 Quick Setup Checklist

- [ ] Configure GitHub secrets
- [ ] Set up Telegram bot
- [ ] Configure environment protection rules
- [ ] Enable GitHub Container Registry
- [ ] Set up Kubernetes cluster access
- [ ] Configure branch protection rules

## 🔐 GitHub Secrets Configuration

### 1. Telegram Notifications

Create a Telegram bot for notifications:

1. Message [@BotFather](https://t.me/BotFather) on Telegram
2. Create a new bot: `/newbot`
3. Follow instructions to get your bot token
4. Add your bot to a group or use direct messages
5. Get your chat ID using [@userinfobot](https://t.me/userinfobot)

**Required Secrets:**

```
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

### 2. Database Configuration

**Required Secrets:**

```
DATABASE_URL=postgresql://username:password@host:port/database
```

### 3. Kubernetes Configuration

**Required Secrets:**

```
KUBE_CONFIG=base64_encoded_kubeconfig_content
```

To get your kubeconfig:

```bash
# Encode your kubeconfig
cat ~/.kube/config | base64 -w 0
```

### 4. Setting Secrets in GitHub

1. Go to your repository → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add each secret with the exact names above

**Environment-specific secrets:**

- Navigate to Settings → Environments
- Create `staging` and `production` environments
- Add the same secrets to each environment

## 🏗️ Workflow Overview

### Main Workflows

1. **CI/CD Pipeline** (`.github/workflows/ci-cd.yml`)

   - Triggered on push to main/develop and PRs
   - Builds, tests, and pushes images to GHCR
   - Includes vulnerability scanning
   - Sends Telegram notifications

2. **Deployment** (`.github/workflows/deploy.yml`)

   - Manual deployment workflow
   - Deploys to Kubernetes
   - Environment-specific protection rules
   - Automatic rollback on failure

3. **PR Validation** (`.github/workflows/pr-validation.yml`)

   - Optimized for PR checks
   - Only runs necessary tests based on changes
   - Provides PR summary comments

4. **Security Scanning** (`.github/workflows/security.yml`)

   - Weekly security scans
   - CodeQL, dependency, and container scanning
   - Alerts on security issues

5. **Cleanup** (`.github/workflows/cleanup.yml`)
   - Weekly cleanup of old container images
   - Keeps latest 10 versions

## 📦 Container Registry Setup

The pipeline uses GitHub Container Registry (GHCR) by default:

1. **Enable GHCR** in your repository:

   - Go to Settings → Actions → General
   - Under "Workflow permissions", select "Read and write permissions"

2. **Images are automatically pushed to:**
   - `ghcr.io/your-username/your-repo/backend`
   - `ghcr.io/your-username/your-repo/frontend`

## 🛡️ Security Features

### Vulnerability Scanning

- **Trivy**: Container image scanning
- **CodeQL**: Static code analysis
- **TruffleHog**: Secret scanning
- **Dependency Check**: Dependency vulnerability scanning

### Security Policies

- **Minimal permissions**: Each job only gets necessary permissions
- **Secret masking**: Secrets are automatically masked in logs
- **Environment protection**: Production requires manual approval
- **Branch protection**: Automatic security checks

## 🚀 Deployment Process

### Automatic Deployment (CI/CD)

1. Push to `main` or `develop` branch
2. Pipeline automatically builds and pushes images
3. Images are tagged with branch name and commit SHA

### Manual Deployment

1. Go to Actions → Deploy to Kubernetes
2. Click "Run workflow"
3. Select environment (staging/production)
4. Enter image tag to deploy
5. Workflow will:
   - Deploy to Kubernetes
   - Wait for rollout completion
   - Run smoke tests
   - Send Telegram notification
   - Auto-rollback on failure

## 📊 Optimization Features

### Speed Optimizations

- **Change detection**: Only builds/tests changed components
- **Docker layer caching**: GitHub Actions cache for faster builds
- **Parallel jobs**: Backend and frontend build in parallel
- **Conditional execution**: Skips unnecessary steps

### Resource Efficiency

- **Multi-platform builds**: AMD64 and ARM64 support
- **Optimized images**: Multi-stage Docker builds
- **Cache management**: Automatic cleanup of old caches

## 📱 Telegram Notifications

You'll receive notifications for:

### ✅ Success Messages

- Build and push completion
- Deployment success
- Security scan completion

### ❌ Failure Alerts

- Build failures
- Test failures
- Deployment failures
- Security vulnerabilities found

### 🔄 Status Updates

- Rollback notifications
- Cleanup completion

### Example Message Format

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

## 🔒 Environment Protection Rules

### Staging Environment

- **Branches**: `develop`, `main`
- **Reviewers**: Staging approvers
- **Wait time**: 5 minutes
- **Auto-approve**: Disabled

### Production Environment

- **Branches**: `main` only
- **Reviewers**: Production approvers + Security team
- **Wait time**: 15 minutes
- **Self-review**: Prevented
- **Auto-approve**: Disabled

## 🏃‍♂️ Running the Pipeline

### First Time Setup

1. Complete all secret configuration
2. Push to `develop` branch to test staging pipeline
3. Create PR to `main` to test PR validation
4. Merge to `main` to test production pipeline

### Regular Development Workflow

```bash
# Development
git checkout develop
git commit -m "feat: new feature"
git push origin develop
# → Triggers build and potential staging deployment

# Production release
git checkout main
git merge develop
git push origin main
# → Triggers build and production-ready images

# Deploy to production
# Use GitHub Actions web interface for manual deployment
```

## 🐛 Troubleshooting

### Common Issues

1. **Secret not found errors**

   ```
   Error: Secret TELEGRAM_BOT_TOKEN not found
   ```

   - Check secret names (case-sensitive)
   - Verify secrets are set in the correct environment

2. **Docker build failures**

   ```
   Error: failed to solve: process "/bin/sh -c bun install" did not complete
   ```

   - Check Dockerfile syntax
   - Verify workspace dependencies are correct

3. **Kubernetes deployment failures**

   ```
   Error: unable to recognize "k8s/backend-deployment.yaml"
   ```

   - Verify KUBE_CONFIG is valid and base64 encoded
   - Check cluster connectivity

4. **Telegram notifications not working**
   ```
   Error: Bad Request: chat not found
   ```
   - Verify TELEGRAM_CHAT_ID is correct
   - Ensure bot is added to the chat/group

### Debug Commands

```bash
# Test Telegram bot locally
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage" \
  -H "Content-Type: application/json" \
  -d '{"chat_id": "<YOUR_CHAT_ID>", "text": "Test message"}'

# Validate kubeconfig
echo "YOUR_BASE64_KUBE_CONFIG" | base64 -d > /tmp/kubeconfig
kubectl --kubeconfig=/tmp/kubeconfig cluster-info

# Test Docker build locally
docker build -f apps/backend/Dockerfile -t test-backend .
docker build -f apps/frontend/Dockerfile -t test-frontend .
```

### Monitoring

#### GitHub Actions Logs

- Go to Actions tab in your repository
- Click on any workflow run to see detailed logs
- Each job shows execution time and status

#### Security Alerts

- Repository → Security tab
- Check Code scanning alerts
- Review Dependabot alerts

#### Container Images

- Repository → Packages tab
- View all published images
- Check image sizes and tags

## 📈 Performance Metrics

### Typical Build Times

- **PR Validation**: 3-5 minutes
- **Full CI/CD**: 8-12 minutes
- **Security Scan**: 10-15 minutes
- **Deployment**: 5-8 minutes

### Optimization Tips

1. **Use .dockerignore**: Reduce build context size
2. **Layer ordering**: Put frequently changing files last
3. **Multi-stage builds**: Minimize final image size
4. **Parallel execution**: Use matrix builds when possible

## 🔄 Maintenance

### Weekly Tasks

- Review security scan results
- Check cleanup job completion
- Update dependencies via Dependabot

### Monthly Tasks

- Review and rotate secrets if needed
- Update action versions
- Review and optimize workflow performance

### Quarterly Tasks

- Review environment protection rules
- Update security policies
- Performance optimization review

---

## 🆘 Getting Help

If you encounter issues:

1. Check the troubleshooting section above
2. Review GitHub Actions logs for detailed error messages
3. Verify all secrets are correctly configured
4. Test components individually (Docker builds, Kubernetes connectivity, etc.)
5. Check if the issue is environment-specific (staging vs production)

The pipeline is designed to be robust and provide clear error messages. Most issues are related to configuration rather than the workflows themselves.
