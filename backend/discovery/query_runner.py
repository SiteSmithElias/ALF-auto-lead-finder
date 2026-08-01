from __future__ import annotations

import logging
from typing import Callable

from sqlalchemy.orm import Session

from discovery.google_maps import GoogleMapsScraper
from discovery.models import DiscoveredBusiness

from services.discovery_service import (
    process_discovered_businesses,
)


logger = logging.getLogger(__name__)


ProgressCallback = Callable[
    [int, str, int],
    None,
]


def run_queries(
    db: Session,
    queries: list[str],
    max_listings: int = 50,
    headless: bool = False,
    save: bool = True,
    progress_callback: ProgressCallback | None = None,
) -> list[DiscoveredBusiness]:

    scraper = GoogleMapsScraper(
        headless=headless,
        max_listings=max_listings,
    )

    all_businesses: list[DiscoveredBusiness] = []

    total_queries = len(queries)

    try:
        for index, query in enumerate(queries):

            if progress_callback:
                progress_callback(
                    int((index / total_queries) * 60),
                    f"Searching: {query}",
                    len(all_businesses),
                )

            logger.info(
                "Running discovery query: %s",
                query,
            )

            businesses = scraper.scrape_query(
                query,
                lambda progress, action, found:
                    progress_callback(
                        int(
                            (index / total_queries) * 100
                            +
                            progress / total_queries
                        ),
                        action,
                        found
                    )
            )

            all_businesses.extend(
                businesses
            )

            if progress_callback:
                progress_callback(
                    int(((index + 1) / total_queries) * 60),
                    f"Completed search: {query}",
                    len(all_businesses),
                )


        if save:

            if progress_callback:
                progress_callback(
                    75,
                    "Saving discovered businesses",
                    len(all_businesses),
                )


            process_discovered_businesses(
                db,
                all_businesses,
            )


            if progress_callback:
                progress_callback(
                    90,
                    "Creating leads",
                    len(all_businesses),
                )

    finally:
        scraper.close()


    return all_businesses