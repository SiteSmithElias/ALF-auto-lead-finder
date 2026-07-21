from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.router import api_router
from pathlib import Path
from fastapi.staticfiles import StaticFiles


app = FastAPI(
    title="ALF API",
    description="Auto Lead Finder Backend API",
    version="1.0.0"
)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(
    exist_ok=True
)

app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)

app.include_router(
    api_router,
    prefix="/api"
)