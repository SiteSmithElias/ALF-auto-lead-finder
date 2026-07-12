from database.database import SessionLocal

from scraper.website_scraper import scrape_website
from scraper.company_extractor import extract_company_info
from scraper.contact_extractor import extract_emails

from services.company_service import save_company
from services.contact_service import save_contact
from services.lead_score_service import save_lead_score

def scan_company(url: str):

    db = SessionLocal()


    try:
        page = scrape_website(url)
        company_data = extract_company_info(page)

        company = save_company(
            db=db,
            name=company_data["name"],
            website=url,
            description=company_data["description"]
        )

        emails = extract_emails(page)
        for email in emails:

            save_contact(
                db=db,
                company_id=company.id,
                email=email
            )

        score = save_lead_score(
            db=db,
            company_id=company.id
        )

        return {
            "company": {
                "id": company.id,
                "name": company.name,
                "website": company.website
            },
            "score": {
                "value": score.score,
                "reason": score.reason
            }
        }

    finally:
        db.close()