KEYWORDS = [
    "contact",
    "about",
    "team",
    "company"
]


def is_relevant_page(
    url: str
):

    url = url.lower()


    return any(
        keyword in url
        for keyword in KEYWORDS
    )