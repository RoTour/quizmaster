#!/bin/bash
set -e

# Load environment variables from .env
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

echo "🚀 Starting deployment..."

# Build and push Docker image
echo "📦 Building and pushing Docker image..."
docker compose build --push

# Trigger Coolify deployment
echo "🚀 Triggering Coolify deployment..."
if [ -z "$COOLIFY_WEBHOOK_URL" ] || [ -z "$COOLIFY_DEPLOY_API_KEY" ]; then
    echo "❌ Error: COOLIFY_WEBHOOK_URL or COOLIFY_DEPLOY_API_KEY not set."
    exit 1
fi

curl "$COOLIFY_WEBHOOK_URL" \
    --header "Authorization: Bearer $COOLIFY_DEPLOY_API_KEY" \
    --header 'Content-Type: application/json'

echo ""
echo "✅ Deployment triggered successfully!"
