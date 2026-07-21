import api from "./client";
import type {
    Lead,
    LeadDetail,
    LeadStatus
} from "../types/lead";


interface LeadParams {
    page?:number;
    limit?:number;
    status?:LeadStatus;
    min_score?:number;
    category?:string;
    hasWebsite?:boolean;
    search?:string;
}

interface LeadListResponse {
    items:Lead[];
}

export const getLeads =
async(
    params?:LeadParams
):Promise<LeadListResponse>=>{
    const res = await api.get(
        "/leads",
        {
            params
        }
    );

    return res.data;
};

export const getLead =
async(
    id:number
):Promise<LeadDetail>=>{
    const res = await api.get(
        `/leads/${id}`
    );

    return res.data;
};

export const updateLead =
async(
    id:number,
    data:Partial<Lead>
)=>{
    const res = await api.patch(
        `/leads/${id}`,
        data
    );

    return res.data;
};

export const updateLeadStatus =
async(
    id:number,
    status:LeadStatus
)=>{
    const res = await api.patch(
        `/leads/${id}/status`,
        {
            status
        }
    );

    return res.data;
};

export const deleteLead =
async(
    id:number
)=>{
    const res = await api.delete(
        `/leads/${id}`
    );

    return res.data;
};