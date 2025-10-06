# BMA Motors - Quick Setup Script for Windows PowerShell

Write-Host "🚀 BMA Motors - Kiire seadistamine" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Check Docker
$dockerVersion = docker --version 2>$null
if (-not $dockerVersion) {
    Write-Host "❌ Docker ei ole paigaldatud. Palun paigalda Docker Desktop." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Docker leitud: $dockerVersion" -ForegroundColor Green

# Check Node.js
$nodeVersion = node --version 2>$null
if (-not $nodeVersion) {
    Write-Host "❌ Node.js ei ole paigaldatud. Palun paigalda Node.js 18+." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Node.js leitud: $nodeVersion" -ForegroundColor Green

# Start Docker Compose
Write-Host ""
Write-Host "📦 Käivitan Docker konteineri..." -ForegroundColor Yellow
docker-compose up -d mariadb

Write-Host ""
Write-Host "⏳ Ootan 15 sekundit, kuni andmebaas käivitub..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

# Backend setup
Write-Host ""
Write-Host "🔧 Seadistan backend..." -ForegroundColor Yellow
Set-Location backend

if (-not (Test-Path ".env")) {
    Copy-Item .env.example .env
    Write-Host "✅ .env fail loodud" -ForegroundColor Green
}

if (-not (Test-Path "node_modules")) {
    npm install
    Write-Host "✅ Backend dependencies paigaldatud" -ForegroundColor Green
}

# Generate admin password hash
Write-Host ""
Write-Host "🔐 Admin parooli hash genereerimine..." -ForegroundColor Yellow
Write-Host "Palun kasuta: node src/utils/generatePasswordHash.js" -ForegroundColor Cyan

Set-Location ..

# Frontend setup
Write-Host ""
Write-Host "🎨 Seadistan frontend..." -ForegroundColor Yellow
Set-Location frontend

if (-not (Test-Path "node_modules")) {
    npm install
    Write-Host "✅ Frontend dependencies paigaldatud" -ForegroundColor Green
}

Set-Location ..

Write-Host ""
Write-Host "✅ Seadistamine lõpetatud!" -ForegroundColor Green
Write-Host ""
Write-Host "🎯 Järgmised sammud:" -ForegroundColor Cyan
Write-Host "1. Genereeri admin parool:  cd backend; node src/utils/generatePasswordHash.js"
Write-Host "2. Käivita backend:         cd backend; npm run dev"
Write-Host "3. Käivita frontend:        cd frontend; npm run dev"
Write-Host "4. Ava brauser:             http://localhost:3000"
Write-Host ""
Write-Host "📚 Rohkem infot:            Get-Content README.md" -ForegroundColor Cyan
