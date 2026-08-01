from __future__ import annotations

from contextlib import AbstractContextManager
from pathlib import Path
from typing import Optional

from app_paths import get_browser_data_dir
from playwright.sync_api import BrowserContext, Playwright, sync_playwright


class GoogleMapsBrowser(AbstractContextManager["GoogleMapsBrowser"]):
    def __init__(
        self,
        user_data_dir: str | Path = get_browser_data_dir(),
        headless: bool = False,
        slow_mo: int = 0,
    ) -> None:
        self.user_data_dir = Path(user_data_dir)
        self.headless = headless
        self.slow_mo = slow_mo
        self._playwright: Optional[Playwright] = None
        self._context: Optional[BrowserContext] = None

    def open(self) -> BrowserContext:
        self.user_data_dir.mkdir(parents=True, exist_ok=True)

        if self._context is not None:
            return self._context

        self._playwright = sync_playwright().start()
        self._context = self._playwright.chromium.launch_persistent_context(
            user_data_dir=str(self.user_data_dir),
            headless=self.headless,
            slow_mo=self.slow_mo,
            viewport={"width": 1440, "height": 1100},
            locale="en-US",
        )

        return self._context

    def close(self) -> None:
        if self._context is not None:
            self._context.close()
            self._context = None

        if self._playwright is not None:
            self._playwright.stop()
            self._playwright = None

    def __enter__(self) -> "GoogleMapsBrowser":
        self.open()
        return self

    def __exit__(self, exc_type, exc, tb) -> None:
        self.close()

    @property
    def context(self) -> BrowserContext:
        if self._context is None:
            return self.open()

        return self._context
