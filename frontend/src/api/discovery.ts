import api from "./client";

export interface StartDiscoveryRequest {
  queries: string[];
  max_results: number;
}

export interface StartDiscoveryResponse {
  job_id: string;
  status: string;
  message: string;
}

export interface DiscoveryJob {
  job_id: string;
  status: "queued" | "running" | "completed" | "failed";
  progress: number;
  businesses_found: number;
  current_action: string;
  created_at: string;
}

export async function startDiscovery(
  data: StartDiscoveryRequest
): Promise<StartDiscoveryResponse> {
  const res = await api.post("/discovery/start", data);

  return res.data;
}

export async function getDiscoveryJob(
  jobId: string
): Promise<DiscoveryJob> {
  const res = await api.get(`/discovery/${jobId}`);

  return res.data;
}