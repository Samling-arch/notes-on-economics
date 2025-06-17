@echo off
echo Downloading Docker Desktop for Windows...
echo.

REM Download Docker Desktop installer
curl -L -o "%TEMP%\Docker Desktop Installer.exe" "https://desktop.docker.com/win/main/amd64/Docker Desktop Installer.exe"

echo.
if %errorlevel% neq 0 (
    echo Failed to download Docker Desktop. Please check your internet connection and try again.
    echo You can also download it manually from https://www.docker.com/products/docker-desktop/
) else (
    echo Docker Desktop installer has been downloaded to: "%TEMP%\Docker Desktop Installer.exe"
    echo.
    echo Please run the installer to install Docker Desktop.
    echo After installation, you can start RSSHub using the start-rsshub.bat script.
    
    echo.
    set /p choice="Would you like to run the installer now? (Y/N): "
    if /i "%choice%"=="Y" (
        echo.
        echo Running Docker Desktop Installer...
        start "" "%TEMP%\Docker Desktop Installer.exe"
    ) else (
        echo.
        echo You can run the installer later from: "%TEMP%\Docker Desktop Installer.exe"
    )
)

echo.
pause 