import uuid
from datetime import datetime

jobs = {}

def create_job():
    job_id = str(uuid.uuid4())

    jobs[job_id] = {
        "job_id": job_id,
        "status": "queued",
        "progress": 0,
        "businesses_found": 0,
        "current_action": "Queued",
        "created_at": datetime.utcnow()
    }
    return jobs[job_id]

def get_job(job_id):
    return jobs.get(job_id)

def update_job(
    job_id,
    **updates
):
    if job_id in jobs:
        jobs[job_id].update(updates)

        return jobs[job_id]

    return None