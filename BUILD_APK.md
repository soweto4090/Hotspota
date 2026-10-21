# CloudSpot - Build APK Guide

This guide explains how to convert the CloudSpot web app into an Android APK.

## Prerequisites

1. **Node.js** (v18+) - [Download](https://nodejs.org/)
2. **Android Studio** - [Download](https://developer.android.com/studio)
3. **Java JDK 17** - Included with Android Studio
4. **Android SDK** - Installed via Android Studio

## Quick Start (3 Steps)

### Step 1: Install Dependencies

```bash
# Install Node.js dependencies
npm install

# Install Capacitor CLI and Android platform
npm install @capacitor/core @capacitor/cli @capacitor/android
npm install @capacitor/splash-screen @capacitor/status-bar
```

### Step 2: Build the Web App & Add Android

```bash
# Build the production web app
npm run build

# Initialize Capacitor (first time only)
npx cap add android

# Sync web assets to Android project
npx cap sync android
```

### Step 3: Build the APK

```bash
# Open in Android Studio
npx cap open android

# OR build APK directly from command line:
cd android
./gradlew assembleDebug
# APK will be at: android/app/build/outputs/apk/debug/app-debug.apk
```

## Detailed Instructions

### Setting Up Android Studio

1. Open Android Studio
2. Go to **File → Open** and select the `android` folder
3. Wait for Gradle sync to complete
4. Go to **Build → Build Bundle(s) / APK(s) → Build APK(s)**
5. The APK will be generated at `android/app/build/outputs/apk/debug/app-debug.apk`

### Building a Signed Release APK

For publishing to Google Play Store:

1. Generate a keystore:
```bash
keytool -genkey -v -keystore release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias cloudspot
```

2. Create `android/keystore.properties`:
```properties
storePassword=YOUR_PASSWORD
keyPassword=YOUR_PASSWORD
keyAlias=cloudspot
storeFile=../release-key.jks
```

3. Update `android/app/build.gradle`:
```gradle
android {
    signingConfigs {
        release {
            def keystorePropertiesFile = rootProject.file("keystore.properties")
            def keystoreProperties = new Properties()
            keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
            
            storeFile file(keystoreProperties['storeFile'])
            storePassword keystoreProperties['storePassword']
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt')
        }
    }
}
```

4. Build release APK:
```bash
cd android
./gradlew assembleRelease
# APK at: android/app/build/outputs/apk/release/app-release.apk
```

### Customizing App Icon

Replace the icons in `android/app/src/main/res/`:
- `mipmap-hdpi/ic_launcher.png` (72x72)
- `mipmap-mdpi/ic_launcher.png` (48x48)
- `mipmap-xhdpi/ic_launcher.png` (96x96)
- `mipmap-xxhdpi/ic_launcher.png` (144x144)
- `mipmap-xxxhdpi/ic_launcher.png` (192x192)

Or use the Capacitor assets command:
```bash
npx cap copy android
```

### Adding a Splash Screen

1. Add splash images to `android/app/src/main/res/`:
   - `drawable/splash.png` (for portrait)

2. The splash screen is already configured in `capacitor.config.ts`

## App Features

The CloudSpot APK includes:

- 📊 **Dashboard** - Real-time hotspot stats and network traffic
- 📱 **Devices** - Manage connected devices with search/filter
- 📈 **Monitoring** - CPU, memory, latency charts and alerts
- ⚙️ **Settings** - Configure network, security, guest access
- 🚀 **Setup Guide** - Step-by-step Google Cloud deployment

## Troubleshooting

### Build fails with "SDK location not found"
Create `android/local.properties`:
```properties
sdk.dir=/Users/YOUR_USER/Library/Android/sdk
```

### Gradle sync fails
- Ensure Java 17 is set: `export JAVA_HOME=/path/to/jdk17`
- In Android Studio: **File → Invalidate Caches / Restart**

### App shows blank screen
- Run `npm run build` before `npx cap sync`
- Check browser console in Chrome DevTools for errors

### APK won't install
- Enable "Install from Unknown Sources" in Android settings
- Or sign the APK with a valid key

## Alternative: PWABuilder (No Android Studio Needed)

If you don't want to use Android Studio:

1. Deploy the web app to a URL (e.g., Vercel, Netlify)
2. Go to [pwabuilder.com](https://www.pwabuilder.com)
3. Enter your deployed URL
4. Click **Package for Stores → Android**
5. Download the generated APK

## File Structure

```
cloudspot/
├── src/
│   ├── App.tsx          # All components in one file
│   ├── main.tsx         # Entry point
│   └── index.css        # Styles
├── public/
│   ├── manifest.json    # PWA manifest
│   └── icon.svg         # App icon
├── capacitor.config.ts  # Capacitor configuration
├── BUILD_APK.md         # This guide
├── index.html           # HTML entry
└── package.json         # Dependencies
```

## Support

For issues with Capacitor: https://capacitorjs.com/docs
For Android build issues: https://developer.android.com/studio/build
