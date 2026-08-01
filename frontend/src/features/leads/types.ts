import type { LeadStatus as SharedLeadStatus } from "../../types/lead";

export type LeadStatus = SharedLeadStatus;

export interface Lead {
    id:number;
    business:string;
    category:string;
    phone?:string;
    email?:string;
    score:number;
    status:LeadStatus;
    hasWebsite:boolean;
    discoveredAt:string;
}