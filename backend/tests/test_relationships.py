from database.database import SessionLocal
from database.models import Company


db = SessionLocal()


company = (
    db.query(Company)
    .filter(
        Company.id == 1
    )
    .first()
)


print(company.name)


for contact in company.contacts:
    print(contact.name)


db.close()