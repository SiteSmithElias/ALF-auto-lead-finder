from __future__ import annotations

import logging
from collections.abc import Iterable
from urllib.parse import urljoin
from typing import Callable

from discovery.browser import GoogleMapsBrowser
from discovery.models import DiscoveredBusiness
from discovery.parser import GoogleMapsParser


logger = logging.getLogger(__name__)

ProgressCallback = Callable[
    [int, str, int],
    None
]


class GoogleMapsScraper:
    def __init__(
        self,
        headless: bool = False,
        browser_data_dir: str = "browser_data",
        max_listings: int = 50,
        max_scroll_rounds: int = 12,
    ) -> None:
        self.browser = GoogleMapsBrowser(
            user_data_dir=browser_data_dir,
            headless=headless,
        )
        self.parser = GoogleMapsParser()
        self.max_listings = max_listings
        self.max_scroll_rounds = max_scroll_rounds

    def scrape_query(self, query: str, progress_callback: ProgressCallback | None = None,) -> list[DiscoveredBusiness]:
        logger.info("Searching Google Maps for %s", query)

        context = self.browser.open()
        page = context.pages[0] if context.pages else context.new_page()

        self.parser.open_maps(page)
        self.parser.accept_consent(page)
        self.parser.search(page, query)
        feed = self.parser.wait_for_results(page)

        listing_urls = self._collect_listing_urls(page, feed, page.url,)
        businesses: list[DiscoveredBusiness] = []
        total = min(len(listing_urls), self.max_listings)

        if progress_callback:
            progress_callback(10, f"Found {total} listings, extracting details", 0,)

        for index, listing_url in enumerate(listing_urls[: self.max_listings],start=1,):
            try:
                page.goto(listing_url, wait_until="domcontentloaded")
                page.wait_for_timeout(2_000)
                business = self.parser.extract_business(page, fallback_url=listing_url)
                businesses.append(business)
                if progress_callback:
                    progress_callback(
                        10 + int((index / total) * 80),
                        f"Extracting business {index}/{total}",
                        len(businesses)
                    )
            except Exception as exc:
                logger.exception(
                    "Failed to extract Google Maps listing from %s: %s",
                    listing_url,
                    exc,
                )
                raise

        return self._dedupe_businesses(businesses)

    def close(self) -> None:
        self.browser.close()

    def _collect_listing_urls(self, page, feed, base_url: str) -> list[str]:
        seen: set[str] = set()
        ordered_urls: list[str] = []
        stagnant_rounds = 0

        for _ in range(self.max_scroll_rounds):
            urls = self.parser.collect_listing_urls(feed)
            before = len(seen)

            for url in urls:
                absolute_url = urljoin(base_url, url)
                if absolute_url in seen:
                    continue

                seen.add(absolute_url)
                ordered_urls.append(absolute_url)

            if len(seen) == before:
                stagnant_rounds += 1
            else:
                stagnant_rounds = 0

            if stagnant_rounds >= 2 or len(ordered_urls) >= self.max_listings:
                break

            self.parser.scroll_results(feed)
            page.wait_for_timeout(1_000)

        return ordered_urls

    def _dedupe_businesses(
        self,
        businesses: Iterable[DiscoveredBusiness],
    ) -> list[DiscoveredBusiness]:
        seen_keys: set[str] = set()
        unique_businesses: list[DiscoveredBusiness] = []

        for business in businesses:
            key = business.external_id or self._fallback_key(business)
            if key in seen_keys:
                continue

            seen_keys.add(key)
            unique_businesses.append(business)

        return unique_businesses

    def _fallback_key(self, business: DiscoveredBusiness) -> str:
        return "|".join(
            part or ""
            for part in (
                business.name,
                business.address,
                business.city,
                business.country,
            )
        )
