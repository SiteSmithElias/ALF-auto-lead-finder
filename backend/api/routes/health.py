from fastapi import APIRouter
from database.database import engine

router = APIRouter()

@router.get("/health")
def health_check():
    try:
        connection = engine.connect()
        connection.close()

        return {
            "status": "ok",
            "database": "connected"
        }

    except Exception as e:
        return {
            "status": "error",
            "database": str(e)
        }