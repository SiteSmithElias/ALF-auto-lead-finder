from sqlalchemy.orm import Session
from database.models import Lead


def get_lead_by_business(
    db: Session,
    business_id: int,
):
    return (
        db.query(Lead)
        .filter(
            Lead.business_id == business_id
        )
        .first()
    )


def create_lead(
    db: Session,
    business_id: int,
    status: str = "new",
    score: int | None = None,
    score_reason: str | None = None,
):
    existing_lead = get_lead_by_business(
        db,
        business_id
    )

    if existing_lead:
        return existing_lead


    lead = Lead(
        business_id=business_id,
        status=status,
        score=score,
        score_reason=score_reason,
    )

    db.add(lead)
    db.commit()
    db.refresh(lead)

    return lead


def update_lead(
    db: Session,
    lead: Lead,
    status: str | None = None,
    score: int | None = None,
    score_reason: str | None = None,
):
    if status is not None:
        lead.status = status

    if score is not None:
        lead.score = score

    if score_reason is not None:
        lead.score_reason = score_reason


    db.commit()
    db.refresh(lead)

    return lead