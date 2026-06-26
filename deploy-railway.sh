#!/bin/bash

# PisoPilot Railway Deployment Script
# This script helps deploy backend and frontend to Railway using CLI

echo "🚀 PisoPilot Railway Deployment Script"
echo "======================================"

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

# Login to Railway
echo "📝 Logging into Railway..."
railway login

# Select or create project
echo "📦 Selecting Railway project..."
railway project

# Deploy MySQL Database
echo "🗄️  Deploying MySQL Database..."
railway up --service mysql

# Wait for MySQL to be ready
echo "⏳ Waiting for MySQL to be ready..."
sleep 10

# Run schema on MySQL
echo "📋 Running database schema..."
railway run mysql < server/schema.sql

# Deploy Backend
echo "🔧 Deploying Backend..."
railway up --service backend

# Get backend URL
BACKEND_URL=$(railway domain --service backend)
echo "✅ Backend deployed at: $BACKEND_URL"

# Deploy Frontend (optional - comment out if using Vercel)
echo "🎨 Deploying Frontend..."
railway up --service frontend

# Get frontend URL
FRONTEND_URL=$(railway domain --service frontend)
echo "✅ Frontend deployed at: $FRONTEND_URL"

echo ""
echo "✨ Deployment complete!"
echo "Backend URL: $BACKEND_URL"
echo "Frontend URL: $FRONTEND_URL"
echo ""
echo "📝 Don't forget to set VITE_API_BASE_URL=$BACKEND_URL in your frontend environment variables"
