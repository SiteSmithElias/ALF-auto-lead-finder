from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)
from sqlalchemy.orm import Session
from database.database import get_db
from schemas.contact import (
    ContactCreate,
    ContactUpdate,
    ContactResponse,
)
from services.contact_service import (
    create_contact,
    get_contacts_by_business,
    get_contact,
    update_contact,
    delete_contact,
)
from services.lead_service import get_lead

router = APIRouter(
    tags=["Contacts"]
)

@router.get(
    "/leads/{lead_id}/contacts",
    response_model=list[ContactResponse],
)
def list_contacts(
    lead_id: int,
    db: Session = Depends(get_db),
):
    lead = get_lead(
        db,
        lead_id,
    )

    if not lead:
        raise HTTPException(
            status_code=404,
            detail="Lead not found",
        )

    return get_contacts_by_business(
        db,
        lead.business_id,
    )

@router.post(
    "/leads/{lead_id}/contacts",
    response_model=ContactResponse,
)
def add_contact(
    lead_id: int,
    data: ContactCreate,
    db: Session = Depends(get_db),
):
    lead = get_lead(
        db,
        lead_id,
    )

    if not lead:
        raise HTTPException(
            status_code=404,
            detail="Lead not found",
        )

    return create_contact(
        db=db,
        business_id=lead.business_id,
        name=data.name,
        email=data.email,
        phone=data.phone,
        role=data.role,
    )

@router.patch(
    "/contacts/{contact_id}",
    response_model=ContactResponse,
)
def edit_contact(
    contact_id: int,
    data: ContactUpdate,
    db: Session = Depends(get_db),
):
    contact = get_contact(
        db,
        contact_id,
    )

    if not contact:
        raise HTTPException(
            status_code=404,
            detail="Contact not found",
        )

    return update_contact(
        db=db,
        contact=contact,
        name=data.name,
        email=data.email,
        phone=data.phone,
        role=data.role,
    )

@router.delete(
    "/contacts/{contact_id}",
)
def remove_contact(
    contact_id: int,
    db: Session = Depends(get_db),
):
    contact = get_contact(
        db,
        contact_id,
    )

    if not contact:
        raise HTTPException(
            status_code=404,
            detail="Contact not found",
        )

    delete_contact(
        db,
        contact,
    )

    return {
        "message": "Contact deleted"
    }