from fastapi import (
    APIRouter,
    BackgroundTasks,
    HTTPException
)
from schemas.discovery import (
    DiscoveryRequest,
    DiscoveryJobResponse
)
from services.discovery_job_service import (
    create_job,
    get_job
)
from services.discovery_worker import (
    discovery_worker
)


router = APIRouter(
    prefix="/discovery",
    tags=["Discovery"]
)

@router.post(
    "/start",
    response_model=DiscoveryJobResponse
)
def start_discovery(
    request: DiscoveryRequest,
    background_tasks: BackgroundTasks
):
    job = create_job()

    background_tasks.add_task(
        discovery_worker,
        job["job_id"],
        request.queries,
        request.max_results
    )

    return {
        "job_id": job["job_id"],
        "status": "started",
        "message": "Discovery started"
    }

@router.get(
    "/{job_id}"
)
def discovery_status(
    job_id:str
):
    job = get_job(job_id)

    if not job:
        raise HTTPException(
            404,
            "Job not found"
        )

    return job

@router.get(
    "/history"
)
def discovery_history():
    from services.discovery_job_service import jobs
    return list(
        jobs.values()
    )
