@echo off
echo.
echo ====================================
echo   Generando Favicons Circulares
echo ====================================
echo.

node generate-circular-favicon.mjs

if %errorlevel% neq 0 (
    echo.
    echo ERROR: No se pudieron generar los favicons
    echo.
    echo Posibles soluciones:
    echo 1. Ejecuta: pnpm install sharp --force
    echo 2. Verifica que existe: src\assets\raydel-avatar.jpg
    echo.
    pause
    exit /b 1
)

echo.
echo ====================================
echo   Favicons generados exitosamente!
echo ====================================
echo.
pause
