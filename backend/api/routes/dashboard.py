from fastapi import (
    APIRouter,
    Depends,
)
from sqlalchemy.orm import Session
from database.database import get_db
from schemas.dashboard import DashboardMetrics
from services.dashboard_service import (
    get_dashboard_metrics
)


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get(
    "/metrics",
    response_model=DashboardMetrics
)
def dashboard_metrics(
    db: Session = Depends(get_db),
):

    return get_dashboard_metrics(
        db
    )