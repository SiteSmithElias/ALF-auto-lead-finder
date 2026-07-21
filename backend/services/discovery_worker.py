from database.database import SessionLocal
from discovery.query_runner import run_queries
from services.discovery_job_service import update_job

def discovery_worker(
    job_id,
    queries,
    max_results
):
    print("DISCOVERY WORKER STARTED", job_id)
    db = SessionLocal()
    try:
        update_job(
            job_id,
            status="running",
            progress=10,
            current_action="Starting Google Maps scraper"
        )

        print("RUNNING QUERIES")

        businesses = run_queries(
            db=db,
            queries=queries,
            max_listings=max_results,
            headless=False,
            save=True
        )

        print(
        "DISCOVERY FINISHED",
        len(businesses))

        update_job(
            job_id,
            status="completed",
            progress=100,
            businesses_found=len(businesses),
            current_action="Finished"
        )

    except Exception as e:
        update_job(
            job_id,
            status="failed",
            current_action=str(e)
        )
    finally:
        db.close()