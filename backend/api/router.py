from fastapi import APIRouter
from api.routes import (health, businesses)

api_router = APIRouter()

api_router.include_router(health.router, tags=["Health"])
api_router.include_router(businesses.router, tags=["Businesses"])
