from __future__ import annotations

import os
import sys
from pathlib import Path


def is_frozen() -> bool:
    return bool(getattr(sys, "frozen", False))


def get_project_root() -> Path:
    return Path(__file__).resolve().parent.parent


def get_runtime_root() -> Path:
    if is_frozen():
        return Path(sys.executable).resolve().parent

    return get_project_root()


def get_data_dir() -> Path:
    return get_runtime_root() / "data"


def get_database_path() -> Path:
    return get_data_dir() / "alf.db"


def get_database_url() -> str:
    configured = os.getenv("DATABASE_URL")

    if configured:
        return configured

    return f"sqlite:///{get_database_path().resolve().as_posix()}"


def get_uploads_dir() -> Path:
    return get_runtime_root() / "uploads"


def get_browser_data_dir() -> Path:
    return get_data_dir() / "browser_data"


def get_frontend_dist_dir() -> Path:
    if is_frozen() and hasattr(sys, "_MEIPASS"):
        return Path(sys._MEIPASS) / "frontend_dist"

    return get_project_root() / "frontend" / "dist"


def get_playwright_browsers_dir() -> Path:
    if is_frozen() and hasattr(sys, "_MEIPASS"):
        return Path(sys._MEIPASS) / "playwright_browsers"

    return get_project_root() / ".playwright-browsers"


def ensure_runtime_directories() -> None:
    get_data_dir().mkdir(parents=True, exist_ok=True)
    get_uploads_dir().mkdir(parents=True, exist_ok=True)
    get_browser_data_dir().mkdir(parents=True, exist_ok=True)


os.environ.setdefault(
    "PLAYWRIGHT_BROWSERS_PATH",
    str(get_playwright_browsers_dir()),
)
