#!/bin/bash

# Simple deployment script for workshop demonstration
# In a real scenario, this would deploy to actual infrastructure

ENVIRONMENT=$1

if [ -z "$ENVIRONMENT" ]; then
    echo "❌ Error: Environment not specified"
    echo "Usage: $0 <staging|production>"
    exit 1
fi

echo "🚀 Starting deployment to $ENVIRONMENT..."
echo "================================================"

# Simulate pre-deployment checks
echo "📋 Running pre-deployment checks..."
sleep 2

# Check if environment is valid
if [ "$ENVIRONMENT" != "staging" ] && [ "$ENVIRONMENT" != "production" ]; then
    echo "❌ Error: Invalid environment '$ENVIRONMENT'"
    echo "Valid environments: staging, production"
    exit 1
fi

# Simulate deployment steps
echo "📦 Preparing deployment package..."
sleep 1

echo "🔄 Deploying to $ENVIRONMENT environment..."
sleep 3

echo "🔧 Configuring environment variables..."
sleep 1

echo "🏥 Running health checks..."
sleep 2

# Different behavior for different environments
if [ "$ENVIRONMENT" = "production" ]; then
    echo "🔒 Running additional production safety checks..."
    sleep 2
    echo "📊 Updating monitoring dashboards..."
    sleep 1
fi

echo "✅ Deployment to $ENVIRONMENT completed successfully!"
echo "================================================"
echo "🌐 Application URL: https://$ENVIRONMENT.sliit-workshop.example.com"
echo "📊 Monitoring: https://monitoring.sliit-workshop.example.com/$ENVIRONMENT"
echo "📝 Logs: https://logs.sliit-workshop.example.com/$ENVIRONMENT"

exit 0