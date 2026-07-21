import type {Business} from "./business";

export type LeadStatus =
    | "new"
    | "contacted"
    | "client"
    | "rejected"
    | "unknown";

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
    };
}

export interface LeadDetail {
    id:number;
    score:number;
    status:LeadStatus;
    score_reason:string;
    business:{
        id:number;
        name:string;
    };
}