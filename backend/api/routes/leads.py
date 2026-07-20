from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)
from sqlalchemy.orm import Session
from database.database import get_db
from schemas.lead import (
    LeadResponse,
    LeadUpdate
)
from services.lead_service import (
    get_leads,
    get_lead,
    update_lead,
    exclude_lead
)


router = APIRouter(
    prefix="/leads",
    tags=["Leads"]
)

@router.get(
    "",
    response_model=list[LeadResponse]
)
def list_leads(
    page:int=1,
    limit:int=50,
    status:str=None,
    min_score:int=None,
    category:str=None,
    hasWebsite:bool=None,
    search:str=None,
    db:Session=Depends(get_db)
):

    return get_leads(
        db,
        page,
        limit,
        status,
        min_score,
        category,
        hasWebsite,
        search
    )

@router.get(
    "/{lead_id}",
    response_model=LeadResponse
)
def lead_details(
    lead_id:int,
    db:Session=Depends(get_db)
):

    lead=get_lead(
        db,
        lead_id
    )

    if not lead:
        raise HTTPException(
            404,
            "Lead not found"
        )

    return lead

@router.patch(
    "/{lead_id}",
    response_model=LeadResponse
)
def edit_lead(
    lead_id:int,
    data:LeadUpdate,
    db:Session=Depends(get_db)
):

    lead = get_lead(
    db,
    lead_id
    )

    if not lead:
        raise HTTPException(
            404,
            "Lead not found"
        )

    return update_lead(
        db,
        lead,
        status=data.status,
        notes=data.notes
    )

@router.patch(
    "/{lead_id}/status"
)
def update_status(
    lead_id:int,
    data:dict,
    db:Session=Depends(get_db)
):

    return update_lead(
        db,
        lead_id,
        LeadUpdate(
            status=data.get("status")
        )
    )

@router.delete(
    "/{lead_id}"
)
def delete_lead(
    lead_id:int,
    db:Session=Depends(get_db)
):

    result=exclude_lead(
        db,
        lead_id
    )

    if not result:
        raise HTTPException(
            404,
            "Lead not found"
        )


    return {
        "message":"Lead excluded"
    }