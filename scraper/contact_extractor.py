import re

from bs4 import BeautifulSoup


EMAIL_PATTERN = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"


def extract_emails(
    soup: BeautifulSoup
):

    text = soup.get_text(
        " "
    )


    emails = re.findall(
        EMAIL_PATTERN,
        text
    )


    return list(
        set(emails)
    )