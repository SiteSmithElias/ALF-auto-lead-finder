from discovery.google_maps import GoogleMapsScraper


def test_google_maps_search_returns_listings():
    print("Launching Chromium and opening Google Maps")
    scraper = GoogleMapsScraper(headless=True, max_listings=5)

    try:
        businesses = scraper.scrape_query("plumbers Brussels")
        print(f"Found {len(businesses)} listings")

        assert businesses, "Google Maps search returned no listings"
        assert any(
            business.name for business in businesses
        ), "Listings were found, but no business names were extracted"
    finally:
        scraper.close()
