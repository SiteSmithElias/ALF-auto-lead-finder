from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel

class BusinessSourceResponse(BaseModel):
    id: int
    source_type: Optional[str]
    external_id: Optional[str]
    url: Optional[str]
    discovered_at: datetime

    class Config:
        from_attributes = True

class BusinessResponse(BaseModel):
    id: int
    name: str
    address: Optional[str]
    city: Optional[str]
    country: Optional[str]
    phone: Optional[str]
    email: Optional[str]
    website: Optional[str]
    category: Optional[str]
    created_at: datetime
    updated_at: datetime
    sources: List[BusinessSourceResponse] = []

    class Config:
        from_attributes = True