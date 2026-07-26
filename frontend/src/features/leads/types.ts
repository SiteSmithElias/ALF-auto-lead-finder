export type LeadStatus =
    | "new"
    | "contacted"
    | "rejected"
    | "client"
    | "unknown"
    | "ignore";

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