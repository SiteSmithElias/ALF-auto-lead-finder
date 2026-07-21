import api from "./client";
import type {
    DiscoveryJob
} from "../types/discovery";


interface StartDiscoveryRequest {
    queries:string[];
    max_results:number;
}

interface StartDiscoveryResponse {
    job_id:string;
    status:string;
    message:string;
}

export const startDiscovery =
async(
    data:StartDiscoveryRequest
):Promise<StartDiscoveryResponse>=>{
    const res = await api.post(
        "/discovery/start",
        data
    );

    return res.data;
};

export const getDiscoveryStatus =
async(
    jobId:string
):Promise<DiscoveryJob>=>{
    const res = await api.get(
        `/discovery/${jobId}`
    );

    return res.data;
};

export const getDiscoveryHistory =
async():Promise<DiscoveryJob[]>=>{
    const res = await api.get(
        "/discovery/history"
    );

    return res.data;
};