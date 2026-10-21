@echo off
REM CloudSpot APK Builder Script for Windows
REM Usage: build-apk.bat

echo.
echo  ========================================
echo   CloudSpot APK Builder
echo  ========================================
echo.

echo [1/5] Installing dependencies...
call npm install
call npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/splash-screen @capacitor/status-bar
echo [OK] Dependencies installed
echo.

echo [2/5] Building web app...
call npm run build
echo [OK] Web app built
echo.

if not exist "android" (
    echo [3/5] Adding Android platform...
    call npx cap add android
    echo [OK] Android platform added
) else (
    echo [3/5] Android platform exists, skipping...
)
echo.

echo [4/5] Syncing web assets to Android...
call npx cap sync android
echo [OK] Assets synced
echo.

echo [5/5] Building APK...
cd android
call gradlew.bat assembleDebug
cd ..
echo.

if exist "android\app\build\outputs\apk\debug\app-debug.apk" (
    echo ========================================
    echo   SUCCESS! APK built successfully!
    echo ========================================
    echo.
    echo  APK Location: android\app\build\outputs\apk\debug\app-debug.apk
    echo.
    echo  To install on your Android device:
    echo    1. Transfer the APK to your phone
    echo    2. Enable 'Install from Unknown Sources'
    echo    3. Tap the APK file to install
    echo.
    echo  Or install via ADB:
    echo    adb install android\app\build\outputs\apk\debug\app-debug.apk
) else (
    echo [WARNING] APK not found at expected location
    echo Check android\app\build\outputs\apk\ for the APK file
)

echo.
pause
