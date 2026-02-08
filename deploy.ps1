# Vercel Deployment - Quick Setup Script (PowerShell)
# Run this after creating your GitHub repository

Write-Host "🚀 Kanban Board - Vercel Deployment Setup" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  IMPORTANT: Create GitHub repository first!" -ForegroundColor Yellow
Write-Host "   Go to: https://github.com/new" -ForegroundColor Yellow
Write-Host "   Repository name: kanban-board" -ForegroundColor Yellow
Write-Host "   Make it Public or Private" -ForegroundColor Yellow
Write-Host "   DO NOT initialize with README" -ForegroundColor Yellow
Write-Host ""

$created = Read-Host "Have you created the GitHub repository? (y/n)"

if ($created -ne "y" -and $created -ne "Y") {
    Write-Host "❌ Please create the GitHub repository first, then run this script again." -ForegroundColor Red
    exit
}

Write-Host ""
$github_username = Read-Host "Enter your GitHub username"
Write-Host ""

if ([string]::IsNullOrWhiteSpace($github_username)) {
    Write-Host "❌ GitHub username cannot be empty!" -ForegroundColor Red
    exit
}

Write-Host "📦 Setting up Git remote..." -ForegroundColor Green
git remote add origin "https://github.com/$github_username/kanban-board.git"

Write-Host "🔀 Setting main branch..." -ForegroundColor Green
git branch -M main

Write-Host "⬆️  Pushing to GitHub..." -ForegroundColor Green
git push -u origin main

Write-Host ""
Write-Host "✅ Code pushed to GitHub successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Go to: https://vercel.com/new"
Write-Host "2. Import your repository: $github_username/kanban-board"
Write-Host "3. Framework: Vite"
Write-Host "4. Root Directory: ./"
Write-Host "5. Output Directory: client/dist"
Write-Host "6. Add Environment Variable:"
Write-Host "   Name: MONGO_URI"
Write-Host "   Value: mongodb+srv://mdgazisahil:Gazisahil725492@cluster0.puuzwa3.mongodb.net/?appName=Cluster0"
Write-Host "7. Click Deploy!"
Write-Host ""
Write-Host "🎉 Your app will be live in 2-3 minutes!" -ForegroundColor Green
Write-Host ""
Write-Host "Press any key to open Vercel in browser..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
Start-Process "https://vercel.com/new"
