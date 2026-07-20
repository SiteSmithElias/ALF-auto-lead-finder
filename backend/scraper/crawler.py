from scraper.website_scraper import scrape_website
from scraper.link_extractor import extract_links
from scraper.filters.page_filter import is_relevant_page


def crawl_website(
    url: str
):
    pages = []

    homepage = scrape_website(
        url
    )

    if homepage is None:
        return pages

    pages.append(homepage)

    links = extract_links(
        homepage,
        url
    )

    for link in links:
        if is_relevant_page(link):
            page = scrape_website(
                link
            )

            if page:
                pages.append(page)

    return pages