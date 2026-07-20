from __future__ import annotations
import logging
from discovery.google_maps import GoogleMapsScraper
from discovery.models import DiscoveredBusiness
from services.discovery_service import save_discovered_businesses
from database.database import SessionLocal


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

    db = SessionLocal()

    try:
        for query in queries:
            logger.info("Running discovery query: %s", query)

            businesses = scraper.scrape_query(query)

            save_discovered_businesses(
                db,
                businesses
            )

            all_businesses.extend(businesses)

    finally:
        db.close()
        scraper.close()

    return all_businesses