from dataclasses import dataclass


@dataclass
class DiscoveredBusiness:
    name: str | None = None
    address: str | None = None
    city: str | None = None
    country: str | None = None
    phone: str | None = None
    website: str | None = None
    category: str | None = None
    reviews_count: int | None = None
    reviews_average: float | None = None
    latitude: float | None = None
    longitude: float | None = None
    source: str = "google_maps"
    external_id: str | None = None