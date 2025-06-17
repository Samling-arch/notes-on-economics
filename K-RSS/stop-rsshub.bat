@echo off
echo Stopping RSSHub...
echo.

REM Check if Docker is running
docker info > nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Docker is not running. Please start Docker Desktop.
    exit /b 1
)

REM Stop the services
echo Stopping RSSHub services...
docker-compose down

echo.
echo RSSHub services have been stopped.
echo.
echo To start services again, run: start-rsshub.bat
echo. 