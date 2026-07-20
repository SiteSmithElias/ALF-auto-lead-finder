from database.database import SessionLocal
from discovery.query_runner import run_queries

db = SessionLocal()

results = run_queries(
    db=db,
    queries=[
        "restaurants Brussels"
    ],
    max_listings=10,
    headless=False,
)

for business in results:
    print("----------------")
    print(business)


db.close()