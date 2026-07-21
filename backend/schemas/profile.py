from typing import Optional
from pydantic import BaseModel

class ProfileResponse(BaseModel):
    id:int
    name:Optional[str]
    email:Optional[str]
    company_name:Optional[str]
    avatar_url:Optional[str]

    class Config:
        from_attributes=True

class ProfileUpdate(BaseModel):
    name:Optional[str]=None
    email:Optional[str]=None
    company_name:Optional[str]=None