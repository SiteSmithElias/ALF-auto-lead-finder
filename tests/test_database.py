from database.database import SessionLocal

from services.company_service import save_company


db = SessionLocal()


company = save_company(
    db=db,
    name="Cadcamatic",
    website="https://www.cadcamatic.be/",
    industry="Industrial",
    description="Custom high-tech factory solutions",
    country="Belgium",
    city="Torhout"
)


print(company.id)
print(company.name)


db.close()