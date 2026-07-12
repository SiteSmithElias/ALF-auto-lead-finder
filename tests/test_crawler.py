from scraper.crawler import crawl_website

pages = crawl_website(
    "https://example.com"
)

print(len(pages))