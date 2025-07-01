@echo off
chcp 65001 >nul
cd /d "E:\OB\Rainbell0-Keep-learning - university"

echo [%date% %time%] Starting daily learning report generation...

for /f %%i in ('powershell -Command "Get-Date -Format yyyy-MM-dd"') do set today=%%i
echo [%date% %time%] Current date: %today%

set template_file=大二下\每日学习自动记录器.md
set report_file=大二下\每日学习报告_%today%.md

if exist "%template_file%" (
    echo [%date% %time%] Template file found: %template_file%
    
    if exist "%report_file%" (
        echo [%date% %time%] Report already exists: %report_file%
        echo [%date% %time%] Task completed - no action needed
    ) else (
        copy "%template_file%" "%report_file%" >nul
        if errorlevel 1 (
            echo [%date% %time%] Error: Failed to copy template file
        ) else (
            echo [%date% %time%] Generated report: %report_file%
            echo [%date% %time%] Task completed successfully!
        )
    )
) else (
    echo [%date% %time%] Error: Template file not found: %template_file%
    echo [%date% %time%] Available files in 大二下:
    dir "大二下\*.md" /b
)

echo [%date% %time%] Script finished.
pause 