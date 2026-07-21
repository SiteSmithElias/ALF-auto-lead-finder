from sqlalchemy.orm import Session
from sqlalchemy import func
from database.models import (
    Business,
    Lead,
    BusinessSource
)


def get_dashboard_metrics(
    db: Session,
):

    businesses_discovered = (
        db.query(
            func.count(Business.id)
        )
        .scalar()
    )

    total_leads = (
        db.query(
            func.count(Lead.id)
        )
        .scalar()
    )

    contacted = (
        db.query(
            func.count(Lead.id)
        )
        .filter(
            Lead.status == "contacted"
        )
        .scalar()
    )

    clients = (
        db.query(
            func.count(Lead.id)
        )
        .filter(
            Lead.status == "client"
        )
        .scalar()
    )

    conversion_rate = 0

    if total_leads > 0:
        conversion_rate = round(
            (clients / total_leads) * 100,
            2
        )

    return {
        "businesses_discovered": businesses_discovered,
        "total_leads": total_leads,
        "contacted": contacted,
        "clients": clients,
        "conversion_rate": conversion_rate,
    }