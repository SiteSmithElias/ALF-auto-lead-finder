from typing import Optional
from pydantic import BaseModel

class ContactCreate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    role: Optional[str] = None

class ContactUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    role: Optional[str] = None

class ContactResponse(BaseModel):
    id: int
    business_id: int
    name: Optional[str]
    email: Optional[str]
    phone: Optional[str]
    role: Optional[str]

    class Config:
        from_attributes = True