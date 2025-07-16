#!/bin/bash

set -e

echo "🏗️  Building Crypto Exchange Project..."

echo "📦 Building packages..."
bun run build:packages

echo "🖥️  Building backend..."
cd apps/backend
bun run build
cd ../..

echo "🌐 Building frontend..."
cd apps/frontend  
bun run build
cd ../..

echo "✅ Build completed successfully!" 
