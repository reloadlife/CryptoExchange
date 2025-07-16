#!/bin/bash

set -e

echo "🧹 Cleaning all build artifacts..."

echo "📦 Cleaning packages..."
bun run --filter='@crypto-exchange/*' clean

echo "🖥️  Cleaning backend..."
cd apps/backend
bun run clean
cd ../..

echo "🌐 Cleaning frontend..."
cd apps/frontend
rm -rf .next
cd ../..

echo "🗑️  Removing node_modules..."
rm -rf node_modules
rm -rf packages/*/node_modules
rm -rf apps/*/node_modules

echo "✅ Clean completed successfully!" 
