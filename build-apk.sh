#!/bin/bash
# CloudSpot APK Builder Script
# Usage: ./build-apk.sh

set -e

echo "🔥 CloudSpot APK Builder"
echo "========================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Install dependencies
echo -e "${BLUE}📦 Step 1: Installing dependencies...${NC}"
npm install
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/splash-screen @capacitor/status-bar
echo -e "${GREEN}✅ Dependencies installed${NC}"
echo ""

# Step 2: Build web app
echo -e "${BLUE}🔨 Step 2: Building web app...${NC}"
npm run build
echo -e "${GREEN}✅ Web app built${NC}"
echo ""

# Step 3: Check if Android platform exists
if [ ! -d "android" ]; then
    echo -e "${BLUE}📱 Step 3: Adding Android platform...${NC}"
    npx cap add android
    echo -e "${GREEN}✅ Android platform added${NC}"
else
    echo -e "${YELLOW}📱 Step 3: Android platform already exists, skipping...${NC}"
fi
echo ""

# Step 4: Sync web assets
echo -e "${BLUE}🔄 Step 4: Syncing web assets to Android...${NC}"
npx cap sync android
echo -e "${GREEN}✅ Assets synced${NC}"
echo ""

# Step 5: Build APK
echo -e "${BLUE}📲 Step 5: Building APK...${NC}"
cd android
./gradlew assembleDebug
cd ..
echo -e "${GREEN}✅ APK built successfully!${NC}"
echo ""

# Output location
APK_PATH="android/app/build/outputs/apk/debug/app-debug.apk"
if [ -f "$APK_PATH" ]; then
    APK_SIZE=$(du -h "$APK_PATH" | cut -f1)
    echo -e "${GREEN}🎉 Success!${NC}"
    echo ""
    echo -e "APK Location: ${BLUE}$APK_PATH${NC}"
    echo -e "APK Size: ${YELLOW}$APK_SIZE${NC}"
    echo ""
    echo "To install on your Android device:"
    echo "  1. Transfer the APK to your phone"
    echo "  2. Enable 'Install from Unknown Sources' in Settings"
    echo "  3. Tap the APK file to install"
    echo ""
    echo "Or install via ADB:"
    echo "  adb install $APK_PATH"
else
    echo -e "${YELLOW}⚠️  APK not found at expected location${NC}"
    echo "Check android/app/build/outputs/apk/ for the APK file"
fi
