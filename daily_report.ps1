# Daily Learning Report Generator

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
    if (Test-Path $VaultPath) {
        Set-Location $VaultPath
        Write-Log "Working directory: $VaultPath"
    } else {
        throw "Directory not found: $VaultPath"
    }
    
    $today = Get-Date -Format "yyyy-MM-dd"
    Write-Log "Current date: $today"
    
    $templateFile = "大二下\每日学习自动记录器.md"
    
    if (!(Test-Path $templateFile)) {
        Write-Log "Template not found at: $templateFile"
        
        $files = Get-ChildItem "大二下" | Where-Object {$_.Extension -eq ".md"}
        Write-Log "Available MD files:"
        foreach ($file in $files) {
            Write-Log "  - $($file.Name)"
        }
        
        throw "Template file not found"
    }
    
    Write-Log "Template found: $templateFile"
    
    $reportFileName = "每日学习报告_$today.md"
    $reportFile = "大二下\$reportFileName"
    
    if (Test-Path $reportFile) {
        Write-Log "Report already exists: $reportFileName"
        Write-Log "Task completed - no action needed"
        exit 0
    }
    
    Copy-Item -Path $templateFile -Destination $reportFile
    Write-Log "Generated report: $reportFileName"
    
    $fileSize = (Get-Item $reportFile).Length
    Write-Log "File size: $([math]::Round($fileSize/1KB, 2)) KB"
    
    Write-Log "Task completed successfully!"
    
} catch {
    Write-Log "Error: $($_.Exception.Message)"
    
    $errorLog = "daily_report_error.log"
    $errorMsg = "$(Get-Date): " + $_.Exception.Message
    Add-Content -Path $errorLog -Value $errorMsg -Encoding UTF8
    
    exit 1
} 