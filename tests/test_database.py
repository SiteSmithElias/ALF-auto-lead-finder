from database.database import SessionLocal

from services.company_service import create_company


db = SessionLocal()


company = create_company(
    db=db,
    name="Cadcamatic",
    website="https://www.cadcamatic.be/",
    industry="Industrial",
    description="Custom high-tech factory automation",
    country="Belgium",
    city="Torhout"
)


print(company.id)
print(company.name)


db.close()