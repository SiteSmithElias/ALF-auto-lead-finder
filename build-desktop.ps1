$ErrorActionPreference = "Stop"

$root = $PSScriptRoot
Set-Location $root

Write-Host "Building frontend..."
Push-Location (Join-Path $root "frontend")
try {
    npm run build
}
finally {
    Pop-Location
}

$browserPath = Join-Path $root ".playwright-browsers"
if (-not (Test-Path $browserPath)) {
    New-Item -ItemType Directory -Path $browserPath | Out-Null
}

$env:PLAYWRIGHT_BROWSERS_PATH = $browserPath

Write-Host "Installing Playwright Chromium into $browserPath ..."
python -m playwright install chromium

Write-Host "Building ALF desktop executable..."
python -m PyInstaller --noconfirm --clean (Join-Path $root "ALF.spec")
