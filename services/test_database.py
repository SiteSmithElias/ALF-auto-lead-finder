from database.database import SessionLocal
from database.models import Company


db = SessionLocal()


company = Company(
    name="Cadcamatic",
    website="https://www.cadcamatic.be/",
    industry="Industrial",
    description="Custom high-tech factory automation",
    country="Belgium",
    city="Torhout"
)


db.add(company)

db.commit()

db.refresh(company)


print(company.id)
print(company.name)


db.close()