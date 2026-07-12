def clean_text(
    value: str | None
):
    if not value:
        return None

    return value.strip()


def clean_email(
    email: str | None
):
    if not email:
        return None

    return email.strip().lower()


def clean_url(
    url: str
):
    url = url.strip()

    if url.endswith("/"):
        url = url[:-1]

    return url