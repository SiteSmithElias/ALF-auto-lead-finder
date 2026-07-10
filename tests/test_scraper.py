from scraper.website_scraper import scrape_website


page = scrape_website(
    "https://example.com"
)


print(
    page.title.text
)