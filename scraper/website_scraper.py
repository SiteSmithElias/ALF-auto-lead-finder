import requests

from bs4 import BeautifulSoup


def scrape_website(url: str):

    response = requests.get(
        url,
        timeout=10
    )

    response.raise_for_status()


    soup = BeautifulSoup(
        response.text,
        "html.parser"
    )


    return soup