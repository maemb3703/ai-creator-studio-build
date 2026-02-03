#!/bin/bash

# AI Creator Studio - Build Script
# This script builds APK using Expo Cloud

set -e

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║         AI Creator Studio - APK Build Script                  ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Check if EAS CLI is installed
if ! command -v eas &> /dev/null; then
    echo "📦 Installing EAS CLI..."
    npm install -g eas-cli
fi

echo "✓ EAS CLI is ready"
echo ""

# Check if logged in
echo "🔐 Checking Expo login status..."
if ! eas whoami &> /dev/null; then
    echo "❌ Not logged in to Expo"
    echo "📝 Please run: eas login"
    echo "   Email: maemb3703@gmail.com"
    echo "   Password: Mm0810583703"
    exit 1
fi

echo "✓ Already logged in to Expo"
echo ""

# Build APK
echo "🔨 Building APK for Android..."
echo "   This will take 10-15 minutes..."
echo ""

eas build --platform android

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  ✅ Build completed successfully!                             ║"
echo "║  📱 Download your APK from the link above                     ║"
echo "║  📲 Then install it on your Android phone                     ║"
echo "╚════════════════════════════════════════════════════════════════╝"
