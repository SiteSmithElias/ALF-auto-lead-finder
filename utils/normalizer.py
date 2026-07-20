import re

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

def clean_google_text(value: str | None) -> str | None:
    if not value:
        return None

    value = re.sub(r"[\uE000-\uF8FF]", "", value)

    value = " ".join(value.split())

    return value.strip()


def clean_phone(phone: str | None) -> str | None:
    phone = clean_google_text(phone)

    if not phone:
        return None

    return phone

def clean_address(address: str | None) -> str | None:
    address = clean_google_text(address)

    if not address:
        return None

    return address