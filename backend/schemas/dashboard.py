from pydantic import BaseModel


class DashboardMetrics(BaseModel):
    businesses_discovered: int
    total_leads: int
    contacted: int
    clients: int
    conversion_rate: float