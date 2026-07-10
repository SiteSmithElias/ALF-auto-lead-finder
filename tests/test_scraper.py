from scraper.website_scraper import scrape_website
from scraper.company_extractor import extract_company_info


page = scrape_website(
    "https://example.com"
)


company = extract_company_info(
    page
)


print(company)