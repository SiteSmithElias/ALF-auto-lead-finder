from sqlalchemy.orm import Session
from database.models import Profile


def get_profile(
    db:Session
):
    profile = (
        db.query(Profile)
        .first()
    )

    if not profile:
        profile = Profile(
            name="",
            email="",
            company_name="",
        )

        db.add(profile)
        db.commit()
        db.refresh(profile)

    return profile

def update_profile(
    db:Session,
    profile:Profile,
    data
):
    if data.name is not None:
        profile.name=data.name

    if data.email is not None:
        profile.email=data.email

    if data.company_name is not None:
        profile.company_name=data.company_name

    db.commit()
    db.refresh(profile)

    return profile

def update_avatar(
    db:Session,
    profile:Profile,
    avatar_url:str
):
    profile.avatar_url = avatar_url

    db.commit()
    db.refresh(profile)

    return profile