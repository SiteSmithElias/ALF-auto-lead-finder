export interface DiscoveryQuery {
    id:number;
    query:string;
}

export interface DiscoveryProgress {
    status:string;
    found:number;
    percentage:number;
}