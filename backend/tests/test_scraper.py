from pathlib import Path

from bs4 import BeautifulSoup

from scraper.company_extractor import extract_company_info
from scraper.contact_extractor import extract_emails


html = Path(
    "tests/mocks/mock_company.html"
).read_text()


page = BeautifulSoup(
    html,
    "html.parser"
)


company = extract_company_info(
    page
)


emails = extract_emails(
    page
)


print(company)
print(emails)