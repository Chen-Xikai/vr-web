@echo off
chcp 65001 >nul 2>&1

echo.
echo ========================================
echo   Vercel Deployment Script
echo ========================================
echo.

:: Step 1: Check Node.js
echo [1/5] Checking Node.js...
where node >nul 2>&1
if errorlevel 1 (
    echo.
    echo ERROR: Node.js is not installed!
    echo.
    echo Please install Node.js:
    echo   1. Visit https://nodejs.org/
    echo   2. Download LTS version
    echo   3. Install with "Add to PATH" checked
    echo   4. Restart this script
    echo.
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do echo OK: Node.js %%i

:: Step 2: Check npm
echo.
echo [2/5] Checking npm...
where npm >nul 2>&1
if errorlevel 1 (
    echo ERROR: npm not found
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do echo OK: npm %%i

:: Step 3: Install dependencies
echo.
echo [3/5] Installing dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo OK: Dependencies installed

:: Step 4: Build project
echo.
echo [4/5] Building project...
call npm run build
if errorlevel 1 (
    echo ERROR: Build failed
    pause
    exit /b 1
)
echo OK: Build successful

:: Step 5: Check Vercel CLI
echo.
echo [5/5] Checking Vercel CLI...
where vercel >nul 2>&1
if errorlevel 1 (
    echo Vercel CLI not found, installing...
    call npm install -g vercel
    if errorlevel 1 (
        echo ERROR: Failed to install Vercel CLI
        pause
        exit /b 1
    )
    echo OK: Vercel CLI installed
) else (
    echo OK: Vercel CLI found
)

:: Deploy
echo.
echo ========================================
echo   Ready to Deploy!
echo ========================================
echo.
echo Press any key to start deployment...
pause >nul

echo.
echo Deploying to Vercel...
echo.

:: Deploy dist folder directly (faster)
set "DEPLOY_URL="
for /f "tokens=*" %%a in ('vercel deploy dist --yes 2^>^&1') do (
    echo %%a
    echo %%a | findstr /i "https://" >nul && (
        for /f "tokens=2 delims= " %%u in ("%%a") do (
            set "DEPLOY_URL=%%u"
        )
    )
)

:: Check if deployment succeeded
if not defined DEPLOY_URL (
    echo.
    echo ERROR: Deployment failed
    echo.
    echo Possible causes:
    echo   - Not logged in (run: vercel login)
    echo   - Network issue
    echo   - Project config issue
    echo.
    pause
    exit /b 1
)

:: Success
echo.
echo ========================================
echo   Deployment Successful!
echo ========================================
echo.
echo Your site is live at:
echo.
echo   %DEPLOY_URL%
echo.

:: Copy URL to clipboard
echo %DEPLOY_URL% | clip
echo URL copied to clipboard!
echo.

:: Open in browser
echo Opening in browser...
start "" "%DEPLOY_URL%"

:: Open QR code generator with URL parameter
echo Opening QR Code Generator...
timeout /t 2 >nul
start "" "%~dp0qrcode.html?url=%DEPLOY_URL%"

echo.
echo Done!
pause