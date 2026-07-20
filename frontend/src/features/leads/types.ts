export type LeadStatus =
    | "NEW"
    | "CONTACTED"
    | "REJECTED"
    | "CLIENT"
    | "UNKNOWN"
    | "IGNORE";

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