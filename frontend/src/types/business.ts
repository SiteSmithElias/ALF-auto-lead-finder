export interface Business {
    id:number;
    name:string;
    address:string | null;
    city:string | null;
    country:string | null;
    phone:string | null;
    email:string | null;
    website:string | null;
    category:string | null;
    created_at:string;
    updated_at:string;
}

export interface BusinessSource {
    source_type:string;
    external_id:string;
}

export interface BusinessDetail extends Business {
    sources:BusinessSource[];
}