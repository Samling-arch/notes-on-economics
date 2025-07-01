@echo off
chcp 65001 >nul
cd /d "E:\OB\Rainbell0-Keep-learning - university"

echo [%date% %time%] Starting daily learning report generation... >> daily_report.log

for /f %%i in ('powershell -Command "Get-Date -Format yyyy-MM-dd"') do set today=%%i
echo [%date% %time%] Current date: %today% >> daily_report.log

set template_file=大二下\每日学习自动记录器.md
set report_file=大二下\每日学习报告_%today%.md

if exist "%template_file%" (
    echo [%date% %time%] Template file found: %template_file% >> daily_report.log
    
    if exist "%report_file%" (
        echo [%date% %time%] Report already exists: %report_file% >> daily_report.log
        echo [%date% %time%] Task completed - no action needed >> daily_report.log
    ) else (
        copy "%template_file%" "%report_file%" >nul
        if errorlevel 1 (
            echo [%date% %time%] Error: Failed to copy template file >> daily_report.log
        ) else (
            echo [%date% %time%] Generated report: %report_file% >> daily_report.log
            echo [%date% %time%] Task completed successfully! >> daily_report.log
        )
    )
) else (
    echo [%date% %time%] Error: Template file not found: %template_file% >> daily_report.log
    echo [%date% %time%] Available files in 大二下: >> daily_report.log
    dir "大二下\*.md" /b >> daily_report.log
)

echo [%date% %time%] Script finished. >> daily_report.log 