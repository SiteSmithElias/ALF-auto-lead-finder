from sqlalchemy.orm import Session

from database.models import BusinessSource


def get_source_by_external_id(
    db: Session,
    external_id: str,
):
    return (
        db.query(BusinessSource)
        .filter(
            BusinessSource.external_id == external_id
        )
        .first()
    )


def create_business_source(
    db: Session,
    business_id: int,
    source_type: str,
    external_id: str | None = None,
    url: str | None = None,
):
    existing_source = None

    if external_id:
        existing_source = get_source_by_external_id(
            db,
            external_id
        )

    if existing_source:
        return existing_source


    source = BusinessSource(
        business_id=business_id,
        source_type=source_type,
        external_id=external_id,
        url=url,
    )

    db.add(source)
    db.commit()
    db.refresh(source)

    return source