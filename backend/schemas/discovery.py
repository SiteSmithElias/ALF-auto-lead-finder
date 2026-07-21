from pydantic import BaseModel


class DiscoveryRequest(BaseModel):
    queries: list[str]
    max_results: int = 100

class DiscoveryJobResponse(BaseModel):
    job_id: str
    status: str
    message: str