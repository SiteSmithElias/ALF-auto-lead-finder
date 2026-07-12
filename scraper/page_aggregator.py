from bs4 import BeautifulSoup

def combine_pages(pages):
    combined_text = ""

    for page in pages:
        combined_text += page.get_text(
            " "
        )

    return combined_text