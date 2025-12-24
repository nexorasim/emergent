# Save as: C:\Scripts\system-cleanup.ps1
# Run as Administrator in PowerShell

Write-Host "=== WINDOWS SYSTEM & ALL APPS CLEAR START ===" -ForegroundColor Cyan

# ---------------------------------
# 1. STOP COMMON PROCESSES
# ---------------------------------
$procs = "chrome","msedge","firefox","node","npm","explorer"
Get-Process $procs -ErrorAction SilentlyContinue | Stop-Process -Force
Write-Host "✔ Running apps stopped"

# ---------------------------------
# 2. WINDOWS TEMP / CACHE
# ---------------------------------
$sysTemps = @("$env:TEMP","C:\Windows\Temp","C:\Windows\Prefetch")
foreach ($t in $sysTemps) {
    if (Test-Path $t) {
        Remove-Item "$t\*" -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "✔ Cleared: $t"
    }
}

# ---------------------------------
# 3. BROWSER FULL CACHE CLEAR
# ---------------------------------
$browserPaths = @(
    "$env:LOCALAPPDATA\Google\Chrome\User Data\Default",
    "$env:LOCALAPPDATA\Microsoft\Edge\User Data\Default",
    "$env:APPDATA\Mozilla\Firefox\Profiles"
)
foreach ($b in $browserPaths) {
    if (Test-Path $b) {
        Get-ChildItem $b -Include Cache*,Code*,GPUCache,Service* -Recurse -ErrorAction SilentlyContinue |
            Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "✔ Browser cache cleared: $b"
    }
}

# ---------------------------------
# 4. MICROSOFT STORE APP CACHE
# ---------------------------------
wsreset.exe
Write-Host "✔ Microsoft Store cache reset"

# ---------------------------------
# 5. WINDOWS UPDATE CACHE
# ---------------------------------
Stop-Service wuauserv,bits -Force
Remove-Item "C:\Windows\SoftwareDistribution" -Recurse -Force -ErrorAction SilentlyContinue
Start-Service wuauserv,bits
Write-Host "✔ Windows Update cache reset"

# ---------------------------------
# 6. ALL APP RUNTIME CACHE
# ---------------------------------
$appCaches = @(
    "$env:LOCALAPPDATA\Packages",
    "$env:LOCALAPPDATA\Temp\Packages"
)
foreach ($a in $appCaches) {
    if (Test-Path $a) {
        Remove-Item "$a\*" -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "✔ App cache cleared: $a"
    }
}

# ---------------------------------
# 7. NETWORK FULL RESET
# ---------------------------------
ipconfig /flushdns | Out-Null
netsh winsock reset | Out-Null
netsh int ip reset | Out-Null
netsh winhttp reset proxy | Out-Null
Write-Host "✔ Network reset complete"

# ---------------------------------
# 8. SYSTEM FILE REPAIR
# ---------------------------------
sfc /scannow
DISM /Online /Cleanup-Image /RestoreHealth

# ---------------------------------
# 9. EVENT LOG CLEAN
# ---------------------------------
wevtutil el | ForEach-Object { wevtutil cl "$_" }
Write-Host "✔ Event logs cleared"

# ---------------------------------
# 10. RESTART EXPLORER
# ---------------------------------
Start-Process explorer.exe

Write-Host "=== FULL SYSTEM & ALL APPS CLEAR COMPLETE ===" -ForegroundColor Green
