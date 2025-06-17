@echo off
echo Checking RSSHub deployment status...
echo.

REM Check if Docker is running
docker info > nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Docker is not running. Please start Docker Desktop.
    exit /b 1
)

REM Check if RSSHub containers are running
echo Docker is running. Checking RSSHub containers...
docker-compose ps

REM Try to access RSSHub
echo.
echo Trying to access RSSHub...
curl -s -o nul -w "HTTP Status Code: %%{http_code}\n" http://localhost:1200/
if %errorlevel% neq 0 (
    echo Could not connect to RSSHub. Make sure the service is running.
) else (
    echo.
    echo RSSHub documentation is available at: http://localhost:1200/
)

echo.
echo If you encounter any issues, check the logs with: docker-compose logs
echo. 