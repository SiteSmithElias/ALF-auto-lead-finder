from bs4 import BeautifulSoup


def extract_company_info(
    pages
):

    title = None
    description = None


    for page in pages:
        if not title and page.title:
            title = page.title.text.strip()

        description_tag = page.find(
            "meta",
            attrs={
                "name": "description"
            }
        )

        if description_tag:
            description = description_tag.get(
                "content"
            )

    return {
        "name": title,
        "description": description
    }