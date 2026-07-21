from sqlalchemy.orm import Session
from database.models import Contact
from utils.normalizer import clean_email, clean_text


def create_contact(
    db: Session,
    business_id: int,
    name: str | None = None,
    email: str | None = None,
    phone: str | None = None,
    role: str | None = None,
):
    email = clean_email(email)
    name = clean_text(name)
    phone = clean_text(phone)

    existing_contact = (
        db.query(Contact)
        .filter(
            Contact.business_id == business_id,
            Contact.email == email
        )
        .first()
    )

    if existing_contact:
        existing_contact.name = name
        existing_contact.phone = phone
        if role is not None:
            existing_contact.role = role

        db.commit()
        db.refresh(existing_contact)

        return existing_contact


    contact = Contact(
        business_id=business_id,
        name=name,
        email=email,
        phone=phone,
        role=role,
    )

    db.add(contact)

    db.commit()
    db.refresh(contact)

    return contact

def get_contacts_by_business(
    db: Session,
    business_id: int,
):
    return (
        db.query(Contact)
        .filter(Contact.business_id == business_id)
        .order_by(Contact.name.asc())
        .all()
    )


def get_contact(
    db: Session,
    contact_id: int,
):
    return (
        db.query(Contact)
        .filter(Contact.id == contact_id)
        .first()
    )


def update_contact(
    db: Session,
    contact: Contact,
    name: str | None = None,
    email: str | None = None,
    phone: str | None = None,
    role: str | None = None,
):
    email = clean_email(email)
    name = clean_text(name)
    phone = clean_text(phone)
    role = clean_text(role)

    if name is not None:
        contact.name = name

    if email is not None:
        contact.email = email

    if phone is not None:
        contact.phone = phone

    if role is not None:
        contact.role = role

    db.commit()
    db.refresh(contact)

    return contact


def delete_contact(
    db: Session,
    contact: Contact,
):
    db.delete(contact)
    db.commit()