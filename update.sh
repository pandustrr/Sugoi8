#!/bin/bash

# Sugoi 8 Management - Update Script
# Usage: ./update.sh

# Get the script's directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

echo "------------------------------------------"
echo "🚀 SUGOI 8 - STARTING UPDATE PROCESS"
echo "------------------------------------------"

# 1. Pull from Git
echo "📥 Step 1: Pulling latest changes from Git..."
git pull origin sugoi-pandu

# 2. Update Composer
echo "📦 Step 2: Optimizing Composer dependencies..."
# composer install --no-interaction --prefer-dist --optimize-autoloader # Uncomment if you update composer.json

# 3. Update NPM & Build
echo "🏗️ Step 3: Building frontend assets..."
npm install
npm run build

# 4. Migrate Database
echo "🗄️ Step 4: Running database migrations..."
php artisan migrate --force

# 5. Optimize Laravel
echo "🧹 Step 5: Clearing & Optimizing cache..."
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "------------------------------------------"
echo "✅ UPDATE COMPLETE! Website is now up to date."
echo "------------------------------------------"
