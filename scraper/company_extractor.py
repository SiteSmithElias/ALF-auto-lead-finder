from bs4 import BeautifulSoup


def extract_company_info(
    soup: BeautifulSoup
):

    title = None
    description = None


    if soup.title:
        title = soup.title.text.strip()


    description_tag = soup.find(
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