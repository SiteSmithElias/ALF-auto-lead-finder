export type LeadStatus =
    | "new"
    | "contacted"
    | "client"
    | "rejected"
    | "unknown"
    | "ignore";

export interface Lead {
    id:number;
    score:number;
    status:LeadStatus;
    score_reason:string;
    hasWebsite:boolean;
    business:{
        id:number;
        name:string;
        website:string|null;
        category:string|null;
        phone:string|null;
        email:string|null;
    };
}

export interface LeadDetail {
    id:number;
    business:{
        id:number;
        name:string;
        category?:string | null;
        city?:string | null;
        phone?:string | null;
        email?:string | null;
        website?:string | null;
    };
    score?:number | null;
    score_reason?:string | null;
    status?:string | null;
    notes?:string | null;
    created_at:string;
    updated_at:string;
}
