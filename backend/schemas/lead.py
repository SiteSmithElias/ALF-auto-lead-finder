from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class LeadBusinessResponse(BaseModel):
    id: int
    name: str
    category: Optional[str]
    city: Optional[str]
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