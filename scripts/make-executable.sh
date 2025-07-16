#!/bin/bash

echo "🔧 Making all scripts executable..."
echo "==================================="

# Make build scripts executable
chmod +x scripts/build.sh
chmod +x scripts/clean.sh
chmod +x scripts/docker-build.sh

# Make deployment scripts executable
chmod +x scripts/k8s-deploy.sh
chmod +x scripts/k8s-remove.sh

# Make setup scripts executable
chmod +x scripts/setup-telegram.sh
chmod +x scripts/make-executable.sh

echo "✅ All scripts are now executable!"
echo ""

echo "📋 Available Scripts:"
echo "--------------------"
echo "🏗️  Build Scripts:"
echo "   ./scripts/build.sh           - Build packages and apps in correct order"
echo "   ./scripts/clean.sh           - Clean all build artifacts"
echo "   ./scripts/docker-build.sh    - Build Docker images"
echo ""
echo "🚀 Deployment Scripts:"
echo "   ./scripts/k8s-deploy.sh      - Deploy to Kubernetes"
echo "   ./scripts/k8s-remove.sh      - Remove from Kubernetes"
echo ""
echo "⚙️  Setup Scripts:"
echo "   ./scripts/setup-telegram.sh  - Set up Telegram notifications"
echo ""

echo "🔍 Validating Project Structure..."
echo "----------------------------------"

# Check if required files exist
REQUIRED_FILES=(
    ".github/workflows/ci-cd.yml"
    ".github/workflows/deploy.yml"
    ".github/workflows/security.yml"
    ".github/workflows/cleanup.yml"
    ".github/workflows/pr-validation.yml"
    ".github/dependabot.yml"
    "k8s/namespace.yaml"
    "k8s/backend-deployment.yaml"
    "k8s/frontend-deployment.yaml"
    "k8s/backend-service.yaml"
    "k8s/frontend-service.yaml"
    "k8s/ingress.yaml"
    "Dockerfile"
    "apps/backend/Dockerfile"
    "apps/frontend/Dockerfile"
    ".dockerignore"
    "CI-CD-SETUP.md"
    "DEPLOYMENT.md"
)

echo "Checking required files..."
MISSING_FILES=()

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file (missing)"
        MISSING_FILES+=("$file")
    fi
done

echo ""

if [ ${#MISSING_FILES[@]} -eq 0 ]; then
    echo "🎉 All required files are present!"
else
    echo "⚠️  Missing files detected:"
    for file in "${MISSING_FILES[@]}"; do
        echo "   - $file"
    done
    echo ""
    echo "Please ensure all files are created before proceeding."
fi

echo ""
echo "📖 Next Steps:"
echo "--------------"
echo "1. Run ./scripts/setup-telegram.sh to configure notifications"
echo "2. Set up GitHub secrets (see CI-CD-SETUP.md)"
echo "3. Configure Kubernetes access"
echo "4. Push to GitHub to trigger the CI/CD pipeline"
echo ""
echo "📚 Documentation:"
echo "   - CI-CD-SETUP.md     - Complete CI/CD setup guide"
echo "   - DEPLOYMENT.md      - Deployment and Docker guide"
echo "   - .github/SECURITY.md - Security policy and guidelines" 
