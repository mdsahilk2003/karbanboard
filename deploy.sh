#!/bin/bash
# Vercel Deployment - Quick Setup Script
# Run this after creating your GitHub repository

echo "🚀 Kanban Board - Vercel Deployment Setup"
echo "=========================================="
echo ""
echo "⚠️  IMPORTANT: Create GitHub repository first!"
echo "   Go to: https://github.com/new"
echo "   Repository name: kanban-board"
echo "   Make it Public or Private"
echo "   DO NOT initialize with README"
echo ""
read -p "Have you created the GitHub repository? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "❌ Please create the GitHub repository first, then run this script again."
    exit 1
fi

echo ""
read -p "Enter your GitHub username: " github_username
echo ""

if [ -z "$github_username" ]
then
    echo "❌ GitHub username cannot be empty!"
    exit 1
fi

echo "📦 Setting up Git remote..."
git remote add origin "https://github.com/$github_username/kanban-board.git"

echo "🔀 Setting main branch..."
git branch -M main

echo "⬆️  Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Code pushed to GitHub successfully!"
echo ""
echo "🌐 Next Steps:"
echo "1. Go to: https://vercel.com/new"
echo "2. Import your repository: $github_username/kanban-board"
echo "3. Framework: Vite"
echo "4. Root Directory: ./"
echo "5. Output Directory: client/dist"
echo "6. Add Environment Variable:"
echo "   Name: MONGO_URI"
echo "   Value: mongodb+srv://mdgazisahil:Gazisahil725492@cluster0.puuzwa3.mongodb.net/?appName=Cluster0"
echo "7. Click Deploy!"
echo ""
echo "🎉 Your app will be live in 2-3 minutes!"
