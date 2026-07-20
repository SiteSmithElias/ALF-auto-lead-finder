from sqlalchemy.orm import Session
from database.models import (
    Lead,
    ExcludedBusiness
)


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
    notes: str | None = None,
):
    if status is not None:
        lead.status = status

    if score is not None:
        lead.score = score

    if score_reason is not None:
        lead.score_reason = score_reason

    if notes is not None:
        lead.notes = notes

    db.commit()
    db.refresh(lead)

    return lead

# -------------------------
# API FUNCTIONS
# -------------------------


def get_leads(
    db: Session,
    page=1,
    limit=50,
    status=None,
    min_score=None,
    category=None,
    has_website=None,
    search=None
):

    query = (
        db.query(Lead)
        .join(Lead.business)
    )


    if status:
        query = query.filter(
            Lead.status == status
        )


    if min_score:
        query = query.filter(
            Lead.score >= min_score
        )


    if category:
        query = query.filter(
            Lead.business.category == category
        )


    if has_website is not None:

        if has_website:
            query=query.filter(
                Lead.business.website.isnot(None)
            )

        else:
            query=query.filter(
                Lead.business.website.is_(None)
            )


    if search:
        query=query.filter(
            Lead.business.name.contains(search)
        )


    return (
        query
        .offset((page-1)*limit)
        .limit(limit)
        .all()
    )



def get_lead(
    db:Session,
    lead_id:int
):

    return (
        db.query(Lead)
        .filter(
            Lead.id == lead_id
        )
        .first()
    )



def exclude_lead(
    db:Session,
    lead_id:int
):

    lead = get_lead(
        db,
        lead_id
    )


    if not lead:
        return False


    for source in lead.business.sources:

        excluded = ExcludedBusiness(
            source_type=source.source_type,
            external_id=source.external_id,
            reason="User excluded"
        )

        db.add(excluded)


    db.delete(lead)

    db.commit()

    return True