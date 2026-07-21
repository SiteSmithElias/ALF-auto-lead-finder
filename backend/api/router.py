from fastapi import APIRouter
from api.routes import (health, businesses, leads, discovery, contact, dashboard, profile)

api_router = APIRouter()

api_router.include_router(health.router, tags=["Health"])
api_router.include_router(businesses.router, tags=["Businesses"])
api_router.include_router(leads.router, tags=["Leads"])
api_router.include_router(discovery.router, tags=["Discovery"])
api_router.include_router(contact.router, tags=["Contacts"])
api_router.include_router(dashboard.router, tags=["Dashboard"])
api_router.include_router(profile.router, tags=["Profile"])