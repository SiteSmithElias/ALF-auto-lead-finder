from sqlalchemy.orm import Session

from database.models import Contact


def save_contact(
    db: Session,
    company_id: int,
    name: str | None = None,
    email: str | None = None,
    phone: str | None = None
):
    existing_contact = (
        db.query(Contact)
        .filter(
            Contact.company_id == company_id,
            Contact.email == email
        )
        .first()
    )


    if existing_contact:
        existing_contact.name = name
        existing_contact.phone = phone

        db.commit()
        db.refresh(existing_contact)

        return existing_contact


    contact = Contact(
        company_id=company_id,
        name=name,
        email=email,
        phone=phone
    )

    db.add(contact)

    db.commit()
    db.refresh(contact)

    return contact