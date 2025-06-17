@echo off
echo Starting RSSHub...
echo.

REM Check if Docker is running
docker info > nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Docker is not running. Please start Docker Desktop.
    exit /b 1
)

REM Start the services
echo Starting RSSHub services...
docker-compose up -d

REM Check if services started correctly
echo.
echo Checking if services started correctly...
timeout /t 5 /nobreak > nul
docker-compose ps

echo.
echo RSSHub should now be available at: http://localhost:1200/
echo.
echo To check logs, run: docker-compose logs
echo To stop services, run: stop-rsshub.bat 