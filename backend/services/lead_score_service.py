from sqlalchemy.orm import Session

from database.models import Company, LeadScore


def calculate_score(
    db: Session,
    company_id: int
):

    company = (
        db.query(Company)
        .filter(
            Company.id == company_id
        )
        .first()
    )

    if not company:
        return None


    score = 0
    reasons = []


    if company.website:
        score += 20
        reasons.append(
            "Has website"
        )


    if company.industry:
        score += 10
        reasons.append(
            "Has industry information"
        )


    if company.country or company.city:
        score += 10
        reasons.append(
            "Has location information"
        )


    if company.contacts:

        if len(company.contacts) > 1:
            score += 15
            reasons.append(
                "Multiple contacts"
            )


        for contact in company.contacts:

            if contact.email:
                score += 25
                reasons.append(
                    "Has email contact"
                )
                break


            if contact.phone:
                score += 10
                reasons.append(
                    "Has phone contact"
                )
                break


    return score, reasons

def save_lead_score(
    db: Session,
    company_id: int
):

    result = calculate_score(
        db,
        company_id
    )


    if not result:
        return None


    score, reasons = result


    lead_score = LeadScore(
        company_id=company_id,
        score=score,
        reason=", ".join(reasons)
    )


    lead_score = db.merge(lead_score)

    db.commit()

    db.refresh(lead_score)

    return lead_score