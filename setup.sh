#!/bin/bash

# BMA Motors - Quick Setup Script for Linux/Mac

echo "🚀 BMA Motors - Kiire seadistamine"
echo "===================================="

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker ei ole paigaldatud. Palun paigalda Docker Desktop."
    exit 1
fi

echo "✅ Docker leitud"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js ei ole paigaldatud. Palun paigalda Node.js 18+."
    exit 1
fi

echo "✅ Node.js leitud: $(node --version)"

# Start Docker Compose
echo ""
echo "📦 Käivitan Docker konteineri..."
docker-compose up -d mariadb

echo ""
echo "⏳ Ootan 15 sekundit, kuni andmebaas käivitub..."
sleep 15

# Backend setup
echo ""
echo "🔧 Seadistan backend..."
cd backend
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "✅ .env fail loodud"
fi

if [ ! -d "node_modules" ]; then
    npm install
    echo "✅ Backend dependencies paigaldatud"
fi

# Generate admin password
echo ""
echo "🔐 Genereerin admin parooli hash..."
node src/utils/generatePasswordHash.js <<< "Admin123!"

cd ..

# Frontend setup
echo ""
echo "🎨 Seadistan frontend..."
cd frontend

if [ ! -d "node_modules" ]; then
    npm install
    echo "✅ Frontend dependencies paigaldatud"
fi

cd ..

echo ""
echo "✅ Seadistamine lõpetatud!"
echo ""
echo "🎯 Järgmised sammud:"
echo "1. Käivita backend:  cd backend && npm run dev"
echo "2. Käivita frontend: cd frontend && npm run dev"
echo "3. Ava brauser:      http://localhost:3000"
echo ""
echo "📚 Rohkem infot:     cat README.md"
