from __future__ import annotations
import re
from urllib.parse import parse_qs, urlparse
from playwright.sync_api import Page
from discovery.models import DiscoveredBusiness
from utils.normalizer import clean_address, clean_phone


class GoogleMapsParser:
    SEARCH_BOX_ROLE = "combobox"
    SEARCH_BOX_NAME = "Zoeken in Google Maps"
    SEARCH_BUTTON_SELECTOR = "button#searchbox-searchbutton"
    RESULTS_FEED_SELECTOR = "div[role='feed']"
    LISTING_SELECTOR = "a[href*='/maps/place']"
    NAME_SELECTOR = "h1.DUwDvf"
    ADDRESS_SELECTOR = "button[data-item-id='address']"
    PHONE_SELECTOR = "button[data-item-id^='phone']"
    WEBSITE_SELECTOR = "a[data-item-id='authority']"
    CATEGORY_SELECTOR = "button[jsaction*='pane.rating.category']"
    REVIEWS_SELECTOR = "button[jsaction*='pane.rating.moreReviews']"
    CONSENT_SELECTORS = (
        "button:has-text('Accept all')",
        "button:has-text('I agree')",
        "button:has-text('Accept')",
    )

    def open_maps(self, page):
        page.goto("https://www.google.com/maps")

        page.pause()

    def accept_consent(self, page: Page) -> None:
        for selector in self.CONSENT_SELECTORS:
            locator = page.locator(selector)
            if locator.count():
                try:
                    locator.first.click(timeout=2_000)
                    page.wait_for_timeout(1_000)
                    return
                except Exception:
                    continue

    def search(self, page: Page, query: str) -> None:
        search_box = page.get_by_role("combobox").first
        search_box.wait_for(state="visible", timeout=15_000)
        
        search_box.fill(query)
        search_box.press("Enter")

        page.wait_for_timeout(2_000)

    def wait_for_results(self, page: Page):
        feed = page.locator(self.RESULTS_FEED_SELECTOR)
        feed.wait_for(state="visible", timeout=20_000)
        return feed

    def collect_listing_urls(self, feed) -> list[str]:
        urls: list[str] = []
        cards = feed.locator(self.LISTING_SELECTOR)
        count = cards.count()
        for index in range(count):
            href = cards.nth(index).get_attribute("href")
            if href:
                urls.append(href)
        return urls

    def scroll_results(self, page: Page, feed) -> None:
        feed.evaluate(
            "(element) => { element.scrollTop = element.scrollHeight; }"
        )

    def extract_business(self, page: Page, fallback_url: str | None = None) -> DiscoveredBusiness:
        name = self._safe_inner_text(page, self.NAME_SELECTOR)
        address = clean_address(self._button_text(page, self.ADDRESS_SELECTOR))
        phone = clean_phone(self._button_text(page, self.PHONE_SELECTOR))
        website = self._anchor_href(page, self.WEBSITE_SELECTOR)
        category = self._safe_inner_text(page, self.CATEGORY_SELECTOR)
        reviews_average, reviews_count = self._extract_reviews(page)
        latitude, longitude = self._extract_lat_lng(page.url or fallback_url)
        external_id = self._extract_external_id(page.url or fallback_url)
        city, country = self._extract_city_country(address)

        return DiscoveredBusiness(
            name=name,
            address=address,
            phone=phone,
            website=website,
            category=category,
            city=city,
            country=country,
            reviews_count=reviews_count,
            reviews_average=reviews_average,
            latitude=latitude,
            longitude=longitude,
            external_id=external_id,
        )

    def _safe_inner_text(self, page: Page, selector: str) -> str | None:
        locator = page.locator(selector)
        if not locator.count():
            return None

        try:
            text = locator.first.inner_text(timeout=2_000).strip()
        except Exception:
            return None

        return text or None

    def _button_text(self, page: Page, selector: str) -> str | None:
        locator = page.locator(selector)
        if not locator.count():
            return None

        try:
            text = locator.first.inner_text(timeout=2_000).strip()
        except Exception:
            return None

        return text or None

    def _anchor_href(self, page: Page, selector: str) -> str | None:
        locator = page.locator(selector)
        if not locator.count():
            return None

        href = locator.first.get_attribute("href")
        if not href:
            return None

        return href

    def _extract_reviews(self, page: Page) -> tuple[float | None, int | None]:
        text = self._safe_inner_text(page, self.REVIEWS_SELECTOR)
        if not text:
            try:
                text = page.locator("body").inner_text(timeout=3_000)
            except Exception:
                text = ""

        rating_match = re.search(r"([0-5](?:\.\d)?)\s*stars?", text or "")
        count_match = re.search(r"([\d,]+)\s+reviews?", text or "")

        rating = float(rating_match.group(1)) if rating_match else None
        count = None
        if count_match:
            count = int(count_match.group(1).replace(",", ""))

        return rating, count

    def _extract_external_id(self, url: str | None) -> str | None:
        if not url:
            return None

        place_id = self._extract_place_id_from_url(url)
        if place_id:
            return place_id

        parsed = urlparse(url)
        query = parse_qs(parsed.query)
        if "cid" in query and query["cid"]:
            return f"cid:{query['cid'][0]}"

        return None

    def _extract_place_id_from_url(self, url: str) -> str | None:
        match = re.search(r"!1s([^!]+)", url)
        if match:
            return match.group(1)

        match = re.search(r"place_id:([^!&]+)", url)
        if match:
            return match.group(1)

        return None

    def _extract_lat_lng(self, url: str | None) -> tuple[float | None, float | None]:
        if not url:
            return None, None

        match = re.search(r"@(-?\d+\.\d+),(-?\d+\.\d+)", url)
        if match:
            return float(match.group(1)), float(match.group(2))

        match = re.search(r"!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)", url)
        if match:
            return float(match.group(1)), float(match.group(2))

        return None, None

    def _extract_city_country(self, address: str | None) -> tuple[str | None, str | None]:
        if not address:
            return None, None

        parts = [part.strip() for part in address.split(",") if part.strip()]
        if len(parts) < 2:
            return None, None

        city = parts[-2] if len(parts) >= 2 else None
        country = parts[-1] if len(parts) >= 1 else None
        return city, country
