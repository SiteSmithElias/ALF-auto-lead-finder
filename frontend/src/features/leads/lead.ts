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
    address?:string;
    phone?:string;
    email?:string;
    website?:string;
    score:number;
    status:LeadStatus;
    notes?:string;
    contactName?:string;
    contactRole?:string;
    contactPhone?:string;
    hasWebsite:boolean;
    discoveredAt:string;
}