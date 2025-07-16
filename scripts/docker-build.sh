#!/bin/bash

set -e

SERVICE=${1:-all}

case $SERVICE in
  "backend")
    echo "🐳 Building backend Docker image..."
    docker build -f apps/backend/Dockerfile -t crypto-exchange-backend:latest .
    ;;
  "frontend")
    echo "🐳 Building frontend Docker image..."
    docker build -f apps/frontend/Dockerfile -t crypto-exchange-frontend:latest .
    ;;
  "all")
    echo "🐳 Building all Docker images..."
    docker build --target backend-runner -t crypto-exchange-backend:latest .
    docker build --target frontend-runner -t crypto-exchange-frontend:latest .
    ;;
  *)
    echo "❌ Unknown service: $SERVICE"
    echo "Usage: $0 [backend|frontend|all]"
    exit 1
    ;;
esac

echo "✅ Docker build completed successfully!" 
