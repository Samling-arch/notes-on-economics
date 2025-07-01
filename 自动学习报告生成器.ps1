# Daily Learning Report Generator
# Generate daily learning progress report at 10:00 AM
# Save Location: da-er-xia folder

param(
    [string]$VaultPath = "E:\OB\Rainbell0-Keep-learning - university"
)

function Write-Log {
    param([string]$Message)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-Host "[$timestamp] $Message"
}

Write-Log "Starting daily learning report generation..."

try {
    # Set working directory
    if (Test-Path $VaultPath) {
        Set-Location $VaultPath
        Write-Log "Working directory: $VaultPath"
    } else {
        throw "Directory not found: $VaultPath"
    }
    
    # Get current date
    $today = Get-Date -Format "yyyy-MM-dd"
    Write-Log "Current date: $today"
    
    # File paths - using forward slashes for better compatibility
    $templateFile = "大二下/每日学习自动记录器.md"
    $reportFile = "大二下/每日学习报告_$today.md"
    
    # Check if report already exists
    if (Test-Path $reportFile) {
        Write-Log "Report already exists: $reportFile"
        Write-Log "Task completed"
        exit 0
    }
    
    # Check if template exists
    if (!(Test-Path $templateFile)) {
        Write-Log "Looking for template file: $templateFile"
        
        # Try alternative path with backslashes
        $templateFile = "大二下\每日学习自动记录器.md"
        if (!(Test-Path $templateFile)) {
            throw "Template file not found in either path format"
        }
    }
    
    Write-Log "Template found: $templateFile"
    
    # Copy template to create new report
    Copy-Item $templateFile $reportFile
    Write-Log "Generated report: $reportFile"
    
    # Show file size
    $fileSize = (Get-Item $reportFile).Length
    Write-Log "File size: $([math]::Round($fileSize/1KB, 2)) KB"
    
    Write-Log "Task completed successfully!"
    
} catch {
    Write-Log "Error: $($_.Exception.Message)"
    
    # Log error to file
    $errorLog = "error_log.txt"
    $errorMsg = "$(Get-Date): $($_.Exception.Message)"
    Add-Content -Path $errorLog -Value $errorMsg
    
    exit 1
}

# Usage:
# Manual: .\自动学习报告生成器.ps1
# Scheduled: schtasks /create /tn "DailyReport" /tr "powershell.exe -ExecutionPolicy Bypass -File \"`$PWD\自动学习报告生成器.ps1\"" /sc daily /st 10:00 