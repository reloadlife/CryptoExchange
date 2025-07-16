#!/bin/bash

set -e

echo "🚀 Deploying Crypto Exchange to Kubernetes..."

echo "📦 Creating namespace..."
kubectl apply -f k8s/namespace.yaml

echo "🔐 Creating secrets..."
if [ -z "$DATABASE_URL" ]; then
  echo "⚠️  Warning: DATABASE_URL environment variable not set"
  echo "   You'll need to update the secret manually:"
  echo "   kubectl create secret generic crypto-exchange-secrets --namespace=crypto-exchange --from-literal=database-url=<your-database-url>"
else
  kubectl create secret generic crypto-exchange-secrets \
    --namespace=crypto-exchange \
    --from-literal=database-url="$DATABASE_URL" \
    --dry-run=client -o yaml | kubectl apply -f -
fi

echo "🖥️  Deploying backend..."
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml

echo "🌐 Deploying frontend..."
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml

echo "🌍 Setting up ingress..."
kubectl apply -f k8s/ingress.yaml

echo "✅ Deployment completed!"
echo ""
echo "📊 Check deployment status:"
echo "   kubectl get pods -n crypto-exchange"
echo "   kubectl get services -n crypto-exchange"
echo "   kubectl get ingress -n crypto-exchange"
echo ""
echo "📝 To update your hosts file for local testing:"
echo "   echo '127.0.0.1 crypto-exchange.example.com api.crypto-exchange.example.com' >> /etc/hosts" 
