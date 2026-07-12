from urllib.parse import urljoin

from bs4 import BeautifulSoup


def extract_links(
    soup: BeautifulSoup,
    base_url: str
):

    links = []

    for link in soup.find_all("a", href=True):
        url = urljoin(
            base_url,
            link["href"]
        )

        links.append(url)

    return list(
        set(links)
    )