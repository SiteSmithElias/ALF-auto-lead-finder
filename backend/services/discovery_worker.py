from database.database import SessionLocal
from discovery.query_runner import run_queries
from services.discovery_job_service import update_job

def discovery_worker(
    job_id,
    queries,
    max_results,
):
    db = SessionLocal()

    try:
        update_job(
            job_id,
            status="running",
            progress=5,
            current_action="Preparing search",
        )

        update_job(
            job_id,
            progress=15,
            current_action="Searching businesses",
        )

        businesses = run_queries(
            db=db,
            queries=queries,
            max_listings=max_results,
            headless=False,
            save=True,
            progress_callback=lambda progress, action, found:
                update_job(
                    job_id,
                    progress=progress,
                    current_action=action,
                    businesses_found=found
                )
        )

        update_job(
            job_id,
            progress=75,
            businesses_found=len(businesses),
            current_action="Processing discovered businesses",
        )

        update_job(
            job_id,
            progress=90,
            current_action="Creating leads",
        )

        update_job(
            job_id,
            status="completed",
            progress=100,
            businesses_found=len(businesses),
            current_action="Finished",
        )

    except Exception as e:
        update_job(
            job_id,
            status="failed",
            current_action=str(e),
        )

    finally:
        db.close()