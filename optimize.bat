@echo off
chcp 65001 >nul 2>&1

echo.
echo ========================================
echo   Image Optimization Script
echo ========================================
echo.

set CWEBP=script\cwebp.exe
set INPUT_DIR=public\imgs\vr
set OUTPUT_DIR=public\imgs\vr
set QUALITY=75

echo Optimizing VR images (quality: %QUALITY%)...
echo.

set count=0
set saved=0

for %%f in ("%INPUT_DIR%\*.webp") do (
    set /a count+=1
    set "original=%%f"
    set "filename=%%~nxf"
    
    echo Processing: %%~nxf
    echo   Original size: %%~zf bytes
    
    "%CWEBP%" -q %QUALITY% -m 6 "%%f" -o "%OUTPUT_DIR%\%%~nxf" 2>nul
    
    if exist "%OUTPUT_DIR%\%%~nxf" (
        for %%s in ("%OUTPUT_DIR%\%%~nxf") do (
            set /a saved+=%%~zf - %%s
            echo   New size: %%s bytes
        )
    )
    echo.
)

echo ========================================
echo Optimization Complete!
echo   Files processed: %count%
echo   Space saved: ~%saved% bytes
echo ========================================
echo.

pause