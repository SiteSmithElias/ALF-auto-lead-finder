# -*- mode: python ; coding: utf-8 -*-
from pathlib import Path

from PyInstaller.utils.hooks import collect_submodules


ROOT = Path(__file__).resolve().parent
BACKEND_DIR = ROOT / "backend"
FRONTEND_DIST = ROOT / "frontend" / "dist"
PLAYWRIGHT_BROWSERS = ROOT / ".playwright-browsers"

hiddenimports = []
hiddenimports += collect_submodules("webview")
hiddenimports += collect_submodules("playwright")

datas = []
datas.append((str(FRONTEND_DIST), "frontend_dist"))
if PLAYWRIGHT_BROWSERS.exists():
    datas.append((str(PLAYWRIGHT_BROWSERS), "playwright_browsers"))


a = Analysis(
    [str(BACKEND_DIR / "desktop_launcher.py")],
    pathex=[str(BACKEND_DIR)],
    binaries=[],
    datas=datas,
    hiddenimports=hiddenimports,
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
    optimize=0,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name="ALF",
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=False,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)
