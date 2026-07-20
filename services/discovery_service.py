from __future__ import annotations

from sqlalchemy.orm import Session

from database.models import Company
from discovery.models import DiscoveredBusiness
from services.company_service import save_company
from utils.normalizer import clean_text


def save_discovered_businesses(
    db: Session,
    businesses: list[DiscoveredBusiness],
) -> list[Company]:
    saved_companies: list[Company] = []

    for business in businesses:
        saved_companies.append(
            save_discovered_business(db, business)
        )

    return saved_companies


def save_discovered_business(
    db: Session,
    business: DiscoveredBusiness,
) -> Company:
    name = clean_text(business.name)
    address = clean_text(business.address)
    city = clean_text(business.city)
    country = clean_text(business.country)
    category = clean_text(business.category)

    company = save_company(
        db=db,
        name=name or "Unknown business",
        website=business.website,
        address=address,
        phone=business.phone,
        industry=category,
        category=category,
        country=country,
        city=city,
        source=business.source,
        external_id=business.external_id,
        reviews_count=business.reviews_count,
        reviews_average=business.reviews_average,
        latitude=business.latitude,
        longitude=business.longitude,
    )

    return company
