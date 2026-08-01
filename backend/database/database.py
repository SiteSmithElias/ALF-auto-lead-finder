from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from app_paths import ensure_runtime_directories, get_database_url


ensure_runtime_directories()

DATABASE_URL = get_database_url()

engine_kwargs = {}

if DATABASE_URL.startswith("sqlite"):
    engine_kwargs["connect_args"] = {
        "check_same_thread": False,
    }

engine = create_engine(
    DATABASE_URL,
    **engine_kwargs,
)


SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


Base = declarative_base()

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()
