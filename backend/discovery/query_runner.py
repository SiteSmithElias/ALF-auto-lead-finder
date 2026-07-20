from __future__ import annotations
import logging
from sqlalchemy.orm import Session
from discovery.google_maps import GoogleMapsScraper
from discovery.models import DiscoveredBusiness
from services.discovery_service import (process_discovered_businesses)


logger = logging.getLogger(__name__)

def run_queries(
    db: Session,
    queries: list[str],
    max_listings: int = 50,
    headless: bool = False,
    save: bool = True,
) -> list[DiscoveredBusiness]:
    scraper = GoogleMapsScraper(
        headless=headless,
        max_listings=max_listings,
    )
    all_businesses: list[DiscoveredBusiness] = []

    try:
        for query in queries:
            logger.info(
                "Running discovery query: %s",
                query
            )
            businesses = scraper.scrape_query(query)
            all_businesses.extend(
                businesses
            )

        if save:
            logger.info(
                "Saving %s discovered businesses",
                len(all_businesses)
            )

            process_discovered_businesses(
                db,
                all_businesses
            )
    finally:
        scraper.close()

    return all_businesses