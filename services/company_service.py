from sqlalchemy.orm import Session

from database.models import Company
from utils.normalizer import (clean_text, clean_url)


def save_company(
    db: Session,
    name: str,
    website: str | None,
    address: str | None = None,
    phone: str | None = None,
    industry: str | None = None,
    category: str | None = None,
    description: str | None = None,
    country: str | None = None,
    city: str | None = None,
    source: str = "website_scraper",
    external_id: str | None = None,
    reviews_count: int | None = None,
    reviews_average: float | None = None,
    latitude: float | None = None,
    longitude: float | None = None
):

    name = clean_text(name)
    website = clean_url(website) if website else None
    address = clean_text(address)
    phone = clean_text(phone)
    description = clean_text(description)
    category = clean_text(category)
    external_id = clean_text(external_id)

    existing_company = (
        db.query(Company)
        .filter(
            Company.external_id == external_id
        )
        .first()
        if external_id
        else None
    )

    if not existing_company and website:
        existing_company = (
            db.query(Company)
            .filter(Company.website == website)
            .first()
        )

    if not existing_company:
        existing_company = (
            db.query(Company)
            .filter(
                Company.name == name,
                Company.address == address,
                Company.city == city,
                Company.country == country,
            )
            .first()
        )

    if existing_company:
        existing_company.name = name
        existing_company.address = address
        existing_company.industry = industry
        existing_company.category = category
        existing_company.description = description
        existing_company.country = country
        existing_company.city = city
        existing_company.phone = phone
        existing_company.source = source
        if external_id:
            existing_company.external_id = external_id
        existing_company.reviews_count = reviews_count
        existing_company.reviews_average = reviews_average
        existing_company.latitude = latitude
        existing_company.longitude = longitude

        db.commit()
        db.refresh(existing_company)

        return existing_company

    company = Company(
        name=name,
        address=address,
        website=website,
        phone=phone,
        industry=industry,
        category=category,
        description=description,
        country=country,
        city=city,
        source=source,
        external_id=external_id,
        reviews_count=reviews_count,
        reviews_average=reviews_average,
        latitude=latitude,
        longitude=longitude
    )

    db.add(company)

    db.commit()

    db.refresh(company)

    return company
