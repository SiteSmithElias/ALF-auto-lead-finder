from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from api.router import api_router
from app_paths import (
    ensure_runtime_directories,
    get_frontend_dist_dir,
    get_uploads_dir,
)
from database.database import Base, engine
from database import models


app = FastAPI(
    title="ALF API",
    description="Auto Lead Finder Backend API",
    version="1.0.0"
)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ensure_runtime_directories()

UPLOAD_DIR = get_uploads_dir()

app.mount(
    "/uploads",
    StaticFiles(directory=str(UPLOAD_DIR)),
    name="uploads"
)

app.include_router(
    api_router,
    prefix="/api"
)


@app.on_event("startup")
def create_database_tables() -> None:
    Base.metadata.create_all(bind=engine)


@app.get("/{requested_path:path}", include_in_schema=False)
def serve_frontend(requested_path: str):
    frontend_dist = get_frontend_dist_dir()

    if not frontend_dist.exists():
        raise HTTPException(status_code=404, detail="Frontend build not found")

    if requested_path.startswith("api/") or requested_path == "api":
        raise HTTPException(status_code=404, detail="Not found")

    if requested_path.startswith("uploads/") or requested_path == "uploads":
        raise HTTPException(status_code=404, detail="Not found")

    if not requested_path:
        return FileResponse(frontend_dist / "index.html")

    candidate = (frontend_dist / requested_path).resolve()

    try:
        candidate.relative_to(frontend_dist.resolve())
    except ValueError:
        return FileResponse(frontend_dist / "index.html")

    if candidate.exists() and candidate.is_file():
        return FileResponse(candidate)

    return FileResponse(frontend_dist / "index.html")
