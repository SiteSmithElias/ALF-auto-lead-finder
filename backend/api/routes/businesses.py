from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.database import get_db
from schemas.business import BusinessResponse
from services.business_service import (
    get_businesses,
    get_business
)

router = APIRouter(
    prefix="/businesses",
    tags=["Businesses"]
)

@router.get(
    "",
    response_model=list[BusinessResponse]
)
def list_businesses(
    page: int = 1,
    limit: int = 50,
    category: str | None = None,
    city: str | None = None,
    hasWebsite: bool | None = None,
    db: Session = Depends(get_db)
):
    return get_businesses(
        db=db,
        page=page,
        limit=limit,
        category=category,
        city=city,
        has_website=hasWebsite
    )

@router.get(
    "/{business_id}",
    response_model=BusinessResponse
)
def business_details(
    business_id: int,
    db: Session = Depends(get_db)
):
    business = get_business(
        db,
        business_id
    )
    if not business:
        raise HTTPException(
            status_code=404,
            detail="Business not found"
        )
    return business