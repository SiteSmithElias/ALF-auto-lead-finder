import re

EMAIL_PATTERN = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"

def extract_emails(pages):
    text = ""

    for page in pages:
        text += page.get_text(" ")

    emails = re.findall(
        EMAIL_PATTERN,
        text
    )

    return list(
        set(emails)
    )