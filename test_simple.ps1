Write-Host "Testing PowerShell script..."

$today = Get-Date -Format "yyyy-MM-dd"
Write-Host "Today is: $today"

$templateFile = "大二下\每日学习自动记录器.md"

if (Test-Path $templateFile) {
    Write-Host "Template file found!"
    
    $reportFile = "大二下\每日学习报告_$today.md"
    
    if (Test-Path $reportFile) {
        Write-Host "Report already exists"
    } else {
        Copy-Item $templateFile $reportFile
        Write-Host "Report created successfully!"
    }
} else {
    Write-Host "Template file not found"
    Get-ChildItem "大二下" | Where-Object {$_.Extension -eq ".md"} | ForEach-Object {
        Write-Host "Found: $($_.Name)"
    }
} 