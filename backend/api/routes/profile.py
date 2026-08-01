from fastapi import (
    APIRouter,
    Depends,
    File,
    HTTPException,
    UploadFile,
)
from sqlalchemy.orm import Session
from pathlib import Path

from app_paths import get_uploads_dir
from database.database import get_db
from schemas.profile import (
    ProfileResponse,
    ProfileUpdate,
)
from services.profile_service import (
    get_profile,
    update_profile,
)


router = APIRouter(
    prefix="/profile",
    tags=["Profile"]
)

@router.get(
    "",
    response_model=ProfileResponse
)
def read_profile(
    db:Session=Depends(get_db)
):
    return get_profile(db)

@router.patch(
    "",
    response_model=ProfileResponse
)
def edit_profile(
    data:ProfileUpdate,
    db:Session=Depends(get_db)
):
    profile=get_profile(db)

    return update_profile(
        db,
        profile,
        data
    )

@router.post(
    "/avatar",
    response_model=ProfileResponse
)
async def upload_avatar(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    allowed_types = [
        "image/png",
        "image/jpeg",
        "image/webp"
    ]

    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Invalid image type"
        )

    profile = get_profile(db)
    extension = Path(file.filename).suffix.lstrip(".") or "png"
    filename = f"avatar_{profile.id}.{extension}"
    folder = get_uploads_dir() / "avatars"
    folder.mkdir(parents=True, exist_ok=True)
    filepath = folder / filename

    with open(filepath, "wb") as buffer:
        buffer.write(
            await file.read()
        )

    profile.avatar_url = f"/uploads/avatars/{filename}"

    db.commit()
    db.refresh(profile)

    return profile
