@echo off
chcp 65001 >nul 2>&1

echo.
echo ========================================
echo   Zhou Lu Memorial - VR Tour Deployer
echo ========================================
echo.

echo [1] Deploy to Vercel (Recommended)
echo [2] Local Preview
echo [3] Open QR Code Generator
echo [4] Build Only
echo [0] Exit
echo.

set /p choice="Select option (0-4): "

if "%choice%"=="1" goto deploy
if "%choice%"=="2" goto preview
if "%choice%"=="3" goto qrcode
if "%choice%"=="4" goto build
if "%choice%"=="0" goto end

echo Invalid option
pause
exit /b

:deploy
echo.
echo Starting Vercel deployment...
call "%~dp0deploy.bat"
exit /b

:preview
echo.
echo Installing dependencies...
call npm install
if errorlevel 1 (
    echo Failed to install dependencies
    pause
    exit /b 1
)
echo.
echo Starting local server at http://localhost:5173
echo Press Ctrl+C to stop
echo.
call npm run dev
pause
exit /b

:qrcode
echo.
echo Opening QR Code Generator...
start "" "%~dp0qrcode.html"
exit /b

:build
echo.
echo Installing dependencies...
call npm install
if errorlevel 1 (
    echo Failed to install dependencies
    pause
    exit /b 1
)
echo.
echo Building project...
call npm run build
if errorlevel 1 (
    echo Build failed
    pause
    exit /b 1
)
echo.
echo Build successful! Output: dist/
pause
exit /b

:end
echo.
echo Bye!
exit