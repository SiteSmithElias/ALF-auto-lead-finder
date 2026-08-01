# ALF Desktop Launcher

This repository now supports a desktop-style runtime for ALF:

- A single launcher starts the backend automatically.
- The launcher waits for `/api/health`.
- A `pywebview` window opens to the app.
- Closing the window shuts the backend down.

## Development workflow

Backend:

```powershell
uvicorn main:app --reload
```

Frontend:

```powershell
npm run dev
```

The Vite dev server proxies `/api` and `/uploads` to the backend.

## Packaged workflow

The packaged desktop build is driven by:

- [backend/desktop_launcher.py](backend/desktop_launcher.py)
- [ALF.spec](ALF.spec)
- [build-desktop.ps1](build-desktop.ps1)

The packaged app serves the built frontend from the FastAPI backend and uses local data folders next to the executable:

- `data/alf.db`
- `data/browser_data/`
- `uploads/`

## Build steps

1. Build the frontend with Vite.
2. Install Playwright Chromium into `.playwright-browsers`.
3. Package the launcher with PyInstaller.

The result is a desktop executable that can be started by double-clicking.
