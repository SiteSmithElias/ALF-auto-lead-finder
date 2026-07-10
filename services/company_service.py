from sqlalchemy.orm import Session

from database.models import Company


def create_company(
    db: Session,
    name: str,
    website: str,
    industry: str | None = None,
    description: str | None = None,
    country: str | None = None,
    city: str | None = None
):

    existing_company = (
        db.query(Company)
        .filter(Company.website == website)
        .first()
    )

    if existing_company:
        return existing_company


    company = Company(
        name=name,
        website=website,
        industry=industry,
        description=description,
        country=country,
        city=city
    )

    db.add(company)

    db.commit()

    db.refresh(company)

    return company