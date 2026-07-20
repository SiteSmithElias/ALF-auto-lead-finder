from database.database import SessionLocal
from services.lead_score_service import save_lead_score


db = SessionLocal()


score = save_lead_score(
    db,
    company_id=1
)


print(score.score)
print(score.reason)


db.close()