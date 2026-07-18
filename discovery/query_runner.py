from __future__ import annotations

import logging

from discovery.google_maps import GoogleMapsScraper
from discovery.models import DiscoveredBusiness


logger = logging.getLogger(__name__)


def run_queries(
    queries: list[str],
    max_listings: int = 50,
    headless: bool = False,
) -> list[DiscoveredBusiness]:
    scraper = GoogleMapsScraper(
        headless=headless,
        max_listings=max_listings,
    )

    all_businesses: list[DiscoveredBusiness] = []
    try:
        for query in queries:
            logger.info("Running discovery query: %s", query)
            businesses = scraper.scrape_query(query)
            all_businesses.extend(businesses)
    finally:
        scraper.close()

    return all_businesses
