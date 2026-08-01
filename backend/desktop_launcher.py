from __future__ import annotations

import argparse
import os
import socket
import subprocess
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

from app_paths import ensure_runtime_directories


HOST = "127.0.0.1"


def get_free_port() -> int:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.bind((HOST, 0))
        return sock.getsockname()[1]


def wait_for_health(port: int, timeout_seconds: int = 45) -> None:
    url = f"http://{HOST}:{port}/api/health"
    deadline = time.time() + timeout_seconds
    last_error: Exception | None = None

    while time.time() < deadline:
        try:
            with urllib.request.urlopen(url, timeout=2) as response:
                if response.status == 200:
                    return
        except (urllib.error.URLError, TimeoutError, OSError) as exc:
            last_error = exc
            time.sleep(0.5)

    raise RuntimeError(f"Backend did not start in time: {last_error}")


def start_backend_process(port: int) -> subprocess.Popen[str]:
    ensure_runtime_directories()

    if getattr(sys, "frozen", False):
        command = [sys.executable, "--serve", "--port", str(port)]
    else:
        command = [
            sys.executable,
            str(Path(__file__).resolve()),
            "--serve",
            "--port",
            str(port),
        ]

    creationflags = 0
    if os.name == "nt":
        creationflags = subprocess.CREATE_NO_WINDOW

    return subprocess.Popen(
        command,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        stdin=subprocess.DEVNULL,
        creationflags=creationflags,
    )


def serve_backend(port: int) -> None:
    import uvicorn

    from main import app

    uvicorn.run(
        app,
        host=HOST,
        port=port,
        log_level="warning",
        access_log=False,
    )


def launch_desktop_app() -> None:
    try:
        import webview
    except ImportError as exc:
        raise SystemExit(
            "pywebview is required to run the desktop launcher."
        ) from exc

    port = get_free_port()
    backend_process = start_backend_process(port)

    try:
        wait_for_health(port)
        webview.create_window(
            "ALF",
            f"http://{HOST}:{port}/dashboard",
            width=1440,
            height=1000,
            min_size=(1200, 800),
        )
        webview.start(debug=False)
    except Exception:
        if backend_process.poll() is None:
            backend_process.terminate()
            try:
                backend_process.wait(timeout=10)
            except subprocess.TimeoutExpired:
                backend_process.kill()
        raise
    finally:
        if backend_process.poll() is None:
            backend_process.terminate()
            try:
                backend_process.wait(timeout=10)
            except subprocess.TimeoutExpired:
                backend_process.kill()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(add_help=True)
    parser.add_argument(
        "--serve",
        action="store_true",
        help="Run the FastAPI backend only.",
    )
    parser.add_argument(
        "--port",
        type=int,
        default=8000,
        help="Port used by the backend server.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()

    if args.serve:
        serve_backend(args.port)
        return

    launch_desktop_app()


if __name__ == "__main__":
    main()
