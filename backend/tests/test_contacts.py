from database.database import SessionLocal

from services.contact_service import save_contact


db = SessionLocal()


contact = save_contact(
    db=db,
    company_id=1,
    name="Test User",
    email="test@example.com",
    phone="+123456789"
)


print(contact.id)
print(contact.name)
print(contact.email)


db.close()