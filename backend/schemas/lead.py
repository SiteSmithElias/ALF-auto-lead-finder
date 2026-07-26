from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class LeadBusinessResponse(BaseModel):
    id: int
    name: str
    address: Optional[str]
    city: Optional[str]
    country: Optional[str]
    phone: Optional[str]
    email: Optional[str]
    category: Optional[str]
    website: Optional[str]

    class Config:
        from_attributes = True

class LeadResponse(BaseModel):
    id: int
    business: LeadBusinessResponse
    score: Optional[int]
    score_reason: Optional[str]
    status: Optional[str]
    notes: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class LeadUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None

class LeadListResponse(BaseModel):
    items: list[LeadResponse]
    page: int
    limit: int
    total: int
    pages: int