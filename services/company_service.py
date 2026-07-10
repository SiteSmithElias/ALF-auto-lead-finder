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