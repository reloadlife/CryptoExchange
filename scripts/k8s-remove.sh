#!/bin/bash

set -e

echo "🗑️  Removing Crypto Exchange from Kubernetes..."

echo "🌍 Removing ingress..."
kubectl delete -f k8s/ingress.yaml --ignore-not-found=true

echo "🌐 Removing frontend..."
kubectl delete -f k8s/frontend-service.yaml --ignore-not-found=true
kubectl delete -f k8s/frontend-deployment.yaml --ignore-not-found=true

echo "🖥️  Removing backend..."
kubectl delete -f k8s/backend-service.yaml --ignore-not-found=true
kubectl delete -f k8s/backend-deployment.yaml --ignore-not-found=true

echo "🔐 Removing secrets..."
kubectl delete secret crypto-exchange-secrets --namespace=crypto-exchange --ignore-not-found=true

echo "📦 Removing namespace..."
kubectl delete -f k8s/namespace.yaml --ignore-not-found=true

echo "✅ Removal completed!" 
