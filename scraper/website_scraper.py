import requests
from bs4 import BeautifulSoup

def scrape_website(url: str):

    try:
        response = requests.get(
            url,
            timeout=10,
            headers={
                "User-Agent": (
                    "Mozilla/5.0 "
                    "(Windows NT 10.0; Win64; x64)"
                )
            }
        )

        response.raise_for_status()

        return BeautifulSoup(
            response.text,
            "html.parser"
        )

    except requests.RequestException as error:

        print(
            f"Failed to scrape {url}: {error}"
        )

        return None