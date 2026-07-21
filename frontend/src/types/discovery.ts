export type DiscoveryStatus =
    | "queued"
    | "running"
    | "completed"
    | "failed";

export interface DiscoveryJob {
    job_id:string;
    status:DiscoveryStatus;
    progress?:number;
    businesses_found?:number;
    current_action?:string;
    created_at?:string;
}