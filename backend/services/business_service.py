from sqlalchemy.orm import Session
from database.models import Business
from utils.normalizer import clean_text, clean_url

def get_businesses(
    db: Session,
    page: int = 1,
    limit: int = 50,
    category: str | None = None,
    city: str | None = None,
    has_website: bool | None = None
):
    query = db.query(Business)

    if category:
        query = query.filter(
            Business.category == category
        )

    if city:
        query = query.filter(
            Business.city == city
        )

    if has_website is not None:
        if has_website:
            query = query.filter(
                Business.website.isnot(None)
            )

        else:
            query = query.filter(
                Business.website.is_(None)
            )

    return (
        query
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

def get_business(
    db: Session,
    business_id: int
):
    return (
        db.query(Business)
        .filter(
            Business.id == business_id
        )
        .first()
    )

def create_business(
    db: Session,
    name: str,
    website: str | None = None,
    address: str | None = None,
    city: str | None = None,
    country: str | None = None,
    phone: str | None = None,
    email: str | None = None,
    category: str | None = None,
):

    business = Business(
        name=clean_text(name),
        website=clean_url(website) if website else None,
        address=clean_text(address),
        city=clean_text(city),
        country=clean_text(country),
        phone=clean_text(phone),
        email=clean_text(email),
        category=clean_text(category),
    )

    db.add(business)
    db.commit()
    db.refresh(business)

    return business


def update_business(
    db: Session,
    business: Business,
    **fields,
):

    for key, value in fields.items():
        if hasattr(business, key):
            setattr(
                business,
                key,
                value
            )

    db.commit()
    db.refresh(business)

    return business