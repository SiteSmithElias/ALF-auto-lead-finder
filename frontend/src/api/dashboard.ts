import api from "./client";
import type {
    DashboardMetrics,
    RecentSearch
} from "../types/dashboard";


export const getDashboardMetrics =
async():Promise<DashboardMetrics>=>{
    const res = await api.get(
        "/dashboard/metrics"
    );

    return res.data;
};

export const getRecentSearches =
async():Promise<RecentSearch[]>=>{
    const res = await api.get(
        "/dashboard/recent-searches"
    );

    return res.data;
};