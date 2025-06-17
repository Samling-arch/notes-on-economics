@echo off
color 0A
:menu
cls
echo ===================================
echo         RSSHub 部署与使用菜单
echo ===================================
echo.
echo  1. 查看部署指南
echo  2. 下载 Docker Desktop
echo  3. 启动 RSSHub 服务
echo  4. 停止 RSSHub 服务
echo  5. 检查 RSSHub 状态
echo  6. 查看 RSS 阅读器指南
echo  7. 查看故障排除指南
echo  8. 访问 RSSHub 主页
echo  9. 退出
echo.
echo ===================================
echo.

set /p choice=请选择操作 (1-9): 

if "%choice%"=="1" goto guide
if "%choice%"=="2" goto download
if "%choice%"=="3" goto start
if "%choice%"=="4" goto stop
if "%choice%"=="5" goto check
if "%choice%"=="6" goto readers
if "%choice%"=="7" goto troubleshoot
if "%choice%"=="8" goto homepage
if "%choice%"=="9" goto end

echo 无效的选择，请重新输入！
timeout /t 2 >nul
goto menu

:guide
cls
echo 正在打开部署指南...
start "" "README_FIRST.md"
timeout /t 2 >nul
goto menu

:download
cls
echo 正在运行 Docker Desktop 下载脚本...
call download-docker.bat
goto menu

:start
cls
echo 正在启动 RSSHub 服务...
call start-rsshub.bat
timeout /t 2 >nul
goto menu

:stop
cls
echo 正在停止 RSSHub 服务...
call stop-rsshub.bat
timeout /t 2 >nul
goto menu

:check
cls
echo 正在检查 RSSHub 状态...
call check-status.bat
pause
goto menu

:readers
cls
echo 正在打开 RSS 阅读器指南...
start "" "rss-readers-guide.md"
timeout /t 2 >nul
goto menu

:troubleshoot
cls
echo 正在打开故障排除指南...
start "" "troubleshooting.md"
timeout /t 2 >nul
goto menu

:homepage
cls
echo 正在打开 RSSHub 主页...
start "" "http://localhost:1200/"
timeout /t 2 >nul
goto menu

:end
cls
echo 感谢使用 RSSHub 部署工具！
echo.
echo 再见！
timeout /t 2 >nul
exit 