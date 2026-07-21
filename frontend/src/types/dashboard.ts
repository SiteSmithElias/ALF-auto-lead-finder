export interface DashboardMetrics {
    businesses_discovered:number;
    total_leads:number;
    contacted:number;
    clients:number;
    conversion_rate:number;
}

export interface RecentSearch {
    query:string;
    created_at:string;
    businesses_found:number;
}