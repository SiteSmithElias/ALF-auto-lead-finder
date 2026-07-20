from sqlalchemy.orm import Session
from discovery.models import DiscoveredBusiness
from services.business_service import create_business
from services.source_service import (get_source_by_external_id, create_business_source)
from services.lead_service import create_lead


def process_discovered_business(
    db: Session,
    discovered: DiscoveredBusiness,
):
    if discovered.external_id:
        existing_source = get_source_by_external_id(
            db,
            discovered.external_id
        )

        if existing_source:
            return existing_source.business

    business = create_business(
        db=db,
        name=discovered.name,
        website=discovered.website,
        address=discovered.address,
        city=discovered.city,
        country=discovered.country,
        phone=discovered.phone,
        category=discovered.category,
    )

    create_business_source(
        db=db,
        business_id=business.id,
        source_type=discovered.source,
        external_id=discovered.external_id,
        url=discovered.website,
    )

    create_lead(
        db=db,
        business_id=business.id,
        status="new",
    )

    return business

def process_discovered_businesses(
    db: Session,
    businesses: list[DiscoveredBusiness],
):
    saved_businesses = []

    for business in businesses:
        saved = process_discovered_business(
            db,
            business
        )
        saved_businesses.append(saved)


    return saved_businesses